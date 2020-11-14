import React, {useContext, useEffect, useState} from 'react'
import {NavLink} from 'react-router-dom';

import styles from "./Menu.scss";
import {StoreContext} from "../../model/Store";

const Menu = () => {
    const store = useContext(StoreContext);
    let currentUserName = store.userName || '';
    const [userName, setUserName] = useState(currentUserName);

    useEffect(()=> {
        console.log('store.userName', store.userName);
        // store.setUsername(username);
    }, [store.userName])

    return (
        <div className={styles.Menu}>
            <ul className={styles.MenuList}>
                <li>
                    <NavLink to='/' exact activeClassName={styles.active}>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/quests' activeClassName={styles.active}>
                        Тест
                    </NavLink>
                </li>
                <li>
                    <span>
                        1 - {store.userName} - 2
                        {userName && (
                            <>Привет, {userName}!</>
                        )}
                        {!userName && (
                            <>Привет!</>
                        )}
                    </span>
                </li>
                <li>
                    <span>
                        v0.685
                    </span>
                </li>
            </ul>
        </div>
    )
}

export default Menu