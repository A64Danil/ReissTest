import React, {useContext, useEffect, useState} from 'react'

import 'antd/dist/antd.css';

import styles from "./Quest.scss";
// import './CustomSliderStyle.scss';

import json from "./../../model/quests";

import { Slider } from 'antd';

import {StoreContext} from "./../../model/Store";

import {Redirect} from 'react-router-dom'

import {db} from "../../firebase";

const Quest = ({questInfo, currentQuestNum, questsTotal, onAfterChange, onChange, answerPosition, answerValueForInputBg}) => {
    const store = useContext(StoreContext)
    let USER_NAME = store.userName;

    // Формируем финальный УРЛ если отетил на 16 вопрсов
    if (currentQuestNum > questsTotal) {
        console.log("------------------------ здесь собираем все ответы")
        let tempFinalRes = store.answers.toJS();

        console.log("tempFinalRes")
        console.log(tempFinalRes)
        let newObjUrl = {};

        console.log(json)
        tempFinalRes.forEach( (val, key) => {
            let shortName;
            json.forEach((quest)=> {
                if(quest.keyTitle == key) {
                    shortName = quest.urlName;
                }

            })

            newObjUrl[shortName] = val / 100;

        })

        console.log(newObjUrl);

        let urlAnswersString = "";
        for (const name in newObjUrl) {
            urlAnswersString += name + newObjUrl[name];
        }
        console.log(urlAnswersString);

        let urlFullLink = "/result?res=" + urlAnswersString;


        console.log("Сейчас отправим в бд...")
        let preparedAnswers = {};
        tempFinalRes.forEach( (value, keyName) => {
            preparedAnswers[keyName] = value;
        });
        if(!!!USER_NAME) USER_NAME = "Без имени =("
        db.collection("test").add({
            name: USER_NAME,
            answers: preparedAnswers
        })
            .then(function() {
                console.log("Document successfully written!");
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
            });



        return <Redirect to={urlFullLink} />
    }

    return (
        <>
            <div className={styles.Quest}>
                <div className={styles.QuestText}>
                    <p className={styles.QuestNumber}>{currentQuestNum}/16 желание</p>
                    <h3  className={styles.QuestTitle}>{questInfo.htmlTitle}</h3>
                    <p className={styles.QuestDescription}>{questInfo.description}</p>
                </div>

                <div className={styles.QuestAnswerWrp}>

                    {questInfo.answers && (
                        <div className={styles.QuestAnswers} style={{display: "none1"}}>
                            {answerPosition <= 150 && (
                                <>
                                    <div className={styles.QuestAnswerLevel}>Слабое</div>
                                    <div className={styles.QuestAnswerDescr}>{questInfo.answers[0]}</div>
                                </>
                            )}

                            {  151 <= answerPosition && answerPosition <= 250 && (
                                <>
                                    <div className={styles.QuestAnswerLevel}>Ниже среднего</div>
                                    <div className={styles.QuestAnswerDescr}>{questInfo.answers[1]}</div>
                                </>
                            )}

                            { 251 <= answerPosition && answerPosition <= 350 && (
                                <>
                                    <div className={styles.QuestAnswerLevel}>Среднее</div>
                                    <div className={styles.QuestAnswerDescr}>{questInfo.answers[2]}</div>
                                </>
                            )}

                            { 351 <= answerPosition && answerPosition < 450 && (
                                <>
                                    <div className={styles.QuestAnswerLevel}>Выше среднего</div>
                                    <div className={styles.QuestAnswerDescr}>{questInfo.answers[3]}</div>
                                </>
                            )}

                            { 450 <= answerPosition && (
                                <>
                                    <div className={styles.QuestAnswerLevel}>Сильное</div>
                                    <div className={styles.QuestAnswerDescr}>{questInfo.answers[4]}</div>
                                </>
                            )}
                        </div>
                    )}

                    <div className={`${styles.QuestRangeSliderWrp}  ${styles["QuestRangeSliderWrp--" + answerValueForInputBg]}`} >
                        <Slider
                            min={100}
                            max={500}
                            dots={false}
                            onChange={onChange}
                            onAfterChange={onAfterChange}
                            value={answerPosition}
                            defaultValue={answerPosition}
                            tooltipVisible={false}
                        />
                    </div>

                </div>

            </div>

        </>

    )
}

export default Quest