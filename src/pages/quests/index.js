import React, {useState, useEffect, useContext} from 'react'

import Slider from "./../../components/Slider/Slider";

import {StoreContext} from "./../../model/Store";

const Quests = ({history}) => {
    const store = useContext(StoreContext)

    useEffect(()=> {
        if (!store.userName) {
            alert("Для прохождения теста вы должны указать имя");
            history.push('/name');
        }
    })

    return (
            <Slider history={history}/>
    )
}

export default Quests;