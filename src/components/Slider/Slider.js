import React, {useState, useEffect, useContext} from 'react'
import styles from "./Slider.scss";

import Quest from './../Quest/Quest'
import Button from './../Button/Button'


import Transition from "react-transition-group/Transition";
import TransitionGroup from "react-transition-group/TransitionGroup";
import CSSTransition from "react-transition-group/CSSTransition";
import CSSTransitionGroup from "react-transition-group/CSSTransition";

import json from "./../../model/quests";

import {StoreContext} from "./../../model/Store";

const Slider = () => {
    const [currentQuestNum, setCurrentQuestNum] = useState(1)
    const [questInfo, setQuestInfo] =  useState()

    const [inMove, setInMove] = useState(true);

    const [slideDirection, setSlideDirecrtion] = useState('next');

    // const [store, setStore] = useContext(StoreContext);
    const store = useContext(StoreContext)


    useEffect(()=> {
        console.log("Render Slider2")
        console.log(store)
    })

    const duration = 250;

    const defaultStyle = {
        flexGrow: `1`,
        transition: `all 250ms ease-in-out`,
        transform: `translate(0%, 0)`
    }

    const transitionStyles = {
        next: {
            entering: { transform: `translate(100%, 0)`, opacity: 0 },
            entered:  { transform: `translate(0%, 0)`, opacity: 1 },
            exiting:  { transform: `translate(-100%, 0)`, opacity: 0 },
            exited:  { transform: `translate(-0%, 0)`, opacity: 0  },
        },
        prev: {
            entering: { transform: `translate(-100%, 0)`, opacity: 0 },
            entered:  { transform: `translate(0%, 0)`, opacity: 1 },
            exiting:  { transform: `translate(100%, 0)`, opacity: 0 },
            exited:  { transform: `translate(0%, 0)`, opacity: 0  },
        }
    };


    const handleSliderControl = (direction) => {
        setSlideDirecrtion(direction)
        setInMove(false);
    }



    useEffect(()=> {
        console.log("Вопрос " + currentQuestNum);
        console.log("store.currentQuestNumber", store.currentQuestNumber)
        let quest = json[currentQuestNum - 1]
        // console.log(quest);
        setQuestInfo(quest);

    }, [currentQuestNum, setCurrentQuestNum])


    useEffect(()=> {
        console.log('inMove', inMove)
        if (inMove) return;
        setTimeout(() => {
            if(slideDirection === "next") {
                store.nextQuest()
                setCurrentQuestNum(currentQuestNum+1)
            }
            if(slideDirection === "prev") {
                store.prevQuest()
                setCurrentQuestNum(currentQuestNum-1)
            }
        }, duration)


    }, [inMove])

    useEffect(() => {
        if (inMove) return;
        setInMove(true);
    }, [currentQuestNum]);


    return (
        <div className={styles.Slider}>

            <Transition
                in={inMove}
                timeout={125}
                appear={true}>
                {state => (
                    <div style={{
                        ...defaultStyle,
                        ...transitionStyles[slideDirection][state]
                    }}>
                        <Quest questInfo={questInfo} currentQuestNum={currentQuestNum}/>
                    </div>
                )}
            </Transition>

            <div className={styles.SliderControl}>
                <button
                    className={styles.SliderBtn}
                    onClick={e => handleSliderControl('prev')}
                >
                    &#60;
                </button>
                <button
                    className={`${styles.SliderBtn}  ${styles.SliderBtnNxt}`}
                    onClick={e => handleSliderControl('next')}
                >
                    Далее &#62;
                </button>
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