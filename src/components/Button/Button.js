import React from 'react'
import styles from "./Button.scss";

const Button = ({text}) => {
    return (
        <button className={styles.Button}>{text}</button>
    )
}

export default Button