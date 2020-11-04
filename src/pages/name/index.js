import React, {useContext, useEffect, useState} from 'react'
import {StoreContext} from "../../model/Store.js";

import styles from "../../global.scss";

import Arrow from "./../../assets/svg/arrow_normal";


const NamePage = ({history}) => {
    const store = useContext(StoreContext)
    console.log(store);
    let currentUserName = store.userName || '';
    const [username, setUsername] = useState(currentUserName)

    useEffect(()=> {
        // console.log('username изменился', username);
        store.setUsername(username);
    }, [username])


    function onNextBtnClick(e) {
        e.persist();

        if (username) {
            e.target.classList.remove(styles.namePageBtnAnimated)
            history.push('/guide');
            // history.push('/quests');
        } else {
            e.target.classList.add(styles.namePageBtnAnimated)
            setTimeout( () => {
                e.target.classList.remove(styles.namePageBtnAnimated)
            }, 820);
        }
    }

    return (
        <div className={styles.namePage}>
            <div className={styles.namePage__Container} >
                <h1>Как вас зовут?</h1>
                <input
                    className={styles.namePageInput}
                    type="text"
                    placeholder='Ваше имя'
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <button
                    className={`${styles.namePageBtn}`}
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