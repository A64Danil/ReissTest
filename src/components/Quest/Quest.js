import React, {useEffect, useState} from 'react'
import styles from "./Quest.scss";


import Transition from "react-transition-group/Transition";

const Quest = ({questInfo, currentQuestNum, transState}) => {


    // useEffect(()=> {
    //     console.log("Render Quest")
    //     // console.log(showQ)
    // })

    useEffect(()=> {
        console.log("Изменился вопрос")
        // setInMove(true);
        // let newState = !inMove;
        // setInMove(newState)
        // setInMove(false)

    }, [currentQuestNum])

    // console.log(questInfo)


    return (
        <>
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

        </>

    )
}

export default Quest