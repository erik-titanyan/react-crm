import { SET_USER_INFO, GET_CURRENCY } from "../types"

const inialState = {
    user: {
        name: '',
        bill: null,
    },
    currency: null,
    loading: true
}

export const infoReducer = (state = inialState, action) => {
    switch(action.type) {
        case SET_USER_INFO: 
            return  {...state, user: {...state.user ,...action.payload}}
        case GET_CURRENCY:
            return {...state, currency: action.currency, loading: action.loading}
        default: return state
    }
}