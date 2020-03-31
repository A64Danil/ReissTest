import React, {useContext, useEffect, useState} from 'react'

import styles from "../../global.scss";

import {StoreContext} from "../../model/Store.js";

import json from "./../../model/quests";

const Result = ({props}) => {
    const store = useContext(StoreContext)

    // TODO answers
    const questResults = store.answers.toJS();
    // const questResults = store.answersNew.toJS();

    let finalResultArr = [];
    let urlLink = "";

    (function () {
        console.log("Вы на финальной странице IIFE")
        let stringUrlPath = resultInlineParser(getAllUrlParams(window.location.search).res);
        console.log(stringUrlPath);

        if (stringUrlPath) {
            console.log("Берем результат из ссылки")
            let parsedResult = [];
            // TODO urlName
            for (const keyName in stringUrlPath) {
                let fullName;

                json.forEach((quest)=> {
                    if(quest.urlName == keyName) {
                        fullName = quest.htmlTitle;
                    }

                })


                /*
                switch (keyName) {
                    case ("od"):
                        shortName = "Одобрение";
                        break;
                    case ("lu"):
                        shortName = "Любопытство";
                        break;
                    case ("po"):
                        shortName = "Порядок";
                        break;
                    case ("vl"):
                        shortName = "Власть";
                        break;
                    case ("be"):
                        shortName = "Бережливость";
                        break;
                    case ("ne"):
                        shortName = "Независимость";
                        break;
                    case ("st"):
                        shortName = "Статус";
                        break;
                    case ("ob"):
                        shortName = "Общение";
                        break;
                    case ("ro"):
                        shortName = "Романтические отношения";
                        break;
                    case ("sp"):
                        shortName = "Спокойствие";
                        break;
                    case ("ch"):
                        shortName = "Честь";
                        break;
                    case ("id"):
                        shortName = "Идеализм";
                        break;
                    case ("so"):
                        shortName = "Соревновательность";
                        break;
                    case ("ed"):
                        shortName = "Еда";
                        break;
                    case ("fi"):
                        shortName = "Физическая активность";
                        break;
                    case ("se"):
                        shortName = "Семья";
                        break;

                }
                */
                parsedResult.push({
                    title: fullName,
                    valueNum: stringUrlPath[keyName] * 100
                })

            }
            console.log(parsedResult)
            finalResultArr = parsedResult;
        }
        else {
            console.log("Берем результат из стора")
            questResults.forEach( (val, key) =>  {
                let fullName;
                // Оставить ту часть на всякий случай
                // let valToText = val < 151 ? ("Слабое") :
                //     (val < 251) ? ("Ниже среднего") :
                //         (val < 351) ? ("Среднее") :
                //             (val < 451) ? ("Выше среднего") : ("Сильное");
                json.forEach((quest)=> {
                    if(quest.keyTitle == key) {
                        fullName = quest.title;
                    }

                })
                let newObj = {
                    title: fullName,
                    valueNum: val,
                    // valuetext: valToText
                }
                finalResultArr.push(newObj)
            })
        }
        console.log(finalResultArr);
        finalResultArr.sort(resultCompare);
    })();


    function isNumber(char) {
        return /\d/.test(char);
    }
    function isString(char) {
        return /\w/.test(char);
    }

    function getAllUrlParams(url) {
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

    function resultCompare(a, b) {

        if (a.valueNum < b.valueNum) {
            return 1;
        }
        if (a.valueNum > b.valueNum) {
            return -1;
        }
        // a должно быть равным b
        return 0;
    }

    function resultInlineParser(res) {
        if (!res) return ;

        console.log("resultInlineParser");
        console.log(res);
        urlLink = res;

        let newResultArr = res.split('');
        // console.log(newResultArr);
        let nameBuffer = "";
        // let parsedResult = [];
        let parsedResult = {};

        newResultArr.forEach((char) => {
            let singleResultValue = {};
            // console.log("char " + char)
            // console.log("num " + isNumber(char))
            // console.log("str " + isString(char))

            if (isNumber(char)) {
                // singleResultValue[nameBuffer] = char;
                // console.log(singleResultValue)
                parsedResult[nameBuffer] = char;
                nameBuffer = "";
                // parsedResult.push(singleResultValue)

            } else if (isString(char)) {
                nameBuffer += char;
                // console.log(nameBuffer)
            }
        })
        // создаём буффер
        // если встретили букву - добавляем в имя буффероа
        // если встретили цифру - добавляем в значение объкта буффера, добавлЯем объект в фин результат и чистим буффер
        return parsedResult;

    }
    console.log(finalResultArr)
    console.log(urlLink)


    return (
        <div className={styles.resultPage}>
            <h1>{store.userName}, ваши результаты:</h1>

            {finalResultArr.length < 16 && (
                <h3>Что-то пошло не так. Вы ответили не на все вопросы.</h3>
            )}

            <ul className={styles.resultList}>
            { finalResultArr.map( (obj) => (
                <li key={obj.title}>
                    <p key={obj.title + "_descr"} className={styles.resultTitle}>{obj.title}</p>
                    <div key={obj.title + "_val"}  className={`${styles.resultBar}  ${styles["resultBar--" + obj.valueNum]}`} ></div>
                </li>
            ))}
            </ul>

            <h3>Ваш код для сравнения <sub>(заработает в будущем)</sub></h3>
            <p>{urlLink}</p>
        </div>
    )
}

export default Result;