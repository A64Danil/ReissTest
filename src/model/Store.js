import React, {useState,useEffect} from "react";

import {types} from "mobx-state-tree"

export const StoreContext = React.createContext();

const QuestStore = types
    .model("QuestStore", {
        currentQuestNumber: types.number,
        isResultSent: types.boolean,
        answers: types.map(types.number),
        isChosenAnswers: types.map(types.boolean)
    })
    .actions(self => ({
        addAnswer(quest) {
            self.answers.set(quest.keyTitle, quest.value)
        },
        setIsChosenAnswer(keyTitle, value) {
            self.isChosenAnswers.set(keyTitle, value)
        },
        setUsername(name) {
            self.userName = name;
        },
        setUsername2(name) {
            self.userName2 = name;
        },
        setIsResultSent(boolean) {
            self.isResultSent = boolean;
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
        userName2: "",
        currentQuestNumber: 1,
        // currentQuestNumber: 15, // тестовый вариант
        isResultSent: false,
        answers: {
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