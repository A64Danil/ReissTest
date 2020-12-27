// import React from 'react';
import React, {useState, useEffect} from 'react';

import Swal from 'sweetalert2';

import styles from "../../global.scss";
import Arrow from "../../assets/svg/arrow_normal";
// import {Link} from "react-router-dom";

// TODO: добаить отправку письма на почту
const Contacts = ({location, match}) => {

    const { innerWidth: width, innerHeight: height } = window;
    const [ textAreaValue, setTextAreaValue ] = useState('');
    const [ emailInputValue, setEmailInputValue ] = useState('');

    const textAreaSize = {
        cols: innerWidth < 480 ? 25 : 50,
        rows: 6
    }

    // useEffect(() => {
    //     console.log("Введен текст");
    //     console.log(textAreaValue);
    //     console.log(emailInputValue);
    // }, [textAreaValue, emailInputValue])

    const sendEmail = (event) => {
        event.preventDefault();

        if(textAreaValue.trim().length === 0) {
            // alert('Вы не ввели текст сообщения');
            Swal.fire('Ооххх...', 'Вы не ввели текст сообщения!', 'error');
            return;
        }

        if(emailInputValue.trim().length === 0) {
            // alert('Вы не ввели свою почту');
            Swal.fire('Ооххх...', 'Вы не ввели свою почту!', 'error');
            return;
        }

        const mail = {
            email: event.target.email.value,
            message: event.target.message.value
        }
        fetch("http://rt.qoobeo.ru/core/send.php", {
                method: 'post',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    "Content-Type":"application/x-form-urlencoded"
                },
                body: JSON.stringify(mail)
            })
            .then(res => res.text())
            .then(res => {
                if (res === '"Письмо отправлено. Через 5 секунд мы вернем вас назад!"') {
                    alert("Письмо отправлено!");
                } else {
                    alert("Что-то пошло не так. Отправить сообщение не удалось.")
                }
            })
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
                        <form action="core/send.php" method="POST" onSubmit={sendEmail}>
                            <p className={styles.boldText}>
                                <strong>
                                Хотите поделиться впечатлениями?<br/>
                                Есть комментария/предложения/вопросы?
                                </strong>
                            </p>

                            <p className={styles.regularText}>Будем рады обратной связи :)</p>

                            <textarea
                                name="message"
                                id=""
                                cols={textAreaSize.cols}
                                rows="6"
                                placeholder="Ваше сообщение"
                                value={textAreaValue}
                                onChange={e => setTextAreaValue(e.target.value)}
                            />
                            <div className={styles.flex}>
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="Ваш email"
                                    value={emailInputValue}
                                    onChange={e => setEmailInputValue(e.target.value)}
                                />
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