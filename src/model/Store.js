import React, {useState,useEffect} from "react";

import {types} from "mobx-state-tree"

export const StoreContext = React.createContext();

const QuestStore = types
    .model("QuestStore", {
        currentQuestNumber: types.number,
        answers: types.map(types.number)
    })
    .actions(self => ({
        addAnswer(quest) {
            self.answers.set(quest.title, quest.value)
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
        answers: {
            "Одобрение": 300,
            "Любопытство": 300,
            "Порядок": 300,
            "Власть": 300,
            "Бережливость": 300,
            "Независимость": 300,
            "Статус": 300,
            "Общение": 300,
            "Романтические отношения": 300,
            "Спокойствие": 300,
            "Честь": 300,
            "Идеализм": 300,
            "Месть": 300,
            "Еда": 300,
            "Физическая активность": 300,
            "Семья": 300
        }
    })

    // console.log("store")
    // console.log(store)

    return (
        <StoreContext.Provider value={store}>
            {children}
        </StoreContext.Provider>
    )
}

export default StoreProvider