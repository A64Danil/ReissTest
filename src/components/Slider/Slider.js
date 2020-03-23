import React, {useState, useEffect, useContext} from 'react'
import styles from "./Slider.scss";

import Quest from './../Quest/Quest'


import Transition from "react-transition-group/Transition";

import json from "./../../model/quests";

import {StoreContext} from "./../../model/Store";
import {NavLink, Link} from "react-router-dom";

const questsTotal = json.length;

const Slider = ({history}) => {
    const [currentQuestNum, setCurrentQuestNum] = useState(1)
    const [questInfo, setQuestInfo] =  useState()
    const [parsedResults, setParsedResults] =  useState()

    const [inMove, setInMove] = useState(true);

    const [slideDirection, setSlideDirecrtion] = useState('next');

    // const [store, setStore] = useContext(StoreContext);
    const store = useContext(StoreContext)

    // 1. Страница рендерится со стейтом направления - next. Стейт меняет рисунок анимации
    // 2. Если inMove == true, рисуем анимацию входа. Иначе рисуем анимацию выхода
    // 3. При изменени вопроса, мы должны "пролистнуть" дальше.
    // 4. Если будет такакая цепочка изменений: currentQuestNum -> slideDir -> inMove -> questInfo, то не увидим анимацию выхода,
    // т.к. после смены CurQuestNum сразу произойдёт слайд. Выход - изменить порядок на slideDir -> inMove -> currentQuestNum -> questInfo
    // После клика на кнопку мы задаём направление, рисуем анимацию, ЗАПОМИНАЕМ текущий ответ, из меняем текущий номер вопроса, прокидываем новую инфу

    // useEffect(()=> {
    //     console.log("Render Slider2")
    //     console.log(store)
    // })

    const duration = 250;

    const defaultStyle = {
        height: `100%`,
        // height: `85%`,
        // maxHeight: `380px`,
        maxHeight: `calc(100% - 80px)`,
        // flexGrow: `1`,
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

    // STEP 1 - задаем направление и включаем анимацию выхода
    const handleSliderControl = (direction) => {
        // console.log('handleSliderControl, inMove = '+ inMove)

        if(direction === "prev" && store.currentQuestNumber === 1) {
            console.warn("Вопросов до первого не существует");
            history.push('/name');
            return
        }

        if(direction === "next" && store.currentQuestNumber === (questsTotal + 1) ) {
            console.warn("Вы ответили на все вопросы!")
            return
        }

        if (!inMove) {
            console.warn("You already animated")
            return
        } else {
            setSlideDirecrtion(direction)
            setInMove(false);
        }
    }

    // STEP 2 - записываем ответ и  изменяем текущий номер вопроса
    useEffect(()=> {
        // console.log('inMove изменился', inMove)
        if (inMove) return;
        // с задержкой, т.к. до перелистывания нужно анимировать выход и записать ответ
        console.log("Текущий ответ")
        setTimeout(() => {
            if(slideDirection === "next") {
                store.nextQuest()
                // setCurrentQuestNum(currentQuestNum+1)
            }
            if(slideDirection === "prev") {
                store.prevQuest()
                // setCurrentQuestNum(currentQuestNum-1)
            }
            setInMove(true);
        }, duration)


    }, [inMove])

    // STEP 3 - вносим новые данные в компонент Quest
    useEffect(()=> {
        console.log("Поменялся store.currentQuestNumber на ", store.currentQuestNumber)
        let quest = json[store.currentQuestNumber - 1]
        setQuestInfo(quest);

    }, [store.currentQuestNumber])


    return (
        <div className={styles.Slider}>

            <div className={styles.Slider__Container}>

                <Transition
                    in={inMove}
                    timeout={125}
                    appear={true}>
                    {state => (
                        <div style={{
                            ...defaultStyle,
                            ...transitionStyles[slideDirection][state]
                        }}>
                            <Quest questInfo={questInfo} currentQuestNum={store.currentQuestNumber} questsTotal={questsTotal}/>
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

                    {/*<Link to='/result?res=lu1d2s5ch2df34nbd3f435fd4'  className={`${styles.SliderBtn}  ${styles.SliderBtnNxt}`}>*/}
                    {/*    Результат &#62;*/}
                    {/*</Link>*/}

                    {store.currentQuestNumber === questsTotal && (

                        <button
                        className={`${styles.SliderBtn}  ${styles.SliderBtnNxt}`}
                        onClick={e => handleSliderControl('next')}
                        >
                            Результат &#62;
                        </button>
                    )}
                    {store.currentQuestNumber !== questsTotal && (
                        <button
                            className={`${styles.SliderBtn}  ${styles.SliderBtnNxt}`}
                            onClick={e => handleSliderControl('next')}
                        >
                            Далее &#62;
                        </button>
                    )}




                </div>

            </div>
        </div>
    )
};

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