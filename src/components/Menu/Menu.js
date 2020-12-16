import React, {useState, useEffect, useContext} from 'react'
import {NavLink} from 'react-router-dom';
import {useLocation} from "react-router-dom";
import styles from "./Menu.scss";

const themesByPath = {
    '/':  "defaultTheme",
    '/name':  "grayTheme",
    '/contacts':  "grayTheme",
    '/guide':  "grayTheme",
    '/quests':  "grayTheme",
    default: "defaultTheme"
}

const Menu = () => {

    const {pathname} = useLocation();
    const menuClassName = themesByPath[pathname] || themesByPath.default;

    return (
        <>
            <nav  className={`${styles.Menu} ${styles[menuClassName]}`}  >
                <input type="checkbox" className={styles.hamburgerCheker} id="hamburgerMenuFlag"/>
                <div className={styles.Menu__Container}>
                    <label htmlFor="hamburgerMenuFlag" className={styles.hamburgerLabel}>
                        <span className={styles.icoHamburger}>&#9776;</span>
                        <span className={styles.icoCross}>&#215;</span>
                    </label>

                    <ul className={styles.hamburgerItems}>
                        <li>
                            <NavLink to='/' exact activeClassName={styles.active}>
                                Home <span>(v0.683)</span>
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
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Menu