import React, {useState,useEffect} from "react";

import {types} from "mobx-state-tree"

export const StoreContext = React.createContext();

const QuestStore = types
    .model("QuestStore", {
        currentQuestNumber: types.number,
        answers: types.map(types.number),
        isChosenAnswers: types.map(types.boolean)
    })
    .actions(self => ({
        addAnswer(quest) {
            self.answers.set(quest.title, quest.value)
        },
        setIsChosenAnswer(title, value) {
            self.isChosenAnswers.set(title, value)
        },
        setUsername(name) {
            self.userName = name;
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
        userName: "",
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
        },
        isChosenAnswers: {
            "Одобрение": false, // od
            "Любопытство": false, // lu
            "Порядок": false, // po
            "Власть": false, // vl
            "Бережливость": false, // be
            "Независимость": false, //ne
            "Статус": false, // st
            "Общение": false, // ob
            "Романтические отношения": false, //ro
            "Спокойствие": false, // sp
            "Честь": false, //ch
            "Идеализм": false, // id
            "Соревновательность": false, // so
            "Еда": false, // ed
            "Физическая активность": false, // fi
            "Семья": false // se
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