import {
	ACTION_CHANGE_CURRENT_QUEST_ID,
	ACTION_CHANGE_QUEST_ANSWER
} from "../views/app"; // Action Creators - funcs, who return actions

const initialState = {
	id0: "здесь будет записан ответ на первый вопрос",
	id1: 50111,
	id2: 50222,
	id3: 5,
	id4: 5
};

export const answerReducer = (state = initialState, action) => {
	switch (action.type) {
		case "CHANGE_QUEST_ANSWER":
			//const { questAnswers, currentQuestIDinStore } = state;
			//let linkToCurrentQuestAnswer = questAnswers["id" + currentQuestIDinStore];
			//console.log(currentQuestIDinStore);
			console.log(state);
			return { ...state, id0: action.payload };
	}
	return state;
};
