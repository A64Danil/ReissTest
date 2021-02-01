import React, {useContext, useEffect, useState} from 'react'
import {urlInlineParser, getAllUrlParams, checkUrlRes, urlResParse, sortResultDesc} from "../../helpers/parsers"
import {copyToClipboard, validURL} from "../../helpers/base"


import styles from "../../global.scss";

import {StoreContext} from "../../model/Store.js";

import Swal from 'sweetalert2';

import json from "./../../model/quests";
import Arrow from "../../assets/svg/arrow_normal";
import {Link} from "react-router-dom";

const Result = ({props}) => {
    const store = useContext(StoreContext)
    const questResults = store.answers.toJS();
    const [finalResultArr, setFinalResultArr] = useState([]);
    const [paramsToComparePage, setParamsToComparePage] = useState("");
    const [urlToComparePage, setUrlToComparePage] = useState("");
    const [isCompareUrlBad, setIsCompareUrlBad] = useState(false);
    const [errorUrlInput, setErrorUrlInput] = useState('');
    const [compareBtnClass, setСompareBtnClass] = useState('');
    const [shakeCompareBtn, setShakeCompareBtn] = useState('');

    const [urlErrorMsg, setUrlErrorMsg] = useState('');


    useEffect(()=> {
        const allUrlParams = getAllUrlParams(window.location.search);
        const stringUrlPath = urlInlineParser(allUrlParams.res);
        const userNameUrl = decodeURIComponent(allUrlParams.username);
        store.setUsername(userNameUrl);

        store.setResultUrl('result' + window.location.search);

        if (stringUrlPath) {
            let parsedResult = urlResParse(stringUrlPath).sort(sortResultDesc);
            setFinalResultArr(parsedResult);
        }
        else {
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
                }
                parsedResult.push(newObj)
            })
            setFinalResultArr(parsedResult);
        }
    }, [])



    useEffect(() => {
        if (!validURL(paramsToComparePage) && paramsToComparePage !== '') {
            setIsCompareUrlBad(true);
            setСompareBtnClass(styles.badUrl);
            setErrorUrlInput(styles.error);
            setUrlErrorMsg('Вы вводите неправильный формат ссылки.');
            return
        };
        if (paramsToComparePage === '') setUrlErrorMsg('');

        const allUrlParams = getAllUrlParams(window.location.search);
        const userNameUrl = decodeURIComponent(allUrlParams.username);
        const newParamsToComparePage = getAllUrlParams(paramsToComparePage);
        const secondUserNameUrl = decodeURIComponent(newParamsToComparePage.username);

        const urlCheker = checkUrlRes(urlInlineParser(newParamsToComparePage.res));

        if (urlCheker !== "successful") {
            setIsCompareUrlBad(true);
            setUrlErrorMsg(urlCheker);
            return;
        } else {
            setIsCompareUrlBad(false);
            setUrlErrorMsg('');
            setСompareBtnClass('');
            setErrorUrlInput('');

            const originUserLink = 'res=' + allUrlParams.res + '&username=' + userNameUrl;
            const secondUserLink = 'res2=' + newParamsToComparePage.res + '&username2=' + secondUserNameUrl;

            const newCompareLink = '/compare?' + originUserLink + '&' + secondUserLink;
            setUrlToComparePage(newCompareLink);
        }
        // console.log(isCompareUrlBad);

    }, [paramsToComparePage, setParamsToComparePage])


    function onCompareBtnClick(e) {
        if(paramsToComparePage === '') {
            e.preventDefault();
            Swal.fire('Ооххх...', 'Вы ничего не ввели в поле для сравнения', 'error');
            setErrorUrlInput(styles.error);
            setShakeCompareBtn(styles.resultPageBtnAnimated);
            setTimeout( () => {
                setShakeCompareBtn('');
            }, 820);
        }
    }



    const onRefreshBtnClick = (e) => {
        store.resetState();
    }


    const copyToOnClick = (e) => {
        const parentElem = e.target.parentElement;
        const linkToPage = window.location.href;
        copyToClipboard(linkToPage, parentElem);
        Swal.fire('Готово', 'Текст скопирован!', 'success');
    }

    return (
        <div className={styles.resultPage}>
            <div className={styles.resultPage__Container} >
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


                <div className={`${styles.resultShare} ${styles.resultShareWide} ${styles.grayBg}`}>
                    <h3>Поделиться результатом</h3>
                    <button
                        className={styles.copyLinkPageBtn}
                        onClick={copyToOnClick}
                    >
                        СКОПИРОВАТЬ ССЫЛКУ
                        <span>
                            <Arrow />
                        </span>
                    </button>
                </div>


                <div className={`${styles.resultShare} ${styles.resultCompare} ${styles.resultShareWide} ${styles.grayBg}`}>
                    <h3>Вставьте в поле ниже ссылку от вашего друга, чтобы сравнить ваши результаты</h3>
                    <input
                        type="text"
                        value={paramsToComparePage}
                        onChange={e => setParamsToComparePage(e.target.value)}
                        placeholder="Вставьте код для сравнения"
                        className={`${styles.toCompare} ${errorUrlInput}`}
                    />
                    {urlErrorMsg && (
                        <p className={styles.errorMsg}>{urlErrorMsg}</p>
                        )}
                    <Link to={urlToComparePage}
                          disabled={isCompareUrlBad}
                          onClick={onCompareBtnClick}
                          className={`${styles.compareBtn} ${compareBtnClass} ${shakeCompareBtn}`}
                    >
                        Сравнить
                        <span>
                                <Arrow />
                            </span>
                    </Link>
                </div>


                <div className={styles.resultShare}>
                    <Link to={'/'}
                          onClick={onRefreshBtnClick}
                          className={styles.againBtn}
                    >
                        Пройти заново
                    </Link>
                </div>

                <div className={styles.resultShare}>
                    <Link to={'/contacts'}
                          className={styles.toWriteDevBtn}
                    >
                        Написать разработчикам
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default Result;