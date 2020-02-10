import React, {useState, useEffect, useContext} from 'react'
import styles from "./Slider.scss";

import Quest from './../Quest/Quest'
import Button from './../Button/Button'


import Transition from "react-transition-group/Transition";
import TransitionGroup from "react-transition-group/TransitionGroup";
import CSSTransition from "react-transition-group/CSSTransition";
import CSSTransitionGroup from "react-transition-group/CSSTransition";

import json from "../../model/quests";

const Slider = () => {
    const [currentQuestNum, setCurrentQuestNum] = useState(1)
    const [questInfo, setQuestInfo] =  useState()

    const [inMove, setInMove] = useState(true);


    const showQuest = () => {
        let newState = !inMove;
        setInMove(newState)
    }



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
        // console.log(quest);
        setQuestInfo(quest);

    }, [currentQuestNum, setCurrentQuestNum])


    // useEffect(()=> {
    //     console.log('questInfo', questInfo)
    //
    // }, [questInfo, setQuestInfo])


    const duration = 1300;

    const defaultStyle = {
        transition: `all ${duration}ms ease-in-out`,
        opacity: 0.4,
    }

    const transitionStyles = {
        entering: { opacity: 0.4 },
        entered:  { opacity: 1 },
        exiting:  { opacity: 0.4 },
        exited:  { background: "red" },
    };

    return (
        <div className={styles.Slider}>


            <button onClick={e => showQuest(e)}>toggle</button>
            <Transition in={inMove} timeout={duration} appear={true}>
                {state => (
                    <div style={{
                        ...defaultStyle,
                        ...transitionStyles[state]
                    }}>
                        <h3>{state} </h3>
                        <Quest questInfo={questInfo} currentQuestNum={currentQuestNum}/>
                    </div>
                )}
            </Transition>




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
    test: ""

};

export default Slider