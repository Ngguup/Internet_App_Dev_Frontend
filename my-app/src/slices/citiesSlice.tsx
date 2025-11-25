import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api';
import { DsDataGrowthFactor } from '../api/Api';
import { DATA_GROWTH_FACTORS_MOCK } from "../modules/mock"; // мок-данные

interface CitiesState {
  searchValue: string;
  cities: DsDataGrowthFactor[];
  loading: boolean;
}

const initialState: CitiesState = {
  searchValue: '',
  cities: [],
  loading: false,
};

export const getCitiesList = createAsyncThunk(
  'cities/getCitiesList',
  async (_, { getState, dispatch, rejectWithValue }) => {
    const { cities }: any = getState();
    try {
      const response = await api.api.dataGrowthFactorsList({title: cities.searchValue});

      return response.data;
    } catch (error) {
      return rejectWithValue('Ошибка при загрузке данных');
    }
  }
);

const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCitiesList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCitiesList.fulfilled, (state, action) => {
        state.loading = false;
        state.cities = action.payload;
      })
      .addCase(getCitiesList.rejected, (state) => {
        state.loading = false;
        state.cities = DATA_GROWTH_FACTORS_MOCK.filter((item) =>
          item.Title.toLocaleLowerCase().startsWith(state.searchValue.toLocaleLowerCase())
        );
      });
  },
});

export const { setSearchValue } = citiesSlice.actions;
export default citiesSlice.reducer;