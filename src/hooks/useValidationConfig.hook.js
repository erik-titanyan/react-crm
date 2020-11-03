import { setCurrencyFilter } from './setCurrencyFilter.hook'

export const useValidationConfig = () => {
    
    return {
        email: {
            ifEmpty: 'Please, enter your Email',
            regExp: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            ifInvalid: 'Please, enter valid Email'
        },
        password: {
            ifEmpty: 'Please, enter password',
            valueOfMinLength: 6,
            ifInvalid: function () {
                return `The password must have ${this.valueOfMinLength} charachters at least`
            }
        },
        name: {
            ifEmpty: 'Please, enter your name'
        },
        checkbox: {
            ifFalse: 'It must be checked'
        },
        categoryConfig: {
            title: {
                ifEmpty: 'Please, enter the title'
            },
            limit: {
                ifNoValue: 'Please, enter the amount',
                minValue: 1,
                ifInvalid: function () {
                    return `The limit must be ${setCurrencyFilter(this.minValue)} at least`
                }
            },
            record: {
                ifDescriptionEmpty: 'The description is required',
                ifRadioUnchoosen: 'Please, choose type of record'
                
            }
        }
    }
}