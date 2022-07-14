import aggregatedReducers from "./components/**/*.reducers.js";

let masterReducer = {};
if(typeof aggregatedReducers !== "undefined" && aggregatedReducers) {
    aggregatedReducers.forEach((reducer,index)=>{
        const module = reducer.default || {};
        masterReducer[module.name] = module
    })
}

export default masterReducer;