import React from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./style.css";

const Menu = () => (
	<nav className={styles.menu}>
		<div className={styles["toggle-btn"]}>☰</div>
		<ul>
			<li className={styles.menu_link}>
				<NavLink exact to="/" activeClassName={styles.menu_link__active}>
					Home
				</NavLink>
			</li>
			<li className={styles.menu_link}>
				<NavLink to="/about" activeClassName={styles.menu_link__active}>
					About
				</NavLink>
			</li>
			<li className={styles.menu_link}>
				<NavLink to="/quests" activeClassName={styles.menu_link__active}>
					Quests
				</NavLink>
			</li>
		</ul>
	</nav>
);

export default Menu;
