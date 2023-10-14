import { createSlice } from '@reduxjs/toolkit';

const trainingDataSlice = createSlice({
    name : 'trainingData',
    initialState: {
        trainingData: []
    },
    reducers: {
        addTrainingData: (state, action) => {
            state.trainingData.push(action.payload);
        }
    }
})

export const { addTrainingData } = trainingDataSlice.actions;


export default trainingDataSlice.reducer;