import firebase from 'firebase'
import { useToast } from '../../hooks/useToast.hook'
import toastMessages from '../../hooks/utils/toastMessages'
import errorHandler from '../errorHandler'
import { getUid } from '../info/infoActions'
import { RESET_REDUCERS } from '../types'


const {successToast} = useToast()

export const signIn = ({email, password}) => {
    return async () => {
        try {
           
            await firebase.auth().signInWithEmailAndPassword(email, password)
            successToast(toastMessages["sign in"])
        } catch (e) {
            errorHandler(e)
        }
    }
}

export const signUp = ({email, password, name}) => {
    return async dispatch => {
        try {
            await firebase.auth().createUserWithEmailAndPassword(email, password)
            const uid = await dispatch(getUid())
            firebase.database().ref(`/users/${uid}/info`).set({bill: 10000, name})
            successToast(toastMessages['sign up'])
        } catch (e) {
            errorHandler(e)
        }
    }
}

export const signOut = () =>  {
    return async dispatch => {
        try {
            dispatch({type: RESET_REDUCERS})
            await firebase.auth().signOut()
            successToast(toastMessages['log out'])
        } catch (e) {
            errorHandler(e)
        }
        
    }
}

