import {
	ACTION_CHANGE_CURRENT_QUEST_ID,
	ACTION_CHANGE_QUEST_ANSWER,
	ACTION_CHANGE_SHOW_QUEST
} from "../views/app"; // Action Creators - funcs, who return actions

export const changeCurrentQuestID = newQuestID => {
	return {
		type: ACTION_CHANGE_CURRENT_QUEST_ID,
		payload: newQuestID
	};
};

export const changeQuestAnswer = (newQuestAnswer, questID) => {
	return {
		type: ACTION_CHANGE_QUEST_ANSWER,
		payload: newQuestAnswer,
		payloadID: questID
	};
};

export const changeShowQuest = show => {
	return {
		type: ACTION_CHANGE_SHOW_QUEST,
		payload: show
	};
};
