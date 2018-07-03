import { ACTION_CHANGE_CURRENT_QUEST_ID } from "../views/app"; // Action Creators - funcs, who return actions

export const changeCurrentQuestID = newQuestID => {
	return {
		type: ACTION_CHANGE_CURRENT_QUEST_ID,
		payload: newQuestID
	};
};
