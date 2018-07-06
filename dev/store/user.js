import {
	ACTION_CHANGE_CURRENT_QUEST_ID,
	ACTION_CHANGE_QUEST_ANSWER
} from "../views/app"; // Action Creators - funcs, who return actions

const initialState = {
	currentQuestIDinStore: 0,
	testQuestAnswers: 0,
	testState: "initial State"
};

export const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case "CHANGE_CURRENT_QUEST_ID":
			return { ...state, currentQuestIDinStore: action.payload };
	}
	return state;
};
