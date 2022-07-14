import {configureStore} from "@reduxjs/toolkit"
import {persistStore} from 'redux-persist' 
import { persistedLocalReducer} from './persist.localstorage.js'
import thunk from "redux-thunk"
import logger from "redux-logger"

const storeConfiguration = (initialState) => {
    const middlewares = [thunk, logger]

    if(!initialState)
        initialState ={}

    // const store =createStoreWithMiddleware(configureStore)(persistedLocalReducer(), initialState)

    const store = configureStore({
        reducer: persistedLocalReducer(), 
        middleware: [...middlewares],
        devTools: process.env.NODE_ENV!='production',
        preloadedState: initialState
    })


    const persistor = persistStore(store)

    if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept("./rootReducer.js", () => {
			const nextReducer = require("./rootReducer").default;
			store.replaceReducer(nextReducer);
		});
	}
    
    return { store, persistor }
}

export {storeConfiguration}

export default {storeConfiguration}

