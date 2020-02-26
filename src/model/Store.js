import React, {useState,useEffect} from "react";

import {types} from "mobx-state-tree"

export const StoreContext = React.createContext();

const QuestAnswer = types
    .model("QuestAnswer", {
        title: types.string,
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
            let searchQuest = self.answers.find(qu => quest.title === qu.title);
            if (typeof searchQuest == "undefined") {
                console.log("не нашли")
                self.answers.push(quest)
            } else {
                console.log("нашли")
                searchQuest.value = quest.value;
                console.log(searchQuest)
            }
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


    console.log("store")
    console.log(store)

    return (
        <StoreContext.Provider value={store}>
            {children}
        </StoreContext.Provider>
    )
}

export default StoreProvider