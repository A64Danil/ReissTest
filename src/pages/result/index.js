import React, {useContext, useEffect, useState} from 'react'
import {urlInlineParser, getAllUrlParams, checkUrlRes, urlResParse, sortResultDesc} from "../../helpers/parsers"
import {copyToClipboard, validURL} from "../../helpers/base"

import styles from "../../global.scss";

import {StoreContext} from "../../model/Store.js";

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
    const [compareBtnClass, setСompareBtnClass] = useState('');

    const [urlErrorMsg, setUrlErrorMsg] = useState('');


    useEffect(()=> {
        console.log("Вы на финальной странице UseEffect")
        const allUrlParams = getAllUrlParams(window.location.search);
        const stringUrlPath = urlInlineParser(allUrlParams.res);
        const userNameUrl = decodeURIComponent(allUrlParams.username);
        store.setUsername(userNameUrl);

        store.setResultUrl('result' + window.location.search);

        if (stringUrlPath) {
            console.log("Берем результат из ссылки")
            let parsedResult = urlResParse(stringUrlPath).sort(sortResultDesc);
            setFinalResultArr(parsedResult);
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
    }, [])



    useEffect(() => {
        if (!validURL(paramsToComparePage) && paramsToComparePage !== '') {
            setIsCompareUrlBad(true);
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

            // http://localhost:1234/compare?res=acc1cur1ord1pow1sav1ind1sta1soc1rom5tra1hon1ide1ven1eat1phy1fam1&username=%D0%A1%D0%B5%D1%80%D0%B6&
            // res2=acc4cur2ord2pow2sav2ind1sta1soc1rom5tra1hon1ide1ven1eat1phy1fam1&username2=%D0%90%D1%84%D0%BE%D0%BD%D1%8F
            const originUserLink = 'res=' + allUrlParams.res + '&username=' + userNameUrl;
            const secondUserLink = 'res2=' + newParamsToComparePage.res + '&username2=' + secondUserNameUrl;

            const newCompareLink = '/compare?' + originUserLink + '&' + secondUserLink;
            setUrlToComparePage(newCompareLink);
        }
        console.log(isCompareUrlBad);

    }, [paramsToComparePage, setParamsToComparePage])

    useEffect(() => {
        if (isCompareUrlBad) {
            setСompareBtnClass(styles.badUrl);
        } else {
            setСompareBtnClass("");
        }

    }, [isCompareUrlBad, setIsCompareUrlBad])


    function onCompareBtnClick(e) {
        if(paramsToComparePage === '') {
            alert('Вы ничего не ввели в поле для сравнения');
            e.preventDefault();
        }
    }



    const onRefreshBtnClick = (e) => {
        //TODO: обновлять стейт до начального
        console.log("refresh cookie and store here");
    }


    const copyToOnClick = (e) => {
        const bufferedText = e.currentTarget.textContent;
        copyToClipboard(bufferedText);
        alert("Текст скопирован");
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


                <div className={styles.resultShare}>
                    <h3>Отправьте эту ссылку другу, если хотите показать ему ваш результат или чтобы он мог сравнить свои результаты с вашими</h3>
                    <button
                        className={styles.stringToCopy}
                        onClick={copyToOnClick}
                    >
                        <p className={styles.longString}>
                            {window.location.href}
                        </p>
                    </button>
                </div>


                <div className={styles.resultShare}>
                    <h3>Вставьте в поле ниже ссылку от вашего друга, чтобы сравнить ваши результаты</h3>
                    <input
                        type="text"
                        value={paramsToComparePage}
                        onChange={e => setParamsToComparePage(e.target.value)}
                        placeholder="Вставьте код для сравнения"
                    />
                    {urlErrorMsg && (
                        <p className={styles.errorMsg}>{urlErrorMsg}</p>
                        )}
                    <Link to={urlToComparePage}
                          disabled={isCompareUrlBad}
                          onClick={onCompareBtnClick}
                          className={`${styles.compareBtn} ${compareBtnClass}`}
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
                          className={styles.refreshBtn}
                    >
                        Пройти заново
                    </Link>
                </div>

                <div className={styles.resultShare}>
                    <Link to={'/contacts'}
                          className={styles.grayBtn}
                    >
                        Написать разработчикам
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default Result;