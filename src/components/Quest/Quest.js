import React from 'react'
import styles from "./Quest.scss";

const Quest = ({questInfo, currentQuestNum}) => {

    //
    // console.log(questInfo)

    return (
        <div className={styles.Quest}>
            <h3>Вопрос #{currentQuestNum} - {questInfo.title}</h3>
            <p>{questInfo.description}</p>
            <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
            </ul>
        </div>
    )
}

export default Quest