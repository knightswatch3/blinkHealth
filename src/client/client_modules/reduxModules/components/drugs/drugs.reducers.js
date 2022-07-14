import * as Actions from "./drugs.constants.js";
import {initialState} from "./drugs.state.js"
import { isImmutable, fromJS} from "immutable";
import { REHYDRATE } from "redux-persist/lib/constants";
import rehydrate from "../../reducerHelper.js";

const _ = {
    isEmpty: require('lodash/isEmpty'),
    forEach: require('lodash/forEach'),
    concat: require('lodash/concat'),
}

export default function drugs(state=initialState, action) {

    state = isImmutable(state) ? state : fromJS(state);
    switch(action.type) {
        // case Actions.SEARCH_BY_KEY: {
        //     let suggestions = fromJS(action.payload) || fromJS([])
        //     return state.set("searchByKeyRes", suggestions);
        // }
        case Actions.SEARCH_BY_DRUG_NAME: {
            let drugInformation = action.payload
            let res=[]
            if(!_.isEmpty(action.payload)){
                let parsedDrugInformation = JSON.parse(drugInformation)['drugGroup']

                _.forEach(parsedDrugInformation["conceptGroup"], conceptGroup =>{
                    if(conceptGroup['conceptProperties']){
                        res = _.concat(res,...conceptGroup['conceptProperties'])
                    }
                })
                res=fromJS(res)
                return state.set("searchResultsByDrugName", res);
            }
            return state.set("searchResultsByDrugName", fromJS([]));
        } 
        case Actions.GET_RXID_DETAILS: {
            let rxIdNdcs = fromJS(JSON.parse(action.payload))
            return state.set("rxIdResults", rxIdNdcs);
        }
        case Actions.SEARCH_BY_DRUG_NAME_INPROGRESS:{
            return state.set("searchProgress", action.payload)
        }
        case Actions.SEARCH_BY_DRUG_NAME_SUCCEEDED:{
            return state.set("searchStatus", action.payload)
        }
        case Actions.GET_RXID_DETAILS_INPROGRESS:{
            return state.set("rxIdProgress", action.payload)
        }
        case Actions.GET_RXID_DETAILS_SUCCEEDED:{
            return state.set("rxIdStatus", action.payload)
        }
        case REHYDRATE:{
            return rehydrate(state, action, "drugs")
        }
        default:{
            return state;
        }
    }
}