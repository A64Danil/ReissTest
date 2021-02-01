import React, {useContext, useEffect, useState} from 'react'
import {urlInlineParser, getAllUrlParams, urlResParse, checkUrlRes, sortResultDesc} from "../../helpers/parsers"
import Swal from 'sweetalert2';

import styles from "../../global.scss";

import {StoreContext} from "../../model/Store.js";

// import json from "./../../model/quests";

const Compare = ({history}) => {
    const store = useContext(StoreContext)
    // const questResults = store.answers.toJS();
    const [finalResultArr, setFinalResultArr] = useState([]);
    const [finalResultArr2, setFinalResultArr2] = useState([]);
    const [urlLink, setUrlLink] = useState("");
    const [isResultError, setIsResultError] = useState(false);

    useEffect(()=> {
        let allUrlParams = getAllUrlParams(window.location.search);
        let res1Url = urlInlineParser(allUrlParams.res);
        let userName1Url = decodeURIComponent(allUrlParams.username);
        let res2Url = urlInlineParser(allUrlParams.res2);
        let userName2Url = decodeURIComponent(allUrlParams.username2);
        store.setUsername(userName1Url);
        store.setUsername2(userName2Url);

        let tempLink = urlLink + allUrlParams.res;
        setUrlLink(tempLink)

        if (res1Url && res2Url) {
            let url1Cheker = checkUrlRes(res1Url);
            let url2Cheker = checkUrlRes(res2Url);


            if (url1Cheker !== "successful") {
                setIsResultError(true);
                Swal.fire('Ооххх...', "Неправильный адрес ссылки. В первой части ссылки какая-то ошибка: " + url1Cheker, 'error').then(function(){
                    store.resultUrl !== '' ? history.push(store.resultUrl) : history.push('');
                });
            }
            if (url2Cheker !== "successful") {
                setIsResultError(true);
                Swal.fire('Ооххх...', "Неправильный адрес ссылки. Во второй части ссылки какая-то ошибка: " + url2Cheker, 'error').then(function(){
                    store.resultUrl !== '' ? history.push(store.resultUrl) : history.push('');
                });
            }

            let parsedResult1 = urlResParse(res1Url).sort(sortResultDesc);
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
            setIsResultError(true);
            Swal.fire('Ооххх...', 'Неправильная ссылка для сравнения результатов', 'error').then(function(){
                store.resultUrl !== '' ? history.push(store.resultUrl) : history.push('');
            });
        }

    }, [])

    return (
        <div className={styles.compareResultsPage}>
            <div className={styles.compareResultsPage__Container} >
                <h1>Сравнение результатов:</h1>
                {isResultError ? (
                    <h2 className={styles.error}>Ошибка в ссылке с результатами</h2>
                ) : (
                    <div className={styles.compareResultsNames}>
                        <h2>{store.userName}</h2>
                        <h2>{store.userName2}</h2>
                    </div>
                )}
                <div className={styles.compareResultsBlock}>
                    <div className={`${styles.resultListWrp} ${styles.rotated}`}>
                        {!isResultError && finalResultArr.length < 16 && (
                            <h3>Что-то пошло не так. Вы ответили не на все вопросы.</h3>
                        )}
                        <ul className={styles.resultList}>
                            {!isResultError && finalResultArr.map( (obj) => (
                                <li key={obj.title}>
                                    <p key={obj.title + "_descr"} className={styles.resultTitle}>{obj.title}</p>
                                    <div key={obj.title + "_val"}  className={`${styles.resultBar}  ${styles["resultBar--" + obj.valueNum]}`} ></div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className={styles.resultListWrp}>
                        {!isResultError && finalResultArr2.length < 16 && (
                            <h3>Что-то пошло не так. Вы ответили не на все вопросы.</h3>
                        )}
                        <ul className={styles.resultList}>
                            {!isResultError && finalResultArr2.map( (obj) => (
                                <li key={obj.title}>
                                    <p key={obj.title + "_descr"} className={styles.resultTitle}>{obj.title}</p>
                                    <div key={obj.title + "_val"}  className={`${styles.resultBar}  ${styles["resultBar--" + obj.valueNum]}`} ></div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Compare;