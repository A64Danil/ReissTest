import React from 'react';
import { Link } from 'react-router-dom';
import styles from './style.css';

const Menu = () => (
    <nav className={styles.menu}>
        <div className={styles['toggle-btn']}>☰</div>

        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/quests">Quests</Link></li>
        </ul>
    </nav>
);

export default Menu;