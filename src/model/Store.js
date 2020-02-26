import React, {useState,useEffect} from "react";

import {types} from "mobx-state-tree"

export const StoreContext = React.createContext();

const QuestAnswer = types
    .model("QuestAnswer", {
        name: types.string,
        value: types.number
    })
    // .model("QuestAnswer", {
    //     [key: types.string]: types.string,
    //     value: types.number
    // })

// {
//     name: "Доброжелательность",
//     value: 3
// }
//
// {
//     "Доброжелательность": 3
// }

const QuestStore = types
    .model("QuestStore", {
        currentQuestNumber: types.number,
        answers: types.array(QuestAnswer)
    })
    .actions(self => ({
        addAnswer(quest){
            self.answers.push(quest)
        },
        nextQuest() {
            // console.log("Нажали следующий вопрос")
            self.currentQuestNumber = self.currentQuestNumber + 1;
        },
        prevQuest() {
            // console.log("Нажали предыдущий вопрос")
            self.currentQuestNumber = self.currentQuestNumber > 1 ? self.currentQuestNumber - 1 : 1;
        }
    }))
    // .views(self => {})



const StoreProvider = ({ children }) => {
    const store = QuestStore.create({
        currentQuestNumber: 1,
        answers: []
    })

    const answerStore = QuestAnswer.create({
        name: "Тестовый вариант",
        value: 3
    })

    console.log("store")
    console.log(store)
    // console.log("answ store")
    // console.log(answerStore)
    // console.log(store.currentQuestNumber)

    return (
        <StoreContext.Provider value={store}>
            {children}
        </StoreContext.Provider>
    )
}

export default StoreProvider