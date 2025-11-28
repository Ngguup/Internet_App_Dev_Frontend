import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api';
import { DsDataGrowthFactor } from '../api/Api';
import { DATA_GROWTH_FACTORS_MOCK } from "../modules/mock"; // мок-данные

import { setAppId, setCount } from './vacancyApplicationDraftSlice';

interface DataGrowthFactorsState {
  searchValue: string;
  minCoeff: string;
  maxCoeff: string;
  dgf: DsDataGrowthFactor[];
  loading: boolean;
}

const initialState: DataGrowthFactorsState = {
  searchValue: '',
  minCoeff: '',
  maxCoeff: '', 
  dgf: [],
  loading: false,
};

export const getDataGrowthFactorsList = createAsyncThunk(
  'dgf/getDataGrowthFactorsList',
  async (_, { getState, dispatch, rejectWithValue }) => {
    const { dgf }: any = getState();
    try {
      const response = await api.api.dataGrowthFactorsList({title: dgf.searchValue, min_coeff: dgf.minCoeff, max_coeff: dgf.maxCoeff});

      const app_id = response.data.draft_vacancy_application; // ID черновой заявки
      const count = response.data.count; // количество услуг в черновой заявке

      dispatch(setAppId(app_id));
      dispatch(setCount(count));

      return response.data;
    } catch (error) {
      return rejectWithValue('Ошибка при загрузке данных');
    }
  }
);

const citiesSlice = createSlice({
  name: 'dgf',
  initialState,
  reducers: {
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    setMinCoeff(state, action) {
      state.minCoeff = action.payload;
    }, 
    setMaxCoeff(state, action) {
      state.maxCoeff = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDataGrowthFactorsList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDataGrowthFactorsList.fulfilled, (state, action) => {
        state.loading = false;
        state.dgf = action.payload;
        console.log("dgf:", state.dgf)
      })
      .addCase(getDataGrowthFactorsList.rejected, (state) => {
        state.loading = false;
        state.dgf = DATA_GROWTH_FACTORS_MOCK.filter((item) => {
          // item.title!.toLocaleLowerCase().startsWith(state.searchValue.toLocaleLowerCase())
          const matchesTitle = item.title!
            .toLocaleLowerCase()
            .includes(state.searchValue.toLocaleLowerCase());

          const min = state.minCoeff ? parseFloat(state.minCoeff) : -Infinity;
          const max = state.maxCoeff ? parseFloat(state.maxCoeff) : Infinity;

          const matchesCoeff = item.coeff! >= min && item.coeff! <= max;
          return matchesTitle && matchesCoeff;

        });
      });
  },
});

export const { setSearchValue } = citiesSlice.actions;
export const { setMinCoeff } = citiesSlice.actions;
export const { setMaxCoeff } = citiesSlice.actions;

export default citiesSlice.reducer;