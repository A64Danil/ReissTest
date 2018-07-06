import { routerReducer } from "react-router-redux";
import {
	ACTION_CHANGE_CURRENT_QUEST_ID,
	ACTION_CHANGE_QUEST_ANSWER
} from "../views/app"; // Action Creators - funcs, who return actions

//const routing = routerReducer;

export const initialState = {
	currentQuestIDinStore: 0,
	testQuestAnswers: 0,
	testState: "initial State"
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case "CHANGE_CURRENT_QUEST_ID":
			return { ...state, currentQuestIDinStore: action.payload };
		case "CHANGE_QUEST_ANSWER":
			const { questAnswers, currentQuestIDinStore } = state;
			let linkToCurrentQuestAnswer = questAnswers["id" + currentQuestIDinStore];
			console.log(currentQuestIDinStore);
			console.log(linkToCurrentQuestAnswer);
			return { ...state, questAnswers: action.payload };
	}
	return state;
};
