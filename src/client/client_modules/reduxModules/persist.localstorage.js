import { combineReducers } from "redux";
import masterReducer from "./rootReducer";
import storage from "redux-persist/lib/storage"
import storageSession from "redux-persist/lib/storage/session"
import { persistReducer, createTransform } from "redux-persist";
import {fromJS, isImmutable} from "immutable";


const immutableTransformations = createTransform((inbound)=>{
    console.log("Inbound before", inbound)
    inbound = isImmutable(inbound) ? inbound.toJS(): inbound;
    console.log("Inbound after", inbound)
    return inbound
},(outbound)=>{
     console.log("Inbound before", inbound)
    outbound = isImmutable(outbound) ? outbound: fromJS(outbound);
    console.log("Inbound after", inbound)
    return outbound

},{whitelist: ["landing"]})

const initConfig = {
    key : 'root',
    storage : storage,
    transforms : [immutableTransformations],
    whitelist : ['landing','drugs']
}
 

 function persistedLocalReducer(){
    const rootReducer = combineReducers({
        ...masterReducer
    })

    return persistReducer(initConfig, rootReducer)
}

export { persistedLocalReducer };