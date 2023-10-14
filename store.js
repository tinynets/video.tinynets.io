import { configureStore } from '@reduxjs/toolkit';
import trainingDataReducer from './trainingDataSlice';

const store = configureStore({
    reducer: {
        trainingData: trainingDataReducer
    }
});

export default store;
