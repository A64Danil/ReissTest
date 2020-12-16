import React from 'react';


import styles from "../../global.scss";


const Contacts = ({location, match}) => {
    return (
        <div className={styles.contactsPage}>
            <div className={styles.contactsPage__Container}>
                <h1>Контакты разработчиков</h1>
            </div>
        </div>
    )
}

export default Contacts;