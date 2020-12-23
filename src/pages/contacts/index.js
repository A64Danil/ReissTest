import React from 'react';


import styles from "../../global.scss";
import Arrow from "../../assets/svg/arrow_normal";
// import {Link} from "react-router-dom";

// TODO: добаить отправку письма на почту
const Contacts = ({location, match}) => {


    const { innerWidth: width, innerHeight: height } = window;

    const textAreaSize = {
        cols: innerWidth < 480 ? 25 : 50,
        rows: 6
    }

    return (
        <div className={styles.contactsPage}>
            <div className={styles.contactsPage__Container}>
                <h1>Контакты<br /> разработчиков</h1>

                <div className={styles.mainContent}>
                    <div className={styles.contacts}>

                        <p className={styles.authorDescript}>Идея, механика, тексты, дизайн</p>
                        <p className={styles.authorName}>Анна</p>
                        <p className={styles.authorLinks}>
                            ann.po.work@gmail.com<br />
                            +7 (917) 571-21-50
                        </p>
                        <hr/>
                        <p className={styles.authorDescript}>Разработка на React</p>
                        <p className={styles.authorName}>Даниил</p>
                        <p className={styles.authorLinks}>
                            a64danil@mail.ru<br />
                            <a href="https://github.com/A64Danil/ReissTest" target="_blank">github.com/A64Danil</a>
                        </p>
                    </div>
                    <div className={styles.questForm}>
                        <form action="">
                            <p className={styles.boldText}>
                                <strong>
                                Хотите поделиться впечатлениями?<br/>
                                Есть комментария/предложения/вопросы?
                                </strong>
                            </p>

                            <p className={styles.regularText}>Будем рады обратной связи :)</p>

                            <textarea name="" id="" cols={textAreaSize.cols} rows="6" placeholder="Ваше сообщение"/>
                            <div className={styles.flex}>
                                <input type="email" placeholder="Ваш email"/>
                                <button type="submit" value="Отправить" className={styles.sendBtn}>
                                    Отправить
                                    <span>
                                        <Arrow />
                                    </span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Contacts;