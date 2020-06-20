import {GET_ERRORS, CLEAN_ERRORS} from './types'

export const returnErrors = (error, status) => {
    return {
        type: GET_ERRORS,
        payload: {error, status}
    }
}
export const clearErrors = () => {
    return {
        type: CLEAN_ERRORS
    }
}