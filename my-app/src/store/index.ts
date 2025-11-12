import { createStore, combineReducers } from "redux";
import { filterReducer } from "./filterReducer";

const rootReducer = combineReducers({
  filter: filterReducer,
});

export const store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;
