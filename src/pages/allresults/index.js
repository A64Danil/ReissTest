import React, {useContext, useEffect, useState} from 'react'

import styles from "../../global.scss";

import {StoreContext} from "../../model/Store.js";

import json from "./../../model/quests";

import {db} from "../../firebase";

const AllResults = ({props}) => {
    const store = useContext(StoreContext)
    const [isDbLoaded, setIsDbLoaded] = useState(false);

    const [fireBaseData, setFireBaseData] = useState([]);

    useEffect(()=> {
        console.log("Start AllResult useEffect");
        let tempArr = []
        db.collection("test").orderBy("timeStamp").get().then(function(querySnapshot) {
            console.log(querySnapshot)
            querySnapshot.forEach(function(doc) {
                let origData = doc.data();
                let newData = {
                    name: origData.name,
                    answers: []
                }
                let tempAnswers = {};

                // Настраиваем перевод
                for (const keyName in origData.answers) {
                    json.forEach((quest)=> {
                        if(quest.keyTitle == keyName) {
                            tempAnswers[quest.title] = origData.answers[keyName];

                        }

                    })
                }
                newData.answers = tempAnswers;
                tempArr.push( newData);
            });

            // console.log(AllResultsArr);
        }).then(()=>{
            console.log("здесь будем триггерить хук");
            console.log(fireBaseData);
            setIsDbLoaded(true);
            setFireBaseData(tempArr);
        });


    }, [])

    useEffect(()=> {
        console.log("fireBaseData useEffect");
        console.log(fireBaseData);

    }, [fireBaseData, setFireBaseData])



    return (
        <div className={styles.allResultsPage}>
            <h1>Все результаты:</h1>

            {isDbLoaded ? (
                <div>
                    <p>Всё загрузилось!</p>
                    <b>Всего результатов: {fireBaseData.length}</b>
                        <div  className={styles.allResultsListWrp}>
                            {fireBaseData.map((record) => (
                                <details className={styles.details} key={record.name}>
                                    <summary>
                                        <b key={record.name + "_descr"} >{record.name}</b>
                                    </summary>

                                    <ul>
                                        {Object.keys(record.answers).map((key, index) => (
                                            <li key={record.name + key}>
                                                {index+1}) {key} => {record.answers[key]}
                                            </li>
                                        ))}
                                    </ul>
                                </details>
                            ))}
                        </div>
                </div>
            ) : (
                <p>Идёт загрузка результатов...</p>
            )}



        </div>
    )
}

export default AllResults;