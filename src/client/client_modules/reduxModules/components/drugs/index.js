import DrugsActions from "./drugs.actions.js"
import * as DrugsConstants from "./drugs.constants.js";
import DrugsReducers from "./drugs.reducers.js";
import DrugsState from "./drugs.state.js";



export { DrugsActions, DrugsConstants, DrugsReducers, DrugsState};

export default {
	actions: DrugsActions,
	constants: DrugsConstants,
	reducers: DrugsReducers,
	state: DrugsState
};
