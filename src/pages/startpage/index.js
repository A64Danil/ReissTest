import React, {useContext} from 'react';
import styles from "../../global.scss";
import {Link} from "react-router-dom";
import Arrow from "./../../assets/svg/arrow_normal";
import {StoreContext} from "../../model/Store";

//TODO : доделать верстку главного экрана
const StartPage = ({location, match}) => {
    const store = useContext(StoreContext);
    console.log(store);
    return (
        <div className={styles.startScreen}>
            <div className={styles.startScreen__Container} >
                <h1>Теория мотивации Рисса</h1>
                <h2><span className={styles.whatWord}>ЧТО </span>ДЕЛАЕТ ВАС СЧАСТЛИВЫМ?</h2>
                {/*<p>В процессе тестирования вы сможете осознать, что важно для вашего счастья</p>*/}
                <p>Эти характеристики остаются практически неизменными на протяжении всей вашей жизни</p>
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