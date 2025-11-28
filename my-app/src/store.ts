import { configureStore } from '@reduxjs/toolkit';
import dgfReducer from './slices/citiesSlice';

import userReducer from './slices/userSlice'; 
import vacancyApplicationDraftReducer from './slices/vacancyApplicationDraftSlice';
// import filterReducer from './slices/filterSlice';

export const store = configureStore({
  reducer: {
    dgf: dgfReducer,     // ← это должно быть!
    user: userReducer,
    vacancyApplicationDraft: vacancyApplicationDraftReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
