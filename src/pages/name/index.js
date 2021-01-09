import React, {useContext, useEffect, useState} from 'react'
import {StoreContext} from "../../model/Store.js";

import styles from "../../global.scss";

import Arrow from "./../../assets/svg/arrow_normal";


const NamePage = ({history}) => {
    const store = useContext(StoreContext);
    let currentUserName = store.userName || '';
    const [username, setUsername] = useState(currentUserName);
    const [errorName, setErrorName] = useState('');
    const [shakeNameBtn, setShakeNameBtn] = useState('');
    useEffect(()=> {
        store.setUsername(username);
    }, [username]);


    function onNextBtnClick(e) {
        e.persist();

        if (username) {
            setShakeNameBtn('');
            history.push('/guide');
        } else {
            setErrorName(styles.error);
            setShakeNameBtn(styles.namePageBtnAnimated);
            setTimeout( () => {
                setShakeNameBtn('');
            }, 820);
        }
    }

    return (
        <div className={styles.namePage}>
            <div className={styles.namePage__Container} >
                <h1>Как вас зовут?</h1>
                <input
                    className={`${styles.namePageInput} ${errorName}`}
                    type="text"
                    placeholder='Ваше имя'
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <button
                    className={`${styles.namePageBtn} ${shakeNameBtn}`}
                    onClick={e => onNextBtnClick(e)}
                >
                    Продолжить 
                    <span>
                        <Arrow />
                    </span>
                </button>
            </div>
        </div>
    )
}

export default NamePage;