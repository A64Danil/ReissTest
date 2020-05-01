import React, {useContext, useEffect, useState} from 'react'
import {urlInlineParser} from "../../helpers/parsers"
import styles from "../../global.scss";

import {StoreContext} from "../../model/Store.js";

import json from "./../../model/quests";

const Compare = ({props}) => {
    const store = useContext(StoreContext)
    const questResults = store.answers.toJS();
    const [finalResultArr, setFinalResultArr] = useState([]);
    const [finalResultArr2, setFinalResultArr2] = useState([]);
    const [urlLink, setUrlLink] = useState("");

    useEffect(()=> {
        console.log("Вы на финальной странице UseEffect")
        let allUrlParams = getAllUrlParams(window.location.search);
        let res1Url = urlInlineParser(allUrlParams.res);
        let userName1Url = decodeURIComponent(allUrlParams.username);
        let res2Url = urlInlineParser(allUrlParams.res2);
        let userName2Url = decodeURIComponent(allUrlParams.username2);
        console.log(userName1Url);
        console.log(res1Url);
        store.setUsername(userName1Url);
        console.log(userName2Url);
        console.log(res2Url);
        store.setUsername2(userName2Url);

        let tempLink = urlLink + allUrlParams.res;
        setUrlLink(tempLink)

        if (res1Url && res2Url) {
            console.log("Берем результат из ссылки")
            let parsedResult1 = [];
            let parsedResult2 = [];
            // TODO: сделать рефакторинг - свести два цикла в один
            for (const keyName in res1Url) {
                let fullName;
                json.forEach((quest)=> {
                    if(quest.urlName == keyName) {
                        fullName = quest.htmlTitle;
                    }
                })
                parsedResult1.push({
                    title: fullName,
                    valueNum: res1Url[keyName] * 100
                })

            }
            for (const keyName in res2Url) {
                let fullName;
                json.forEach((quest)=> {
                    if(quest.urlName == keyName) {
                        fullName = quest.htmlTitle;
                    }
                })
                parsedResult2.push({
                    title: fullName,
                    valueNum: res2Url[keyName] * 100
                })

            }
            console.log(parsedResult1)
            console.log(parsedResult2)
            // finalResultArr = parsedResult;
            setFinalResultArr(parsedResult1)
            setFinalResultArr2(parsedResult2)
        }
        else {
            alert("Неправильная ссылка для сравнения результатов")
        }
        console.log(finalResultArr);
        // TODO: починить, ломает систему
        // setFinalResultArr(finalResultArr.sort(resultCompare));
    }, [])


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


    console.log(finalResultArr)
    console.log(finalResultArr2)
    // console.log(urlLink)


    return (
        <div className={styles.resultPage}>
            {/*<h1>{store.userName}, ваши результаты:</h1>*/}
            <h1>Сравнение результатов:</h1>

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

            <h2>Ваш друг:</h2>
            {finalResultArr2.length < 16 && (
                <h3>Что-то пошло не так. Вы ответили не на все вопросы.</h3>
            )}

            <ul className={styles.resultList}>
            { finalResultArr2.map( (obj) => (
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

export default Compare;