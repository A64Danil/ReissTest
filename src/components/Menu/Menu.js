import React from 'react'
import {NavLink} from 'react-router-dom';

import styles from "./Menu.scss";

const Menu = () => {
    return (
        <>
            <nav  className={styles.Menu} id="hamnav">
                <div className={styles.Menu__Container}>
                    <label htmlFor="hamburger" className={styles.hamburgerLabel}>&#9776;</label>
                    <input type="checkbox" className={styles.hamburgerCheker} id="hamburger"/>


                    <div id="hamitems" className={styles.hamburgerItems}>
                        <a href="index.html">Home</a>
                        <a href="about.html">About</a>
                        <a href="tech.html">Tech</a>
                        <a href="/contacts">Контакты</a>
                        <a href="reviews.html">Reviews</a>
                    </div>
                </div>
            </nav>
            <div className={styles.MenuOLD}>
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
        </>
    )
}

export default Menu