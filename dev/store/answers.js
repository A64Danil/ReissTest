import cookie from "react-cookies";
import {
	ACTION_CHANGE_CURRENT_QUEST_ID,
	ACTION_CHANGE_QUEST_ANSWER
} from "../views/app"; // Action Creators - funcs, who return actions

const userCookie = cookie.loadAll();
var initialState;
if (userCookie.userAnswers) {
	var stateFromCookie = JSON.parse(userCookie.userAnswers);
	console.log(stateFromCookie);
	initialState = stateFromCookie;
} else {
	console.log("куки не существуют");
	initialState = {
		id0: 2,
		id1: 2,
		id2: 2,
		id3: 2,
		id4: 2
	};
}

export const answerReducer = (state = initialState, action) => {
	switch (action.type) {
		case "CHANGE_QUEST_ANSWER":
			const expires = new Date();
			expires.setDate(100000 + 14);
			cookie.save(
				"userAnswers",
				JSON.stringify({
					...state,
					[action.payloadID]: parseInt(action.payload)
				}),
				{
					path: "/",
					expires,
					maxAge: 1000,
					domain: "",
					secure: false,
					httpOnly: false
				}
			);
			console.log(userCookie);
			return { ...state, [action.payloadID]: parseInt(action.payload) };
	}
	return state;
};
