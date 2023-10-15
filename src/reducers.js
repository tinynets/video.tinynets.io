import { SET_TRAINING_DATA } from "./actions";

const initialState = {
    trainingData : []
}

export const trainingDataReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_TRAINING_DATA : 
            return {
                ...state,
                trainingData : action.payload
            }
        default : 
            return state
    }
}