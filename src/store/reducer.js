import { CHANGE_USERINFO, CHANGE_USER_ID, CLEAR_USERINFO,CHANGE_TOKEN } from "./actionTypes";

import LocalCache from '@/utils/cache'

const defaultState = {
	user_id: null,
	userInfo: null,
	token:null
};

export default (state = defaultState, action) => {
	let newState=Object.assign({},state)
	switch (action.type) {
		case CHANGE_USERINFO:
			newState.userInfo = action.userInfo;
			break;
		case CHANGE_USER_ID:
			newState.user_id = action.id;
			break;
		case CLEAR_USERINFO:
			newState.user_id = null;
			newState.userInfo =null;
			break;
		case CHANGE_TOKEN:
			newState.token=action.token
		default:
			return
	}
	return {...state,...newState}
};

