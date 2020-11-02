import React, {useContext, useEffect, useState} from 'react'
import {urlInlineParser, getAllUrlParams, urlResParse, checkUrlRes} from "../../helpers/parsers"
import styles from "../../global.scss";

import {StoreContext} from "../../model/Store.js";

import json from "./../../model/quests";

const Compare = ({history}) => {
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
        // console.log(userName1Url);
        // console.log(res1Url);
        store.setUsername(userName1Url);
        // console.log(userName2Url);
        // console.log(res2Url);
        store.setUsername2(userName2Url);

        let tempLink = urlLink + allUrlParams.res;
        setUrlLink(tempLink)

        if (res1Url && res2Url) {
            console.log("Берем результат из ссылки");
            let url1Cheker = checkUrlRes(res1Url);
            let url2Cheker = checkUrlRes(res2Url);


            if (url1Cheker !== "successful") {
                alert("Неправильный адрес ссылки. В первой части ссылки какая-то ошибка: " + url1Cheker);
                // if (store.resultUrl !== '')  history.push(store.resultUrl);
                store.resultUrl !== '' ? history.push(store.resultUrl) : history.push(store.resultUrl);
            }
            if (url2Cheker !== "successful") {
                alert("Неправильный адрес ссылки. Во второй части ссылки какая-то ошибка: " + url2Cheker);
                store.resultUrl !== '' ? history.push(store.resultUrl) : history.push(store.resultUrl);
            }

            let parsedResult1 = urlResParse(res1Url).sort(resultCompare);
            let parsedResult2 = urlResParse(res2Url);

            let parsedResult2sorted = [];

            parsedResult1.forEach((answer)=> {
                const newAnswer = parsedResult2.find( el => el.title === answer.title);
                parsedResult2sorted.push(newAnswer);
            });
            setFinalResultArr(parsedResult1)
            setFinalResultArr2(parsedResult2sorted)
        }
        else {
            alert("Неправильная ссылка для сравнения результатов")
        }

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



    console.log(finalResultArr)
    console.log(finalResultArr2)


    return (
        <div className={styles.compareResultsPage}>
            <h1>Сравнение результатов:</h1>

            <div className={styles.compareResultsNames}>
                <h2>{store.userName}</h2>
                <h2>{store.userName2}</h2>
            </div>
            <div className={styles.compareResultsBlock}>
                <div className={`${styles.resultListWrp} ${styles.rotated}`}>
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
                </div>

                <div className={styles.resultListWrp}>
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
                </div>
            </div>

        </div>
    )
}

export default Compare;