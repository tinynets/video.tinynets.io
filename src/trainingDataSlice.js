import { createSlice } from '@reduxjs/toolkit';

const trainingDataSlice = createSlice({
    name : 'recording',
    initialState: {
        trainingData: [],
        selectedVideo: null,
        isRecording: false
    },
    reducers: {
        stopRecording: (state, action) => {
            state.isRecording = false;
        },
        startRecording : (state) => {
            state.isRecording = true;
        },
        addTrainingData: (state, action) => {
            state.trainingData.push(action.payload);
        },
    }
})



export default trainingDataSlice.reducer;

export const { stopRecording, startRecording, addTrainingData } = trainingDataSlice.actions;