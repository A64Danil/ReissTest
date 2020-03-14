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
        // currentQuestNumber: 14, // тестовый вариант
        answers: {
            "Одобрение": 300, // od
            "Любопытство": 300, // lu
            "Порядок": 300, // po
            "Власть": 300, // vl
            "Бережливость": 300, // be
            "Независимость": 300, //ne
            "Статус": 300, // st
            "Общение": 300, // ob
            "Романтические отношения": 300, //ro
            "Спокойствие": 300, // sp
            "Честь": 300, //ch
            "Идеализм": 300, // id
            "Месть": 300, // me
            "Еда": 300, // ed
            "Физическая активность": 300, // fi
            "Семья": 300 // se
        }
    })
    //"od", "lu", "po", "vl", "be", "ne", "st", "ob", "ro", "sp", "ch", "id", "me", "ed", "fi", "se",
    // console.log("store")
    // console.log(store)

    return (
        <StoreContext.Provider value={store}>
            {children}
        </StoreContext.Provider>
    )
}

export default StoreProvider