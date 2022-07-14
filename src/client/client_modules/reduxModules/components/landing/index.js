import LandingActions from "./landing.actions.js"
import * as LandingConstants from "./landing.constants.js";
import LandingReducers from "./landing.reducers.js";
import LandingState from "./landing.state.js";



export { LandingActions, LandingConstants, LandingReducers, LandingState};

export default {
	actions: LandingActions,
	constants: LandingConstants,
	reducers: LandingReducers,
	state: LandingState
};
