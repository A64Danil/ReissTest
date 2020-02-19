import React, {useEffect, useState} from 'react'
import styles from "./Quest.scss";
import 'antd/dist/antd.css';
// import './CustomSliderStyle.css';

import { Slider } from 'antd';

import Transition from "react-transition-group/Transition";

const Quest = ({questInfo, currentQuestNum, transState}) => {
    const [answerPosition, setAnswerPosition] = useState(300);

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


    function onChange(value) {

        // if (value < 130) {
        //     setAnswerPosition(100);
        // } else if (171 < value && value < 230) {
        //     setAnswerPosition(200);
        // } else {
        //     setAnswerPosition(value);
        // }

        switch (true) {
             case value < 115:
                 setAnswerPosition(100);
                 break;
             case (185 < value && value < 215):
                 setAnswerPosition(200);
                 break;
             case (285 < value && value < 315):
                 setAnswerPosition(300);
                 break;
             case (385 < value && value < 415):
                 setAnswerPosition(400);
                 break;
             case (485 < value):
                 setAnswerPosition(500);
                 break;
             default:
                setAnswerPosition(value);
        }


        // console.log('answerPosition: ', answerPosition);
    }

    return (
        <>
            <div className={styles.Quest}>
                <div className={styles.QuestText}>
                    <p className={styles.QuestNumber}>{currentQuestNum}/16 желание</p>
                    <h3  className={styles.QuestTitle}>{questInfo.title}</h3>
                    <p className={styles.QuestDescription}>{questInfo.description}</p>
                </div>

                <ul>
                    <li>1 100 - 130</li>
                    <li>2 171 - 230</li>
                    <li>3 271 - 330</li>
                    <li>4 371 - 430</li>
                    <li>5 471 - 500</li>
                </ul>


                <Slider
                    min={100}
                    max={500}
                    dots={false}
                    onChange={onChange}
                    value={answerPosition}
                    defaultValue={answerPosition}
                    tooltipVisible={false}
                />
            </div>

        </>

    )
}

export default Quest