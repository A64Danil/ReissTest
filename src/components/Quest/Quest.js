import React, {useContext, useEffect, useState} from 'react'

import styles from "./Quest.scss";

import json from "./../../model/quests";

import { Slider } from 'antd';

import {StoreContext} from "./../../model/Store";

import {Redirect} from 'react-router-dom'

import {db, dbFirestore} from "../../firebase";


const collectionName = 'reissresults';

const Quest = ({questInfo, currentQuestNum, questsTotal, onAfterChange, onChange, answerPosition, answerValueForInputBg}) => {
    const store = useContext(StoreContext)
    let USER_NAME = store.userName;

    // Формируем финальный УРЛ если отетил на 16 вопрсов
    if (currentQuestNum > questsTotal) {
        let tempFinalRes = store.answers.toJS();
        let newObjUrl = {};

        tempFinalRes.forEach( (val, key) => {
            let shortName;
            json.forEach((quest)=> {
                if(quest.keyTitle == key) {
                    shortName = quest.urlName;
                }

            })

            newObjUrl[shortName] = val / 100;

        });

        let urlAnswersString = "";
        for (const name in newObjUrl) {
            urlAnswersString += name + newObjUrl[name];
        }

        let urlFullLink = "/result?res=" + urlAnswersString + "&username=" + USER_NAME;

        if (!store.isResultSent) {
            let preparedAnswersArr = [];
            tempFinalRes.forEach((value, keyName) => {
                preparedAnswersArr.push({ keyName, value });
            });
            preparedAnswersArr.sort((prev, next) => next.value - prev.value);

            if (!!!USER_NAME) USER_NAME = "Без имени =("
            db.collection(collectionName).add({
                name: USER_NAME,
                answers: preparedAnswersArr,
                resultUrl: urlFullLink,
                timeStamp: dbFirestore.FieldValue.serverTimestamp()
            })
                .then(function () {
                    // console.log("Document successfully written!");
                    store.setIsResultSent(true)
                })
                .catch(function (error) {
                    console.error("Error writing document: ", error);
                });

        }

        return <Redirect to={urlFullLink} />
    }

    return (
        <>
            <div className={styles.Quest}>

                    <div className={styles.QuestText}>
                        <div className={styles.QuestText__Container} >
                            <p className={styles.QuestNumber}>{currentQuestNum}/16 желание</p>
                            <h3  className={styles.QuestTitle}>{questInfo.htmlTitle}</h3>
                            <p className={styles.QuestDescription}>{questInfo.description}</p>
                        </div>
                    </div>

                    <div className={styles.QuestAnswerWrp}>

                        {questInfo.answers && (
                            <div className={styles.QuestAnswers} >
                                { answerPosition <= 150 && (
                                    <>
                                        <div className={styles.QuestAnswerLevel}>Слабое</div>
                                        <div className={styles.QuestAnswerDescr}>{questInfo.answers[0]}</div>
                                    </>
                                )}

                                { 151 <= answerPosition && answerPosition <= 250 && (
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