import { configureStore } from '@reduxjs/toolkit';
import dgfReducer from './slices/citiesSlice';

import userReducer from './slices/userSlice'; 
import vacancyApplicationDraftReducer from './slices/vacancyApplicationDraftSlice';
import GrowthRequestTableReducer from './slices/growthRequestTableSlice'
// import filterReducer from './slices/filterSlice';

export const store = configureStore({
  reducer: {
    dgf: dgfReducer,     // ← это должно быть!
    user: userReducer,
    vacancyApplicationDraft: vacancyApplicationDraftReducer, 
    growthRequestTable: GrowthRequestTableReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
