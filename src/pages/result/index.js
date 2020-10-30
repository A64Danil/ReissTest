import React, {useContext, useEffect, useState} from 'react'
import {urlInlineParser, getAllUrlParams, checkUrlRes} from "../../helpers/parsers"
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
    const [urlLink, setUrlLink] = useState("");
    const [linkToCompare, setLinkToCompare] = useState("");
    const [paramsToComparePage, setParamsToComparePage] = useState("");
    const [urlToComparePage, setUrlToComparePage] = useState("");
    const [isCompareUrlBad, setIsCompareUrlBad] = useState(false);
    const [compareBtnClass, setСompareBtnClass] = useState('');

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
            // TODO: сделать рефакторинг - свести два цикла в один (тут та же фигня что и в compare page)
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
        if (!validURL(paramsToComparePage) && paramsToComparePage !== '') {
            setIsCompareUrlBad(true);
            alert('Вы вводите неправильный формат ссылки.')
            return
        };

        let allUrlParams = getAllUrlParams(window.location.search);
        let userNameUrl = decodeURIComponent(allUrlParams.username);
        let newParamsToComparePage = getAllUrlParams(paramsToComparePage);
        let secondUserNameUrl = decodeURIComponent(newParamsToComparePage.username);
        //TODO: доделать чекУрл функцию в этом месте
        console.log(isCompareUrlBad);

        if (checkUrlRes(urlInlineParser(newParamsToComparePage.res)) !== "successful") {
            setIsCompareUrlBad(true);
            alert(checkUrlRes(urlInlineParser(newParamsToComparePage.res)));
            return;
        } else {
            setIsCompareUrlBad(false);
        }
        // http://localhost:1234/compare?res=acc1cur1ord1pow1sav1ind1sta1soc1rom5tra1hon1ide1ven1eat1phy1fam1&username=%D0%A1%D0%B5%D1%80%D0%B6&
        // res2=acc4cur2ord2pow2sav2ind1sta1soc1rom5tra1hon1ide1ven1eat1phy1fam1&username2=%D0%90%D1%84%D0%BE%D0%BD%D1%8F
        let originUserLink = 'res=' + allUrlParams.res + '&username=' + userNameUrl;
        let secondUserLink = 'res2=' + newParamsToComparePage.res + '&username2=' + secondUserNameUrl;

        const newCompareLink = '/compare?' + originUserLink + '&' + secondUserLink;

        setUrlToComparePage(newCompareLink);
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
                    <h3>Отправьте эту ссылку другу, если хотите показать ему ваш результат</h3>
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
                    <h3>Вставьте в поле ниже код от вашего друга, чтобы сравнить ваши результаты</h3>
                    <input
                        type="text"
                        value={paramsToComparePage}
                        onChange={e => setParamsToComparePage(e.target.value)}
                        placeholder="Вставьте код для сравнения"
                    />
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
                    <h3>Отправьте этот код другу, чтобы он мог сравнить свои результаты с вашими</h3>
                    <button
                        className={styles.stringToCopy}
                        onClick={copyToOnClick}
                    >
                        <p className={styles.longString}>{linkToCompare}</p>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Result;