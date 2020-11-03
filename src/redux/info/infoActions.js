import firebase from 'firebase'
import { SET_USER_INFO, GET_CURRENCY } from '../types'

import { useToast } from '../../hooks/useToast.hook'
import toastMessages from '../../hooks/utils/toastMessages'
import errorHandler from '../errorHandler'


const {successToast, errorToast} = useToast()


export const getUserInfo = () => {
   return async dispatch => {
		try {
			const uid = await dispatch(getUid())
			const res = (await (firebase.database().ref(`/users/${uid}/info`).once('value'))).val() || {}
			dispatch({type:SET_USER_INFO, payload: {...res}})
		} catch (e) {
			errorHandler(e)
		}	 
	 } 
}

export const updateInfo = (info) => {
	return async dispatch => {
		try {
			const uid = await dispatch(getUid())
			await firebase.database().ref(`/users/${uid}/`).child('info').update({...info})
			dispatch({type:SET_USER_INFO, payload: {...info}})
		} catch (e) {
			errorHandler(e)
		}
	}
}

export const getUid = () => {
	return dispatch => new Promise((res) => {
			firebase.auth().onAuthStateChanged(function (user) {
				if(user) {
					res(user) 
				}
			})}).then((value) => {
				return value.uid
			})
}  

export const fetchCurrency = () => {
	return async dispatch => {
		try {
			const key = 'a1b72956066c6348389a30fcc2d2d5f0' // must be in .env
			await fetch(`http://data.fixer.io/api/latest?access_key=${key}&symbols=EUR,USD,AMD`)
									.then(v => v.json())
									.then(v => dispatch({type:GET_CURRENCY, 
														currency: {rates: v.rates, date: v.date}, 
														loading: false}))
		} catch (error) {
			errorToast(toastMessages['error-default'] + ' in currency fetching')
			throw error
		}	
	}
}