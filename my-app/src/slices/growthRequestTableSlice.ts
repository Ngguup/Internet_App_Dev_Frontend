import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api';
import { RootState } from '../store';

interface GrowthRequestTableState {
    searchStatus: string;
    startDate: string;
    endDate: string;
    growthRequests: GrowthRequestRow[];
    error: string | null;
    loading: boolean;
}

interface GrowthRequestRow {
    id: number;
    status: string;
    date_create: string;
    date_update: string;
    result: number;
}

const initialState: GrowthRequestTableState = {
    searchStatus: '',
    startDate: '',
    endDate: '',
    growthRequests: [],
    error: null,
    loading: false,
}

export const getGrowthRequestsList = createAsyncThunk(
  'gr/getGrowthRequestsList',
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as RootState; //?
    const { searchStatus, startDate, endDate } = state.growthRequestTable;
    const request = { status: searchStatus, start_date: startDate, end_date: endDate};
    try {
      const response = await api.api.growthRequestsList(request);

      return response.data;
    } catch (error) {
      return rejectWithValue('Ошибка при загрузке данных');
    }
  }
);

const growthRequestTableSlice = createSlice({
  name: 'growthRequestTable',
  initialState,
  reducers: {
    setSearchStatus(state, action) {
      state.searchStatus = action.payload;
    },
    setStartDate(state, action) {
      state.startDate = action.payload;
    }, 
    setEndDate(state, action) {
      state.endDate = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGrowthRequestsList.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(getGrowthRequestsList.fulfilled, (state, action) => {
        state.loading = false
        state.growthRequests = action.payload.map((item: Record<string, any>) => ({
            id: Number(item.id),
            status: item.status ?? '',
            date_create: item.date_create ?? '',
            date_update: item.date_update ?? '',
            result: item.result ?? ''
        }));
    })
      .addCase(getGrowthRequestsList.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string || 'Ошибка';
      })
      
  },
});


export const { setSearchStatus } = growthRequestTableSlice.actions;
export const { setStartDate } = growthRequestTableSlice.actions;
export const { setEndDate } = growthRequestTableSlice.actions;

export default growthRequestTableSlice.reducer;