import { fromJS } from "immutable"

const initialState = fromJS({
    searchByKeyRes: [],
    searchResultsByDrugName:[],
    rxIdResults:[],
    rxIdProgress: false,
    rxIdStatus: false,
    searchProgress: false,
    searchStatus: false,
})

export { initialState }
export default initialState