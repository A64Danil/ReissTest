import React, {useState,useEffect} from "react";

import {types} from "mobx-state-tree"

export const StoreContext = React.createContext();

const QuestStore = types
    .model("QuestStore", {
        currentQuestNumber: types.number,
        answers: types.map(types.number),
        answersNew: types.map(types.number),
        isChosenAnswers: types.map(types.boolean),
        isChosenAnswersNew: types.map(types.boolean)
    })
    .actions(self => ({
        addAnswer(quest) {
            self.answersNew.set(quest.keyTitle, quest.value)
        },
        setIsChosenAnswer(keyTitle, value) {
            self.isChosenAnswersNew.set(keyTitle, value)
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
        // currentQuestNumber: 1,
        currentQuestNumber: 15, // тестовый вариант
        answers: {
            "Одобрение": 500, // od - acc - Acceptance
            "Любопытство": 500, // lu - cur - Curiosity
            "Порядок": 500, // po - ord - Order
            "Власть": 500, // vl - pow - Power
            "Бережливость": 500, // be - sav - Saving
            "Независимость": 500, //ne - ind - Independence
            "Статус": 500, // st - sta - Status
            "Общение": 500, // ob - soc - SocialContact
            "Романтические отношения": 500, //ro - rom - Romance
            "Спокойствие": 500, // sp - tra - Tranquility
            "Честь": 500, //ch - hon - Honor
            "Идеализм": 500, // id - ide - Idealism
            "Соревновательность": 500, // so - ven - Vengeance
            "Еда": 500, // ed - eat - Eating
            "Физическая активность": 500, // fi - phy - PhysicalActivity
            "Семья": 500 // se - fam - Family
        },
        answersNew: {
            "Acceptance": 500, // od - acc - Acceptance
            "Curiosity": 500, // lu - cur - Curiosity
            "Order": 500, // po - ord - Order
            "Power": 500, // vl - pow - Power
            "Saving": 500, // be - sav - Saving
            "Independence": 500, //ne - ind - Independence
            "Status": 500, // st - sta - Status
            "SocialContact": 500, // ob - soc - SocialContact
            "Romance": 500, //ro - rom - Romance
            "Tranquility": 500, // sp - tra - Tranquility
            "Honor": 500, //ch - hon - Honor
            "Idealism": 500, // id - ide - Idealism
            "Vengeance": 500, // so - ven - Vengeance
            "Eating": 500, // ed - eat - Eating
            "PhysicalActivity": 500, // fi - phy - PhysicalActivity
            "Family": 500 // se - fam - Family
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
        },
        isChosenAnswersNew: {
            "Acceptance": false,
            "Curiosity": false,
            "Order": false,
            "Power": false,
            "Saving": false,
            "Independence": false,
            "Status": false,
            "SocialContact": false,
            "Romance": false,
            "Tranquility": false,
            "Honor": false,
            "Idealism": false,
            "Vengeance": false,
            "Eating": false,
            "PhysicalActivity": false,
            "Family": false
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