import React from "react"
import ReactDOM from "react-dom"
import {BrowserRouter as Router, Route,Switch} from "react-router-dom"
import {Provider} from "react-redux"
import { PersistGate } from "redux-persist/lib/integration/react";
import Landing from "./view/Landing/Landing.js"
import Drugs from "./view/Drugs/Drugs.js"
import DrugsDetails from "./view/DrugsDetails/DrugsDetails.js"
import Notfound from "./view/Notfound/Notfound.js"
import {storeConfiguration} from "./client_modules/reduxModules/store.js"
import storageHandler from "./client_modules/reduxModules/storageHandler.js"
const {store, persistor} = storeConfiguration();
import "./assets/scss/root.scss"

store.subscribe(()=>{
    storageHandler.saveState(store.getState())
})

class App extends React.Component {
    constructor(props) {
        super(props)

    }

    componentDidMount(){
    }
    

    render(){

        return ( 
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <Router>
                <Switch>
                    <Route exact path="/drugs">
                        <Landing/>
                    </Route>
                    <Route exact path="/drugs/search">
                        <Drugs/>
                    </Route>
                    <Route exact path="/drugs/:rxid">
                        <DrugsDetails/>
                    </Route>
                    <Route exact path="*"> 
                        <Notfound/>
                    </Route>
                </Switch>
                </Router>
            </PersistGate>
        </Provider>)
    }
}

ReactDOM.render(<App/>, document.getElementById("root"))