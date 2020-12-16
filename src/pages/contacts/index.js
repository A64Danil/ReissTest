import React from 'react';


import styles from "../../global.scss";

// TODO: добаить инфу и верстку
const Contacts = ({location, match}) => {
    return (
        <div className={styles.contactsPage}>
            <div className={styles.contactsPage__Container}>
                <h1>Контакты разработчиков</h1>

                Идея, механика, тексты, дизайн<br />
                Анна<br />
                ann.po.work@gmail.com<br />
                +7 (917) 571-21-50<br />
                <br />
                Разработка на React<br />
                Даниил<br />
                a64danil@mail.ru<br />
                https://github.com/A64Danil/ReissTest<br />
            </div>
        </div>
    )
}

export default Contacts;