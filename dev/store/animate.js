import { ACTION_CHANGE_SHOW_QUEST } from "../views/app"; // Action Creators - funcs, who return actions

const initialState = {
	showCurrentQuest: true
};

export const animateReducer = (state = initialState, action) => {
	switch (action.type) {
		case "CHANGE_SHOW_QUEST":
			return { ...state, showCurrentQuest: action.payload };
	}
	return state;
};
