import React, {useState, useEffect} from 'react';

import Swal from 'sweetalert2';

import styles from "../../global.scss";
import Arrow from "../../assets/svg/arrow_normal";

const Contacts = ({location, match}) => {
    const [ textAreaValue, setTextAreaValue ] = useState('');
    const [ errorTextArea, setErrorTextArea ] = useState('');
    const [ emailInputValue, setEmailInputValue ] = useState('');
    const [ errorEmail, setErrorEmail ] = useState('');
    const [ errorSendBtn, setErrorSendBtn ] = useState('');
    const [ shakeSendBtn, setShakeSendBtn ] = useState('');
    const [ errorList, setErrorList ] = useState([]);

    const errorMessages = {
        'mail': 'Вы не указали почту для ответа',
        'message': 'Вы не ввели текст сообщения',
    };

    useEffect(() => {
        if(errorSendBtn && (textAreaValue.trim().length !== 0 && emailInputValue.trim().length !== 0)) setErrorSendBtn('')
    }, [errorList, textAreaValue, emailInputValue])

    const sendEmail = (event) => {
        event.preventDefault();
        const errors = [];

        if(textAreaValue.trim().length === 0 || emailInputValue.trim().length === 0) {
            setErrorSendBtn(styles.error)
        } else {
            setErrorSendBtn('')
        }

        if(textAreaValue.trim().length === 0 && emailInputValue.trim().length === 0) {
            Swal.fire('Ооххх...', 'Вы ничего не ввели!', 'error');
            setErrorTextArea(styles.error);
            setErrorEmail(styles.error);
            errors.push('mail');
            errors.push('message');
        } else {

            if(textAreaValue.trim().length === 0) {
                Swal.fire('Ооххх...', 'Вы не ввели текст сообщения!', 'error');
                setErrorTextArea(styles.error);
                errors.push('message');
            } else {
                setErrorTextArea('');
            }

            if(emailInputValue.trim().length === 0) {
                Swal.fire('Ооххх...', 'Вы не ввели свою почту!', 'error');
                setErrorEmail(styles.error);
                errors.push('mail');
            } else {
                setErrorEmail('');
            }

        }

        if(errors.length > 0) {
            setErrorList(errors);
            setShakeSendBtn(styles.sendBtnAnimated);
            setTimeout( () => {
                setShakeSendBtn('');
            }, 820);
            console.log(errors)
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
                    Swal.fire('Готово', 'Ваше сообщение отправлено!', 'success');
                    setTextAreaValue('');
                    setEmailInputValue('');
                    setErrorList([]);
                } else {
                    Swal.fire('Ооххх...', 'Что-то пошло не так. Отправить сообщение не удалось.', 'error');
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
                                rows="6"
                                placeholder="Ваше сообщение"
                                value={textAreaValue}
                                onChange={e => setTextAreaValue(e.target.value)}
                                className={errorTextArea}
                                required
                            />
                            <div className={styles.flex}>
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="Ваш email"
                                    value={emailInputValue}
                                    onChange={e => setEmailInputValue(e.target.value)}
                                    className={errorEmail}
                                    required
                                />
                                <button
                                    type="submit"
                                    value="Отправить"
                                    className={`${styles.sendBtn} ${errorSendBtn} ${shakeSendBtn}`}
                                >
                                    Отправить
                                    <span>
                                        <Arrow />
                                    </span>
                                </button>
                            </div>
                            {errorList.length>0 && (
                                <ul className={styles.errorList}>
                                    {errorList.map((el, i) => {
                                        return (
                                            <li key={`item${i}`}>{errorMessages[el]}</li>
                                        )
                                    })}
                                </ul>
                            )}
                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Contacts;