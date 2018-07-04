import { routerReducer } from "react-router-redux";
import {
	ACTION_CHANGE_CURRENT_QUEST_ID,
	ACTION_CHANGE_QUEST_ANSWER
} from "../views/app"; // Action Creators - funcs, who return actions

export const initialState = {
	currentQuestIDinStore: 0,
	questAnswers: {
		id1: 5,
		id2: 5,
		id3: 5,
		id4: 5,
		id5: 5
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
			return { ...state, testQuestAnswers: action.payload };
	}
	return state;
};
