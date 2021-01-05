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
    '/name':  "hiddenTheme",
    '/contacts':  "grayTheme",
    '/guide':  "hiddenTheme",
    '/quests':  "hiddenTheme",
    '/result':  "grayTheme",
    default: "defaultTheme"
}

const Menu = () => {
    const {pathname} = useLocation();
    const menuClassName = themesByPath[pathname] || themesByPath.default;
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    // const store = useContext(StoreContext);

    let resultRender;


    useEffect(()=> {
        window.scrollTo(0, 0);
        setIsMenuOpen(false);
        if (themesByPath[pathname] === 'hiddenTheme') {
            resultRender = null;
        }
    }, [pathname])


    resultRender =  (
        <>
            <nav  className={`${styles.Menu} ${styles[menuClassName]}`}  >
                <input
                    type="checkbox"
                    className={styles.hamburgerCheker}
                    id="hamburgerMenuFlag"
                    checked={isMenuOpen}
                    onChange={e=>setIsMenuOpen(!isMenuOpen)}
                />
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
                                Главная <span>(v0.75)</span>
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
    );

    return resultRender;

}


export default Menu;
// export default observer(Menu);