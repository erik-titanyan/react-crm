import { combineReducers } from "redux"
import { infoReducer } from './info/infoReducer'
import { categoryReducer } from "./category/categoryReducer"
import { RESET_REDUCERS } from "./types"
import { recordReducer } from "./record/recordReducer"


const appReducer = combineReducers({
    info: infoReducer, category: categoryReducer, record: recordReducer
})

export const rootReducer = (state, action) => {
    if(action.type === RESET_REDUCERS) {
        state = undefined
    }
    return appReducer(state, action)
}
