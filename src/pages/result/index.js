import React, {useContext, useEffect, useState} from 'react'

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
            value: valToText
        }
        newArr.push(newObj)
    })
    console.log(newArr)

    useEffect(()=> {
        console.log("Вы на финальной странице")
        // console.log(store.answers.toJS().get("Еда"))


    }, [])

    return (
        <>
            <h1>Результат вашего теста</h1>

            {newArr.length < 16 && (
                <h3>Что-то пошло не так. Вы ответили не на все вопросы.</h3>
            )}

            <ul>
            { newArr.map( (obj) => (
                <li key={obj.title}>{obj.title} - {obj.value}</li>
            ))}
            </ul>
        </>
    )
}

export default Result;