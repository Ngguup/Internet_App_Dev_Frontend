import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api';
import { DsDataGrowthFactor } from '../api/Api';
import { DATA_GROWTH_FACTORS_MOCK } from "../modules/mock"; // мок-данные

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
      const response = await api.api.dataGrowthFactorsList({title: dgf.searchValue});

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