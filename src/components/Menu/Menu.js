import React from 'react'
import {NavLink} from 'react-router-dom';

import styles from "./Menu.scss";

const Menu = () => {
    return (
        <>
            <nav  className={styles.Menu} >
                <div className={styles.Menu__Container}>
                    <label htmlFor="hamburgerMenuIcon" className={styles.hamburgerLabel}>&#9776;</label>
                    <input type="checkbox" className={styles.hamburgerCheker} id="hamburgerMenuIcon"/>

                    <ul className={styles.hamburgerItems}>
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
                            <NavLink to='/contacts' activeClassName={styles.active}>
                                Контакты
                            </NavLink>
                        </li>
                        <li>
                        <span>
                            v0.682
                        </span>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Menu