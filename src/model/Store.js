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
            "Одобрение": 500, // od
            "Любопытство": 500, // lu
            "Порядок": 500, // po
            "Власть": 500, // vl
            "Бережливость": 500, // be
            "Независимость": 500, //ne
            "Статус": 500, // st
            "Общение": 500, // ob
            "Романтические отношения": 500, //ro
            "Спокойствие": 500, // sp
            "Честь": 500, //ch
            "Идеализм": 500, // id
            "Соревновательность": 500, // so
            "Еда": 500, // ed
            "Физическая активность": 500, // fi
            "Семья": 500 // se
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