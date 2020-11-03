import React, {useContext} from 'react'
import {NavLink} from 'react-router-dom';

import styles from "./Menu.scss";
import {StoreContext} from "../../model/Store";

const Menu = () => {
    const store = useContext(StoreContext);
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
                {/*<li>*/}
                {/*    <NavLink to='/contacts' activeClassName={styles.active}>*/}
                {/*        Контакты*/}
                {/*    </NavLink>*/}
                {/*</li>*/}
                <li>
                    <span>
                        {store.userName && (
                            <>Привет, {store.userName}!</>
                        )}
                        {!store.userName && (
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