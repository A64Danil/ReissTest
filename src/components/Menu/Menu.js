import React from 'react'
import {NavLink} from 'react-router-dom';

import styles from "./Menu.scss";

const Menu = () => {
    return (
        <div className={styles.Menu}>
            <ul className={styles.MenuList}>
                <li>
                    <NavLink to='/' exact activeClassName={styles.active}>
                        Главная
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/quests' activeClassName={styles.active}>
                        Тест
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/contacts' activeClassName={styles.active}>
                        Контакты
                    </NavLink>
                </li>
                <li>
                    <span>
                        V-0.643
                    </span>
                </li>
            </ul>
        </div>
    )
}

export default Menu