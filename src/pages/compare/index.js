import React, {useContext, useEffect, useState} from 'react'
import {urlInlineParser, getAllUrlParams} from "../../helpers/parsers"
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



    console.log(finalResultArr)
    console.log(finalResultArr2)
    // console.log(urlLink)


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