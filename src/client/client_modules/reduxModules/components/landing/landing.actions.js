import * as Actions from "./landing.constants.js";
import apis from "./landing.apis.js"

export default {
    exampleAction : function(argum){
        return { type: Actions.EXAMPLE, argum}
    },
    handleLogin: function(args){
        // return { type: Actions.HANDLE_LOGIN, args}
        console.log("Retrieved args are", args)
        return async (dispatch, getState) => {
            const authVerificationResult = await apis.authenticationCheck(args)
            console.log("result", authVerificationResult)
                dispatch({
                    type: Actions.HANDLE_LOGIN, 
                    payload: true
                })
        }
    }
}