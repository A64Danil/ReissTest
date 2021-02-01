import React from "react";
import cookie from "react-cookies";

import {types} from "mobx-state-tree"

const saveFastCookie = (cookieName, cookieValue) => {
    const expires = new Date();
    expires.setDate(14);
    cookie.save(
        cookieName,
        cookieValue,
        {
            path: "/",
            expires,
            maxAge: 172800,
            domain: "",
            secure: false,
            httpOnly: false
        }
    );
};

const initialState = {
    userName: '',
    userName2: '',
    currentQuestNumber:  1,
    isResultSent: false,
    resultUrl: '',
    answers: {
        "Acceptance": 500,
        "Curiosity": 500,
        "Order": 500,
        "Power": 500,
        "Saving": 500,
        "Independence": 500,
        "Status": 500,
        "SocialContact": 500,
        "Romance": 500,
        "Tranquility": 500,
        "Honor": 500,
        "Idealism": 500,
        "Vengeance": 500,
        "Eating": 500,
        "PhysicalActivity": 500,
        "Family": 500
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

}

// 1) Есть "начальный" стейт
// 2) Есть стейт из куки
// 3) При входе на сайт, ТЕКУЩИЙ стейт обновляется стейтом из куки (заменяется/дополняется)
// 4) При нажатии кнопки "снова" - затереть куки, ТЕКУЩИЙ стейт сделать НАЧАЛЬНЫМ
// (начальный стейт, текущий стейт, куки)


export const StoreContext = React.createContext();

const QuestStore = types
    .model("QuestStore", {
        userName: types.string,
        userName2: types.string,
        currentQuestNumber: types.number,
        isResultSent: types.boolean,
        resultUrl: types.string,
        answers: types.map(types.number),
        isChosenAnswers: types.map(types.boolean)
    })
    .actions(self => ({
        addAnswer(quest) {
            self.answers.set(quest.keyTitle, quest.value);
            const newAnswers = cookie.load('answers') || {};
            newAnswers[quest.keyTitle] = quest.value;
            saveFastCookie('answers', newAnswers);
        },
        setIsChosenAnswer(keyTitle, value) {
            self.isChosenAnswers.set(keyTitle, value);
            const newIsChosenAnswers = cookie.load('isChosenAnswers') || {};
            newIsChosenAnswers[keyTitle] = value;
            saveFastCookie('isChosenAnswers', newIsChosenAnswers);
        },
        setUsername(name) {
            self.userName = name;
            saveFastCookie('userName', name);
        },
        setUsername2(name) {
            self.userName2 = name;
        },
        setIsResultSent(boolean) {
            self.isResultSent = boolean;
        },
        setResultUrl(url) {
            self.resultUrl = url;
        },
        nextQuest() {
            self.currentQuestNumber = self.currentQuestNumber + 1;
            saveFastCookie('currentQuestNumber', self.currentQuestNumber);
        },
        prevQuest() {
            self.currentQuestNumber = self.currentQuestNumber > 1 ? self.currentQuestNumber - 1 : 1;
            saveFastCookie('currentQuestNumber', self.currentQuestNumber);
        },
        resetState() {
            Object.keys(initialState).forEach(keyName => {
                cookie.remove(keyName, { path: '/' })
            });
            self.answers = initialState.answers;
            self.currentQuestNumber = initialState.currentQuestNumber;
            self.isChosenAnswers = initialState.isChosenAnswers;
            self.isResultSent = initialState.isResultSent;
            self.userName = initialState.userName;
        }
    }))
    // .views(self => {})



const StoreProvider = ({ children }) => {
    const store = QuestStore.create({
        userName: cookie.load("userName") || '',
        userName2: '',
        currentQuestNumber:  parseInt(cookie.load("currentQuestNumber")) || 1,
        // currentQuestNumber: parseInt(cookie.load("currentQuestNumber")) || 15, // тестовый вариант
        isResultSent: false,
        resultUrl: '',
        answers: Object.assign({
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
        }, cookie.load('answers')),
        isChosenAnswers: Object.assign({
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
        }, cookie.load('isChosenAnswers'))
        
    });

    return (
        <StoreContext.Provider value={store}>
            {children}
        </StoreContext.Provider>
    )
}

export default StoreProvider