import { routerReducer } from "react-router-redux";
import {
	ACTION_CHANGE_CURRENT_QUEST_ID,
	ACTION_CHANGE_QUEST_ANSWER
} from "../views/app"; // Action Creators - funcs, who return actions

export const initialState = {
	currentQuestIDinStore: 0,
	questAnswers: {
		id0: "здесь будет записан ответ на первый вопрос",
		id1: 50111,
		id2: 50222,
		id3: 5,
		id4: 5
	},
	testQuestAnswers: 0,
	testState: "initial State"
};

const routing = routerReducer;

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case "CHANGE_CURRENT_QUEST_ID":
			return { ...state, currentQuestIDinStore: action.payload };
		case "CHANGE_QUEST_ANSWER":
			const { questAnswers, currentQuestIDinStore } = state;
			let linkToCurrentQuestAnswer = questAnswers["id" + currentQuestIDinStore];
			console.log(currentQuestIDinStore);
			console.log(linkToCurrentQuestAnswer);
			return { ...state, (questAnswers.id0): action.payload };
	}
	return state;
};
