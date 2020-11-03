import { getUid } from "../info/infoActions"
import firebase from 'firebase'
import { GET_RECORDS } from "../types"
import errorHandler from "../errorHandler"

export const createRecord = (record) => {
  return async dispatch => {
    try {
      const uid = await dispatch(getUid())
      await firebase.database().ref(`/users/${uid}/records`).push(record)
    } catch (e) {
      errorHandler(e)
    }
  }
 
}

export const getRecordById = (id) => {
  return async dispatch => {
    try {
      const uid = await dispatch(getUid())
      const res = (await (firebase.database().ref(`/users/${uid}/records/${id}`).once('value'))).val() || {}
      return res
    } catch (e) {
      errorHandler(e)
    }
  }
}

export const fetchRecords = () => {
  return async dispatch => {
    try {
      const uid = await dispatch(getUid())
      const res = (await (firebase.database().ref(`/users/${uid}/records`).once('value'))).val() || {}
      const convertedRes= Object.keys(res).map(id => {
        return {id, ...res[id]}
      })
      dispatch({type: GET_RECORDS, payload: convertedRes})
    } catch (e) {
      errorHandler(e)
    }
  }
}

