import React, {useContext, useEffect, useState} from 'react'
import {StoreContext} from "../../model/Store.js";
import {Link} from "react-router-dom";

import styles from "../../global.scss";

const Namepage = ({props}) => {
    const store = useContext(StoreContext)
    const questResults = store.answers.toJS();

    let finalResultArr = [];
    let urlLink = "";


    return (
        <>
            <h1>Как вас зовут?</h1>
            <input type="text" value=""/>
            <Link to='/quests'  className={styles.startTestBtn}>
                Дальше
            </Link>
        </>
    )
}

export default Namepage;