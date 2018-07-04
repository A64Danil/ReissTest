import {
	ACTION_CHANGE_CURRENT_QUEST_ID,
	ACTION_CHANGE_QUEST_ANSWER
} from "../views/app"; // Action Creators - funcs, who return actions

export const changeCurrentQuestID = newQuestID => {
	return {
		type: ACTION_CHANGE_CURRENT_QUEST_ID,
		payload: newQuestID
	};
};

export const changeQuestAnswer = newQuestAnswer => {
	return {
		type: ACTION_CHANGE_QUEST_ANSWER,
		payload: newQuestAnswer
	};
};
