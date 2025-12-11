import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api';

interface GrowthRequestTableState {
    growthRequests: GrowthRequestRow[];
    error: string | null;
}

interface GrowthRequestRow {
    id: number;
    status: string;
    date_create: string;
    date_update: string;
    result: number;
}

const initialState: GrowthRequestTableState = {
    growthRequests: [],
    error: null
}

export const getGrowthRequestsList = createAsyncThunk(
  'gr/getGrowthRequestsList',
  async (_, { rejectWithValue }) => {
    const request = { state: "", start_date: "", end_date: ""};
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGrowthRequestsList.pending, (state) => {
        state.error = null;
      })
      .addCase(getGrowthRequestsList.fulfilled, (state, action) => {
        state.growthRequests = action.payload.map((item: Record<string, any>) => ({
            id: Number(item.id),
            status: item.status ?? '',
            date_create: item.date_create ?? '',
            date_update: item.date_update ?? '',
            result: item.result ?? ''
        }));
    })
      .addCase(getGrowthRequestsList.rejected, (state, action) => {
        state.error = action.payload as string || 'Ошибка';
      })
      
  },
});

export default growthRequestTableSlice.reducer;