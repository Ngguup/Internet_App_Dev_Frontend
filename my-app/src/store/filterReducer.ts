// Определяем типы действий
const SET_SEARCH = "SET_SEARCH";
const SET_MIN_COEFF = "SET_MIN_COEFF";
const SET_MAX_COEFF = "SET_MAX_COEFF";

// Определяем интерфейс состояния
export interface FilterState {
  searchValue: string;
  minCoeff: string;
  maxCoeff: string;
}

// Начальное состояние
const initialState: FilterState = {
  searchValue: "",
  minCoeff: "",
  maxCoeff: "",
};

// Редьюсер
export const filterReducer = (state = initialState, action: any): FilterState => {
  switch (action.type) {
    case SET_SEARCH:
      return { ...state, searchValue: action.payload };
    case SET_MIN_COEFF:
      return { ...state, minCoeff: action.payload };
    case SET_MAX_COEFF:
      return { ...state, maxCoeff: action.payload };
    default:
      return state;
  }
};

// Action creators
export const setSearch = (value: string) => ({ type: SET_SEARCH, payload: value });
export const setMinCoeff = (value: string) => ({ type: SET_MIN_COEFF, payload: value });
export const setMaxCoeff = (value: string) => ({ type: SET_MAX_COEFF, payload: value });
