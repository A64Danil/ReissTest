import { routerReducer } from "react-router-redux";
import { ACTION_CHANGE_CURRENT_QUEST_ID } from "../views/app"; // Action Creators - funcs, who return actions

export const initialState = {
	currentQuestIDinStore: 0,
	testState: "initial State"
};

const routing = routerReducer;

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case "CHANGE_CURRENT_QUEST_ID":
			return { ...state, currentQuestIDinStore: action.payload };
	}
	return state;
};
