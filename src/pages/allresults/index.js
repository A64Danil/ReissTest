import React, {useContext, useEffect, useState} from 'react'

import styles from "../../global.scss";

import {StoreContext} from "../../model/Store.js";

import json from "./../../model/quests";

import {db} from "../../firebase";

const AllResults = ({props}) => {
    const store = useContext(StoreContext)
    const [AllResultsArr, setAllResultsArr] = useState([]);
    const [isDbLoaded, setIsDbLoaded] = useState(false);

    const [fireBaseData, setFireBaseData] = useState([]);
    // const fireBaseData = []

    useEffect(()=> {
        console.log("Start AllResult useEffect");
        let tempArr = []
        db.collection("test").get().then(function(querySnapshot) {
            console.log(querySnapshot)
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                // setAllResultsArr(AllResultsArr => [...AllResultsArr, doc.data()]);
                // fireBaseData.push( doc.data());
                tempArr.push( doc.data());
            });

            // console.log(AllResultsArr);
        }).then(()=>{
            console.log("здесь будем триггерить хук");
            console.log(fireBaseData);
            setIsDbLoaded(true);
            setFireBaseData(tempArr);
            // fireBaseData.map((record) => (
            //     console.log(record)
            // ))
        });


    }, [])

    useEffect(()=> {
        console.log("fireBaseData useEffect");
        console.log(fireBaseData);

    }, [fireBaseData, setFireBaseData])



    return (
        <div className={styles.resultPage}>
            <h1>Все результаты:</h1>

            {isDbLoaded && (
                <div>
                    <p>Всё загрузилось!</p>
                    <b>Всего результатов: {fireBaseData.length}</b>
                    <ul>
                    {fireBaseData.map((record) => (
                        <li key={record.name}>
                            <p key={record.name + "_descr"} >Имя: {record.name}</p>

                            <ul>
                                {Object.keys(record.answers).map((key, index) => (
                                    <li key={record.name + key}>
                                        {index+1}) {key} => {record.answers[key]}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                    </ul>
                </div>
            )}


            <h3>Варианта 2</h3>
            {isDbLoaded ? (
                <div>Loading ...</div>
            ) : (
                <p>Loadded!</p>
            )}


            {/*<ul className={styles.resultList}>*/}
            {/*{ AllResultsArr.map( (obj) => (*/}
            {/*    <li key={obj.name}>*/}
            {/*        <p key={obj.name + "_descr"} className={styles.resultTitle}>{obj.name}</p>*/}
            {/*        <div key={obj.name + "_val"}  className={`${styles.resultBar}  ${styles["resultBar--" + obj.valueNum]}`} ></div>*/}
            {/*    </li>*/}
            {/*))}*/}
            {/*</ul>*/}

        </div>
    )
}

export default AllResults;