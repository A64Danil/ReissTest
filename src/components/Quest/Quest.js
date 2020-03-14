import React, {useContext, useEffect, useState} from 'react'

import 'antd/dist/antd.css';

import styles from "./Quest.scss";
// import './CustomSliderStyle.scss';

import { Slider } from 'antd';

import {StoreContext} from "./../../model/Store";

import {Link, Redirect} from 'react-router-dom'

const Quest = ({questInfo, currentQuestNum, questsTotal}) => {
    const store = useContext(StoreContext)
    let currentAnswerPosition = store.answers.get(questInfo.title) || 300;
    const [answerPosition, setAnswerPosition] = useState(300);
    const [answerValueForInputBg, setAnswerValueForInputBg] = useState(300);
    // const [isSliderClicked, setIsSliderClicked] = useState(false);
    // let classForRangeSlider =

    useEffect(()=> {
        console.log("Изменился вопрос, теперь это №"+currentQuestNum)
        // console.log(isSliderClicked)

        console.log("value for input bg " + answerValueForInputBg)
        console.log("answerPosition " + answerPosition)
        // console.log(questInfo);
        // console.log(store)
        // console.log(store.answers.toJS())
        setAnswerValueForInputBg(currentAnswerPosition);
        setAnswerPosition(currentAnswerPosition);

    }, [questInfo])

    function rangeSliderMagnet(value) {
        switch (true) {
            case value < 120:
                setAnswerPosition(100);
                break;
            case (180 < value && value < 220):
                setAnswerPosition(200);
                break;
            case (280 < value && value < 320):
                setAnswerPosition(300);
                break;
            case (380 < value && value < 420):
                setAnswerPosition(400);
                break;
            case (480 < value):
                setAnswerPosition(500);
                break;
            default:
                setAnswerPosition(value);
        }
    }

    function rangeSliderStrongMagnet(value) {
        switch (true) {
            case value <= 150:
                return(100);
                break;
            case (151 <= value && value <= 250):
                return(200);
                break;
            case (251 <= value && value <= 350):
                return(300);
                break;
            case (351 <= value && value < 450):
                return(400);
                break;
            case (450 <= value):
                return(500);
                break;
            default:
                return(value);
        }

    }


    function onChange(value) {
        rangeSliderMagnet(value);
        let flatValue = rangeSliderStrongMagnet(value);
        setAnswerValueForInputBg(flatValue)
    }

    function onAfterChange(value) {
        let flatValue = rangeSliderStrongMagnet(value);
        let answer = {
            title: questInfo.title,
            value: flatValue
        };
        setAnswerPosition(flatValue);
        store.addAnswer(answer);
    }


    // Формируем финальный УРЛ если отетил на 16 вопрсов
    if (currentQuestNum > questsTotal) {
        console.log("------------------------ здесь собираем все ответы")
        let tempFinalRes = store.answers.toJS();
        let newObjUrl = {};
        tempFinalRes.forEach( (val, key) => {
            // console.log(key, val)
            // switch name
            let shortName;
            switch (key) {
                case ("Одобрение"):
                    shortName = "od";
                    break;
                case ("Любопытство"):
                    shortName = "lu";
                    break;
                case ("Порядок"):
                    shortName = "po";
                    break;
                case ("Власть"):
                    shortName = "vl";
                    break;
                case ("Бережливость"):
                    shortName = "be";
                    break;
                case ("Независимость"):
                    shortName = "ne";
                    break;
                case ("Статус"):
                    shortName = "st";
                    break;
                case ("Общение"):
                    shortName = "ob";
                    break;
                case ("Романтические отношения"):
                    shortName = "ro";
                    break;
                case ("Спокойствие"):
                    shortName = "sp";
                    break;
                case ("Честь"):
                    shortName = "ch";
                    break;
                case ("Идеализм"):
                    shortName = "id";
                    break;
                case ("Месть"):
                    shortName = "me";
                    break;
                case ("Еда"):
                    shortName = "ed";
                    break;
                case ("Физическая активность"):
                    shortName = "fi";
                    break;
                case ("Семья"):
                    shortName = "se";
                    break;

            }
            newObjUrl[shortName] = val / 100;

        })

        console.log(newObjUrl);

        let urlAnswersString = "";
        for (const name in newObjUrl) {
            urlAnswersString += name + newObjUrl[name];
        }
        console.log(urlAnswersString);

        let urlFullLink = "/result?res=" + urlAnswersString;
        return <Redirect to={urlFullLink} />
    }

    return (
        <>
            <div className={styles.Quest}>
                <div className={styles.QuestText} style={{display: "none1"}}>
                    <p className={styles.QuestNumber}>{currentQuestNum}/16 желание</p>
                    <h3  className={styles.QuestTitle}>{questInfo.title}</h3>
                    <p className={styles.QuestDescription}>{questInfo.description}</p>
                </div>

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

        </>

    )
}

export default Quest