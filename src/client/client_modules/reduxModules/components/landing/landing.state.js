import { fromJS } from "immutable"

const initialState = fromJS({
    name : "BLINK-HEALTH",
    called: false,
    isLoggedIn: false
})

export { initialState }
export default initialState