import * as Actions from "./landing.constants";
import {initialState} from "./landing.state.js"
import { isImmutable, fromJS} from "immutable";
import { REHYDRATE } from "redux-persist/lib/constants";
import rehydrate from "../../reducerHelper.js";
export default function landing(state=initialState, action) {
    state = isImmutable(state) ? state : fromJS(state);
    switch(action.type) {
        case Actions.TRIGGER_EXAMPLE_REDUCER: {
            return state.set("called", true)
        }
        case Actions.HANDLE_LOGIN:{
            return state.set("isLoggedIn",action.payload)
        }
        case REHYDRATE:{
            return rehydrate(state, action, "landing")
            // return state.mergeDeep(fromJS(state["landing"]))
        }
        default:{
            return state;
        }
    }
}