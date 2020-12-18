import React, {useState, useEffect, useContext} from 'react'
import {NavLink} from 'react-router-dom';
import {useLocation} from "react-router-dom";
import styles from "./Menu.scss";
// import {StoreContext} from "../../model/Store";

// вроде пока не нужен
// import { observer } from "mobx-react"

import CrossIco from "./../../assets/svg/cross";

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

    // const store = useContext(StoreContext);

    // TODO: доделать правильные иконки меню, исправить z-index
    return (
        <>
            <nav  className={`${styles.Menu} ${styles[menuClassName]}`}  >
                <input type="checkbox" className={styles.hamburgerCheker} id="hamburgerMenuFlag"/>
                <div className={styles.Menu__Container}>
                    <label htmlFor="hamburgerMenuFlag" className={styles.hamburgerLabel}>
                        <span className={styles.icoHamburger}>&#9776;</span>
                        <span className={styles.icoCross}>
                            <CrossIco />
                        </span>
                    </label>

                    <ul className={styles.hamburgerItems}>
                        <li>
                            <NavLink to='/' exact activeClassName={styles.active}>
                                Home <span>(v0.684)</span>
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


export default Menu;
// export default observer(Menu);