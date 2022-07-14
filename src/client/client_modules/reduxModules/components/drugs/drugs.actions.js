import * as Actions from "./drugs.constants.js";
import * as apis from "./drugs.apis.js";
const _ = {
    isEqual: require("lodash/isEqual"),
    isEmpty: require("lodash/isEmpty"),
}

// "suggestionGroup": {
//     "name": null,
//     "suggestionList": {
//       "suggestion": [
//         "advil"
//       ]
//     }
//   }
// }

export default {
    handleSearchByKey: function (args) {
        // return { type: Actions.HANDLE_LOGIN, args}
        return async (dispatch, getState) => {
            dispatch({
                type: Actions.SEARCH_BY_DRUG_NAME_INPROGRESS, 
                payload: true
            })
            const drugResults = await apis.fetchSuggestions(args)
            const {success, result}= drugResults
            if(success) {
                dispatch({
                    type: Actions.SEARCH_BY_DRUG_NAME_INPROGRESS, 
                    payload: false
                })
                dispatch({
                    type: Actions.SEARCH_BY_DRUG_NAME, 
                    payload: result
                })
                dispatch({
                    type: Actions.SEARCH_BY_DRUG_NAME_SUCCEEDED, 
                    payload: true
                })
            }else{

                dispatch({
                    type: Actions.SEARCH_BY_DRUG_NAME_INPROGRESS, 
                    payload: false
                })
                dispatch({
                    type: Actions.SEARCH_BY_DRUG_NAME, 
                    payload: ""
                })
                dispatch({
                    type: Actions.SEARCH_BY_DRUG_NAME_SUCCEEDED, 
                    payload: false
                })
            }
        } 

    }, 
    getDrugRxidInformation: function(drugRxid){
        return async (dispatch,getState) => {
            dispatch({
                type: Actions.GET_RXID_DETAILS_INPROGRESS, 
                payload: true
            })
            const drugResults = await apis.getDrugRxidDetails(drugRxid)
            const {success, result}= drugResults
            if(success) {
                dispatch({
                    type: Actions.GET_RXID_DETAILS_INPROGRESS, 
                    payload: false
                })
                dispatch({
                    type: Actions.GET_RXID_DETAILS, 
                    payload: result
                })
                dispatch({
                    type: Actions.GET_RXID_DETAILS_SUCCEEDED, 
                    payload: true
                })
            }else{

                dispatch({
                    type: Actions.GET_RXID_DETAILS_INPROGRESS, 
                    payload: false
                })
                dispatch({
                    type: Actions.GET_RXID_DETAILS, 
                    payload: []
                })
                dispatch({
                    type: Actions.GET_RXID_DETAILS_SUCCEEDED, 
                    payload: false
                })
            }
        } 
    }
}