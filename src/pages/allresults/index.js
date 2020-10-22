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
        db.collection("testArr").orderBy('timeStamp', 'desc').get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                let origData = doc.data();
                let newData = {
                    name: origData.name,
                    timeStamp: origData.timeStamp,
                    date: new Date(origData.timeStamp.seconds * 1000).toLocaleDateString(),
                    answers: []
                }
                let tempAnswers = {};

                // Настраиваем перевод
                origData.answers.forEach((answer) => {
                    json.forEach((quest)=> {
                        if(quest.keyTitle == answer.keyName) {
                            tempAnswers[quest.title] = answer.value;
                        }

                    })
                });
                newData.answers = tempAnswers;
                tempArr.push( newData);
            });

        }).then(()=>{
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
                                <details className={styles.details} key={record.timeStamp}>
                                    <summary>
                                        <b key={record.timeStamp} >{record.name} </b><sub>({record.date})</sub>
                                    </summary>

                                    <ul>
                                        {Object.keys(record.answers).map((key, index) => (
                                            <li key={record.timeStamp + key}>
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