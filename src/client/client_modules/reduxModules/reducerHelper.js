

import { fromJS } from "immutable";

export default function rehydrate(state,action,reduxComponentName){
	if(action.payload==undefined){
		return state
	}
	let { sessionStore, localStore } = action.payload;
	 
	if (localStore) {
		if (localStore[reduxComponentName]) {
			state = state.mergeDeep(fromJS(localStore[reduxComponentName]));
		}
	}
	if (sessionStore) {
		if (sessionStore[reduxComponentName]) {
			state = state.mergeDeep(fromJS(sessionStore[reduxComponentName]));
		}
	}
	return state;
}
