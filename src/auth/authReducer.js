import { types } from "../types/types";


export const authReducer = ( state = {}, action) => {

    switch ( action.type ) {
        case types.login:     
            return {
                ...action.payload,
                logged: true
            }
    
        case types.logout:       
            return {
                logged: false
            }
    
        default:
            return state;//retornamos el state a modo de exception por si el action.type que se recibió no esta en ninguno de los cases
    }
}