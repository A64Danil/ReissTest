import React from 'react';
import styles from "../../global.scss";
import {Link} from "react-router-dom";
import Arrow from "./../../assets/svg/arrow_normal";


const StartPage = ({location, match}) => {
    return (
        <div className={styles.startScreen}>
            <div className={styles.startScreen__Container} >
                <h1>Теория мотивации Рисса</h1>
                <h2>ЧТО<br/>ДЕЛАЕТ ВАС СЧАСТЛИВЫМ?</h2>
                <p>В процессе тестирования вы сможете осознать, что важно для вашего счастья</p>
                <Link to='/name'  className={styles.startTestBtn}>
                    Начать тест
                    <span>
                        <Arrow />
                    </span>
                </Link>
            </div>
        </div>

    )
}

export default StartPage;