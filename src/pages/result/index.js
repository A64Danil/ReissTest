import React, {useContext, useEffect, useState} from 'react'

import styles from "../../global.scss";

import {StoreContext} from "../../model/Store.js";

const Result = ({}) => {


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
    console.log(newArr)

    useEffect(()=> {
        console.log("Вы на финальной странице")
        // console.log(store.answers.toJS().get("Еда"))


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
                    <div className={`${styles.resultBar}  ${styles["resultBar--" + obj.valueNum]}`} >{obj.valuetext}</div>

                </li>
            ))}
            </ul>
        </div>
    )
}

export default Result;