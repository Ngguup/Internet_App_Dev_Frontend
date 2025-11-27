import { configureStore } from '@reduxjs/toolkit';
import dgfReducer from './slices/citiesSlice';
// import filterReducer from './slices/filterSlice';

export const store = configureStore({
  reducer: {
    dgf: dgfReducer,     // ← это должно быть!
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
