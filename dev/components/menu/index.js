import React from 'react';
import { Link } from 'react-router-dom';
import styles from './style.css';

let base = "/reisstest";

const Menu = () => (
    <nav className={styles.menu}>
        <div className={styles['toggle-btn']}>☰</div>

        <ul>
            <li><Link to={base + "/"}>Home</Link></li>
            <li><Link to={base + "/about"}>About</Link></li>
            <li><Link to={base + "/quests"}>Quests</Link></li>
        </ul>
    </nav>
);

export default Menu;