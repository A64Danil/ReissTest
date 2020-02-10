import React, {useEffect, useState} from 'react'
import styles from "./Quest.scss";


import Transition from "react-transition-group/Transition";
import TransitionGroup from "react-transition-group/TransitionGroup";
import CSSTransition from "react-transition-group/CSSTransition";
import CSSTransitionGroup from "react-transition-group/CSSTransition";

const Quest = ({questInfo, currentQuestNum, transState}) => {

    // const [showQ, setShowQ] = useState(false);

    const [inMove, setInMove] = useState(true);


    const showQuest = () => {
        let newState = !inMove;
        setInMove(newState)
    }

    //
    // useEffect(()=> {
    //     console.log("Render Quest")
    //     console.log(showQ)
    //
    // })

    useEffect(()=> {
        console.log("reacted")
        // setInMove(true);
        // return setInMove(false)

    }, [currentQuestNum])

    // console.log(questInfo)

    const duration = 1300;

    const defaultStyle = {
        transition: `opacity ${duration}ms ease-in-out`,
        opacity: 0,
    }

    const transitionStyles = {
        entering: { opacity: 0.4 },
        entered:  { opacity: 1 },
        exiting:  { opacity: 0 },
        exited:  { opacity: 0 },
    };

    return (
        <>
            <button onClick={e => showQuest(e)}>toggle</button>
            <Transition in={inMove} timeout={duration} appear={true}>
                {state => (
                    <div style={{
                        ...defaultStyle,
                        ...transitionStyles[state]
                    }}>

                        <div className={styles.Quest}>
                            <h3>{state} Вопрос #{currentQuestNum} - {questInfo.title}</h3>
                            <p>{questInfo.description}</p>

                            <ul>
                                <li>1</li>
                                <li>2</li>
                                <li>3</li>
                                <li>4</li>
                            </ul>
                        </div>
                    </div>
                )}
            </Transition>
        </>

    )
}

export default Quest