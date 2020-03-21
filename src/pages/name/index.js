import React, {useContext, useEffect, useState} from 'react'
import {StoreContext} from "../../model/Store.js";
import {Link} from "react-router-dom";

import styles from "../../global.scss";

// import Arrow from "./../../assets/svg/arrow_thin.svg";
import ArrowThin from "./../../assets/svg/arrow_thin";
import Arrow from "./../../assets/svg/arrow_normal";


const Namepage = ({props}) => {
    const store = useContext(StoreContext)
    let currentUserName = store.userName || '';
    const [username, setUsername] = useState(currentUserName)

    useEffect(()=> {
        // console.log('username изменился', username);
        store.setUsername(username);
    }, [username])


    return (
        <div className={styles.namePage}>
            <div className={styles.namePage__Container} >
                <h1>Как вас зовут?</h1>
                <input
                    className={styles.namePageInput}
                    type="text"
                    placeholder='Username'
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <Link to='/quests'  className={styles.namePageBtn}>
                    Продолжить 
                    <span>
                        <Arrow />
                    </span>
                </Link>
            </div>
        </div>
    )
}

export default Namepage;