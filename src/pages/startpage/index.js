import React from 'react';
import styles from "../../global.scss";
import {Link} from "react-router-dom";


const StartPage = ({location, match}) => {
    return (
        <div className={styles.startScreen}>
            <div className={styles.startScreen__Container} >
                <h1>Теория мотивации Рисса</h1>
                <h2>ЧТО ДЕЛАЕТ ВАС СЧАСТ&shy;ЛИВЫМ?</h2>
                <p>Эти характеристики остаются практически неизменными на протяжении всей вашей жизни</p>
                <Link to='/name'  className={styles.startTestBtn}>
                    Начать тест <span>&#62;</span>
                </Link>
            </div>
        </div>

    )
}

export default StartPage;