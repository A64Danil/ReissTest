import {isNumber,isString} from "./base"
import json from "../model/quests";

export const urlInlineParser = (urlString) =>  {
    if (!urlString) return ;

    let newResultArr = urlString.split('');
    let nameBuffer = "";
    let parsedResult = {};

    newResultArr.forEach((char) => {
        if (isNumber(char)) {
            parsedResult[nameBuffer] = char;
            nameBuffer = "";

        } else if (isString(char)) {
            nameBuffer += char;
        }
    });
    return parsedResult;

};

export const getAllUrlParams = (url) => {
    // извлекаем строку из URL или объекта window
    var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

    // объект для хранения параметров
    var obj = {};

    // если есть строка запроса
    if (queryString) {

        // данные после знака # будут опущены
        queryString = queryString.split('#')[0];

        // разделяем параметры
        var arr = queryString.split('&');

        for (var i=0; i<arr.length; i++) {
            // разделяем параметр на ключ => значение
            var a = arr[i].split('=');

            // обработка данных вида: list[]=thing1&list[]=thing2
            var paramNum = undefined;
            var paramName = a[0].replace(/\[\d*\]/, function(v) {
                paramNum = v.slice(1,-1);
                return '';
            });

            // передача значения параметра ('true' если значение не задано)
            var paramValue = typeof(a[1])==='undefined' ? true : a[1];

            // преобразование регистра
            paramName = paramName.toLowerCase();
            paramValue = paramValue.toLowerCase();

            // если ключ параметра уже задан
            if (obj[paramName]) {
                // преобразуем текущее значение в массив
                if (typeof obj[paramName] === 'string') {
                    obj[paramName] = [obj[paramName]];
                }
                // если не задан индекс...
                if (typeof paramNum === 'undefined') {
                    // помещаем значение в конец массива
                    obj[paramName].push(paramValue);
                }
                // если индекс задан...
                else {
                    // размещаем элемент по заданному индексу
                    obj[paramName][paramNum] = paramValue;
                }
            }
            // если параметр не задан, делаем это вручную
            else {
                obj[paramName] = paramValue;
            }
        }
    }

    return obj;
}

export const checkUrlRes = (urlRes) => {
    let counter = 0;
    for (const keyName in urlRes) {
        let fullName;
        json.forEach((quest)=> {
            if(quest.urlName == keyName) {
                fullName = quest.htmlTitle;
                counter++;
            }
        })
        if (!fullName) return `Указано неверное имя у '${keyName}' (${urlRes[keyName]})`;
        if ( urlRes[keyName] < 1 ||  5 < urlRes[keyName]) {
            return `Указано неверное значение для ${fullName} (${urlRes[keyName]})`;
        }
    }
    if (counter !== json.length) return "Неверное количество ответов";
    return "successful"

};

export const urlResParse = (urlRes) => {
    let parsedResult = [];
    for (const keyName in urlRes) {
        let fullName;
        json.forEach((quest)=> {
            if(quest.urlName == keyName) {
                fullName = quest.htmlTitle;
            }
        })
        parsedResult.push({
            title: fullName,
            valueNum: urlRes[keyName] * 100
        })

    }
    return parsedResult;
};

export const sortResultDesc = (a, b) => {
    if (a.valueNum < b.valueNum) {
        return 1;
    }
    if (a.valueNum > b.valueNum) {
        return -1;
    }
    return 0;
};