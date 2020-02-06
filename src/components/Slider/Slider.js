import React, {useState, useEffect, useContext} from 'react'
import styles from "./Slider.scss";

import Quest from './../Quest/Quest'
import Button from './../Button/Button'

import json from "../../model/quests";

const Slider = () => {
    const [currentQuestNum, setCurrentQuestNum] = useState(1)
    const [questInfo, setQuestInfo] =  useState()

    const handleSliderControl = (direction) => {
        if(direction === "next") {
            setCurrentQuestNum(currentQuestNum+1)
        }
        if(direction === "prev") {
            setCurrentQuestNum(currentQuestNum-1)
        }
    }

    useEffect(()=> {
        console.log("Вопрос " + currentQuestNum);
        let quest = json[currentQuestNum - 1]
        console.log(quest);
        setQuestInfo(quest);

    }, [currentQuestNum, setCurrentQuestNum])

    // useEffect(()=> {
    //     console.log('questInfo', questInfo)
    //
    // }, [questInfo, setQuestInfo])

    return (
        <div className={styles.Slider}>
            <Quest questInfo={questInfo} currentQuestNum={currentQuestNum}/>

            <div className={styles.SliderControl}>
                <button
                    onClick={e => handleSliderControl('prev')}
                >
                    Назад
                </button>
                <button
                    onClick={e => handleSliderControl('next')}
                >
                    Далее
                </button>
                <Button text={'Далее'}/>
            </div>
        </div>
    )
}

Quest.defaultProps = {
    questInfo: {
        title: "",
        description: "",
        ldesc: "",
        rdesc: "",
        mdesc: ""
    },

};

export default Slider