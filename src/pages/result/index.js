import React, {useContext, useEffect, useState} from 'react'

import styles from "../../global.scss";

import {StoreContext} from "../../model/Store.js";

import json from "./../../model/quests";
import Arrow from "../../assets/svg/arrow_normal";
import {Link} from "react-router-dom";

const Result = ({props}) => {
    const store = useContext(StoreContext)
    const questResults = store.answers.toJS();
    const [finalResultArr, setFinalResultArr] = useState([]);
    const [urlLink, setUrlLink] = useState("");
    const [linkToCompare, setLinkToCompare] = useState("");
    const [paramsToComparePage, setParamsToComparePage] = useState("");
    const [urlToComparePage, setUrlToComparePage] = useState("");

    // let finalResultArr = [];
    // let urlLink = "";

    useEffect(()=> {
        console.log("Вы на финальной странице UseEffect")
        let allUrlParams = getAllUrlParams(window.location.search);
        let stringUrlPath = urlInlineParser(allUrlParams.res);
        let userNameUrl = decodeURIComponent(allUrlParams.username);
        console.log(stringUrlPath);
        console.log(userNameUrl);
        store.setUsername(userNameUrl);
        setUrlLink(allUrlParams.res)

        let compareLink = 'res2=' + allUrlParams.res + '&username2=' + userNameUrl;
        setLinkToCompare(compareLink);


        if (stringUrlPath) {
            console.log("Берем результат из ссылки")
            let parsedResult = [];
            for (const keyName in stringUrlPath) {
                let fullName;

                json.forEach((quest)=> {
                    if(quest.urlName == keyName) {
                        fullName = quest.htmlTitle;
                    }

                })


                parsedResult.push({
                    title: fullName,
                    valueNum: stringUrlPath[keyName] * 100
                })

            }
            console.log(parsedResult)
            // finalResultArr = parsedResult;
            setFinalResultArr(parsedResult)
        }
        else {
            console.log("Берем результат из стора")
            let parsedResult = [];
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
                parsedResult.push(newObj)
            })
            console.log(parsedResult)
            setFinalResultArr(parsedResult);
        }
        console.log(finalResultArr);
        // TODO: починить, ломает систему
        // setFinalResultArr(finalResultArr.sort(resultCompare));
    }, [])

    useEffect(() => {
        let allUrlParams = getAllUrlParams(window.location.search);
        let userNameUrl = decodeURIComponent(allUrlParams.username);
        // http://localhost:1234/compare?res=acc1cur1ord1pow1sav1ind1sta1soc1rom5tra1hon1ide1ven1eat1phy1fam1&username=%D0%A1%D0%B5%D1%80%D0%B6&
        // res2=acc4cur2ord2pow2sav2ind1sta1soc1rom5tra1hon1ide1ven1eat1phy1fam1&username2=%D0%90%D1%84%D0%BE%D0%BD%D1%8F
        let originUserLink = 'res=' + allUrlParams.res + '&username=' + userNameUrl;
        const newCompareLink = '/compare?' + originUserLink + '&' + paramsToComparePage;
        console.log(newCompareLink);
        setUrlToComparePage(newCompareLink);
    }, [paramsToComparePage, setParamsToComparePage])

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

    function urlInlineParser(urlString) {
        if (!urlString) return ;

        console.log("urlInlineParser");
        console.log(urlString);


        let newResultArr = urlString.split('');
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
    // console.log(finalResultArr)
    // console.log(urlLink)


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


            <div className={styles.resultShare}>
                <h3>Отправьте эту ссылку другу, если хотите показать ему ваш результат</h3>
                <p className={styles.longString}>
                    <a href={window.location.href} target="_blanc">{window.location.href}</a>
                </p>
            </div>


            <div className={styles.resultShare}>
                <h3>Вставьте в поле ниже код от вашего друга, чтобы сравнить ваши результаты</h3>
                <input
                    type="text"
                    value={paramsToComparePage}
                    onChange={e => {
                        setParamsToComparePage(e.target.value);
                    }}
                    placeholder="Вставьте код для сравнения"
                />
                <Link to={urlToComparePage}  className={styles.compareBtn}>
                    Сравнить
                    <span>
                            <Arrow />
                        </span>
                </Link>
            </div>

            <div className={styles.resultShare}>
                <h3>Отправьте этот код другу, чтобы он мог сравнить свои результаты с вашими</h3>
                <p className={styles.longString}>{linkToCompare}</p>
            </div>
        </div>
    )
}

export default Result;