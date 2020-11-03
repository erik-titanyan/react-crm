import firebase from 'firebase'
import errorHandler from '../errorHandler'
import { getUid } from '../info/infoActions'
import { ADD_CATEGORY, GET_CURRENT_CATEGORY, RESET_CATEGORIES, UPDATE_CATEGORY } from '../types'


export const createCategory = ({title, limit}) => {
  return async dispatch => {
    try {
      const uid = await dispatch(getUid())
      const result = await firebase.database().ref(`/users/${uid}/categories/`).push({title, limit})
      const payload = [{title, limit, id: result.key}]
      dispatch({type: ADD_CATEGORY, payload})
    } catch (e) {
      errorHandler(e)
    }
  }
}

export const fetchCategories = () => {
  return async dispatch => {
    try {
      const uid = await dispatch(getUid())
      const res = (await (firebase.database().ref(`/users/${uid}/categories`).once('value'))).val() || {}
      const convertedRes= Object.keys(res).map(id => {
        return {id, ...res[id]}
      })
      dispatch({type: ADD_CATEGORY, payload: convertedRes})
    } catch (e) {
      errorHandler(e)
    }
  }
}

export const getCategoryById = (id) => {
  return async dispatch => {
    try {
      const uid = await dispatch(getUid())
      const res = (await (firebase.database().ref(`/users/${uid}/categories/${id}`).once('value'))).val() || {}
      //dispatch({type: GET_CURRENT_CATEGORY, payload: res})
      return res
    } catch (e) {
      errorHandler(e)
    }
  }
}

export const updateCategory = ({id, title, limit}) => {
  return async dispatch => {
    try {
      const uid = await dispatch(getUid())
      await firebase.database().ref(`/users/${uid}/categories`).child(id).update({title, limit})
      dispatch({type:UPDATE_CATEGORY, payload: {id, title, limit}})
    } catch (e) {
      errorHandler(e)
    }
   
  }
}

export const resetCategories = () => {
  return {type: RESET_CATEGORIES}
}