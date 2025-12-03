import { configureStore } from '@reduxjs/toolkit';
import dgfReducer from './slices/factorsSlice';

import userReducer from './slices/userSlice'; 
import growthRequestDraftReducer from './slices/growthRequestDraftSlice';
import GrowthRequestTableReducer from './slices/growthRequestTableSlice'
// import filterReducer from './slices/filterSlice';

export const store = configureStore({
  reducer: {
    dgf: dgfReducer,     // ← это должно быть!
    user: userReducer,
    growthRequestDraft: growthRequestDraftReducer, 
    growthRequestTable: GrowthRequestTableReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
