import { GET_CURRENT_RECORD, GET_RECORDS } from "../types"

const initialState = {
  records: [],
  currentRecord: []
}

export const recordReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECORDS: 
              return {...state, records: [...action.payload]}
    case GET_CURRENT_RECORD:
              return {...state, currentRecord: [action.payload]}
    default: return state
  }
}