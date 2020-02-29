import React from 'react';
import styles from "../../global.scss";
import {Link} from "react-router-dom";


const StartPage = ({location, match}) => {
    return (
        <div className={styles.startScreen}>
            <h1>Теория мотивации Рисса</h1>
            <h2>ЧТО ДЕЛАЕТ ВАС СЧАСТ&shy;ЛИВЫМ?</h2>
            <p>Эти характеристики остаются практически неизменными на протяжении всей вашей жизни</p>
            <Link to='/quests'  className={styles.startTestBtn}>
                Начать тест <span>&#62;</span>
            </Link>
        </div>

    )
}

export default StartPage;