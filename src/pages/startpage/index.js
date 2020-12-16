import React, {useContext} from 'react';
import styles from "../../global.scss";
import {Link} from "react-router-dom";
import Arrow from "./../../assets/svg/arrow_normal";
import {StoreContext} from "../../model/Store";


const StartPage = ({location, match}) => {
    const store = useContext(StoreContext);
    // console.log("Резетим стейт");
    // store.resetState();
    console.log(store);
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