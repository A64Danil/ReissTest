import React, {useContext, useEffect, useState} from 'react'

import {StoreContext} from "../../model/Store.js";

const Result = ({location, match}) => {


    const store = useContext(StoreContext)

    useEffect(()=> {
        console.log("Вы на финальной странице")
        console.log(store)
    }, [])

    return (
        <h1>Результат вашего теста</h1>
    )
}

export default Result;