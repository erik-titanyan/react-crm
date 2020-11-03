import { ADD_CATEGORY, GET_CURRENT_CATEGORY, RESET_CATEGORIES, UPDATE_CATEGORY } from "../types"

const initialState = {
  categories: [],
  currentCategory: []
}

export const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CATEGORY: 
              return {...state, categories: 
                                  [...state.categories, ...action.payload]}
    case UPDATE_CATEGORY:
                const idx = state.categories.findIndex(i => i.id === action.payload.id)
                state.categories[idx] = action.payload
                return state
    case GET_CURRENT_CATEGORY: 
                return {...state, currentCategory: [action.payload]}
    case RESET_CATEGORIES:
                state = initialState
                return state
    default: return state
  }
}