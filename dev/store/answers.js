import {
	ACTION_CHANGE_CURRENT_QUEST_ID,
	ACTION_CHANGE_QUEST_ANSWER
} from "../views/app"; // Action Creators - funcs, who return actions

const initialState = {
	id0: 2,
	id1: 2,
	id2: 2,
	id3: 2,
	id4: 2
};

export const answerReducer = (state = initialState, action) => {
	switch (action.type) {
		case "CHANGE_QUEST_ANSWER":
			return { ...state, [action.payloadID]: parseInt(action.payload) };
	}
	return state;
};
