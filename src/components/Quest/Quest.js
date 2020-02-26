import React, {useEffect, useState} from 'react'

import 'antd/dist/antd.css';

import styles from "./Quest.scss";
import './CustomSliderStyle.scss';

import { Slider } from 'antd';

const Quest = ({questInfo, currentQuestNum, transState}) => {
    const [answerPosition, setAnswerPosition] = useState(300);


    useEffect(()=> {
        console.log("Изменился вопрос")
        console.log(currentQuestNum)
        // setInMove(true);
        // let newState = !inMove;
        // setInMove(newState)
        // setInMove(false)
    }, [currentQuestNum])

    // console.log(questInfo)


    function onChange(value) {

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

    }

    return (
        <>
            <div className={styles.Quest}>
                <div className={styles.QuestText}>
                    <p className={styles.QuestNumber}>{currentQuestNum}/16 желание</p>
                    <h3  className={styles.QuestTitle}>{questInfo.title}</h3>
                    <p className={styles.QuestDescription}>{questInfo.description}</p>
                </div>

                {questInfo.answers && (
                    <div className={styles.QuestAnswers}>
                        {answerPosition <= 151 && (
                            <>
                                <div className={styles.QuestAnswerLevel}>Слабое</div>
                                <div className={styles.QuestAnswerDescr}>{questInfo.answers[0]}</div>
                            </>
                        )}

                        {answerPosition < 250 && answerPosition > 151 && (
                            <>
                                <div className={styles.QuestAnswerLevel}>Ниже среднего</div>
                                <div className={styles.QuestAnswerDescr}>{questInfo.answers[1]}</div>
                            </>
                        )}

                        {answerPosition < 350 && answerPosition > 251 && (
                            <>
                                <div className={styles.QuestAnswerLevel}>Среднее</div>
                                <div className={styles.QuestAnswerDescr}>{questInfo.answers[2]}</div>
                            </>
                        )}

                        {answerPosition < 450 && answerPosition > 351 && (
                            <>
                                <div className={styles.QuestAnswerLevel}>Выше среднего</div>
                                <div className={styles.QuestAnswerDescr}>{questInfo.answers[3]}</div>
                            </>
                        )}

                        {answerPosition >= 451 && (
                            <>
                                <div className={styles.QuestAnswerLevel}>Сильное</div>
                                <div className={styles.QuestAnswerDescr}>{questInfo.answers[4]}</div>
                            </>
                        )}
                    </div>
                )}

                <div className={styles.QuestRangeSliderWrp}>
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

            </div>

        </>

    )
}

export default Quest