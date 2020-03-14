import React, {useContext, useEffect, useState} from 'react'

import styles from "../../global.scss";

import {StoreContext} from "../../model/Store.js";

const Result = ({props}) => {
    const store = useContext(StoreContext)
    const questResults = store.answers.toJS();

    const newArr = [];
    questResults.forEach( (val, key) =>  {
        let valToText = val < 151 ? ("Слабое") :
            (val < 251) ? ("Ниже среднего") :
                (val < 351) ? ("Среднее") :
                    (val < 451) ? ("Выше среднего") : ("Сильное");

        let newObj = {
            title: key,
            valueNum: val,
            valuetext: valToText
        }
        newArr.push(newObj)
    })

    newArr.sort(resultCompare)

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
        let newResultArr = res.split('');
        // console.log(newResultArr);
        let nameBuffer = "";
        let parsedResult = [];

        newResultArr.forEach((char) => {
            let singleResultValue = {};
            // console.log("char " + char)
            // console.log("num " + isNumber(char))
            // console.log("str " + isString(char))

            if (isNumber(char)) {
                singleResultValue[nameBuffer] = char;
                // console.log(singleResultValue)
                nameBuffer = "";
                parsedResult.push(singleResultValue)
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
    console.log(newArr)

    useEffect(()=> {
        console.log("Вы на финальной странице")
        // console.log(store.answers.toJS().get("Еда"))
        let parsedResult = resultInlineParser(getAllUrlParams(window.location.search).res);
        // TODO: newObjUrl(url path) to JSON format
        console.log(parsedResult);

    }, [])

    return (
        <div className={styles.resultPage}>
            <h1>Ваши результаты:</h1>

            {newArr.length < 16 && (
                <h3>Что-то пошло не так. Вы ответили не на все вопросы.</h3>
            )}

            <ul className={styles.resultList}>
            { newArr.map( (obj) => (
                <li key={obj.title}>
                    <p className={styles.resultTitle}>{obj.title}</p>
                    <div className={`${styles.resultBar}  ${styles["resultBar--" + obj.valueNum]}`} ></div>

                </li>
            ))}
            </ul>
        </div>
    )
}

export default Result;