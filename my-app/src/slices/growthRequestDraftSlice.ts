import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api';

interface GrowthRequestState {
  app_id: number;
  count: number | undefined;

  factors: DataGrowthFactor[]; // массив услуг
  growth_request: GrowthRequestData; // поля заявки

  error: string | null;
  isDraft: boolean;
}

const initialState: GrowthRequestState = {
  app_id: NaN,
  count: NaN,

  factors: [],
  growth_request: {
    CurData: NaN,
    StartPeriod: '',
    EndPeriod: ''
  },
  
  error: null,
  isDraft: false,
};

export interface DataGrowthFactor {
    ID: number;
    Title: string;
    Attribute: string;
    FactorNum: number;
    Coeff: number;
    Image: string;
}

interface GrowthRequestData {
    CurData?: number | null;
    StartPeriod?: string | null;
    EndPeriod?: string | null;
}


export const getGrowthRequest = createAsyncThunk(
  'growthRequest/getGrowthRequest',
  async (appId: number) => {
    const response = await api.api.growthRequestsDetail(appId);
    return response.data;
  }
);

export const addCityToGrowthRequest = createAsyncThunk(
  'factors/addCityToGrowthRequest',
  async (factorId: number) => {
    const response = await api.api.dataGrowthFactorsAddCreate(factorId);
    return response.data;
  }
);

export const deleteGrowthRequest = createAsyncThunk(
  'growthRequest/deleteGrowthRequest',
  async (appId: number) => {
    const response = await api.api.growthRequestsDelete(appId);
    return response.data;
  }
);

export const updateGrowthRequest = createAsyncThunk(
  'growthRequest/updateGrowthRequest',
  async ({ appId, growthRequestData }: { appId: number; growthRequestData: GrowthRequestData }) => {
    const growthRequestDataToSend = {
      cur_data: Number(growthRequestData.CurData) || 0, 
      start_period: growthRequestData.StartPeriod ?? '',
      end_period: growthRequestData.EndPeriod ?? ''
    };
    const response = await api.api.growthRequestsUpdate(appId, growthRequestDataToSend);
    return response.data;
  }
);

export const deleteCityFromGrowthRequest = createAsyncThunk(
  'factors/deleteCityFromGrowthRequest',
  async (factorId : number) => {
    await api.api.growthRequestDataGrowthFactorsDelete(factorId); 
  }
);

// export const formGrowthRequest = createAsyncThunk(
//   'growthRequest/formGrowthRequest',
//   async (appId: number) => {
//     const response = await api.api.growthRequestsFormUpdate(appId);
//     return response.data;
//   }
// );

export const formGrowthRequest = createAsyncThunk(
  'growthRequest/formGrowthRequest',
  async (appId: number, { rejectWithValue }) => {
    try {
      const response = await api.api.growthRequestsFormUpdate(appId);
      return response.data;
    } catch (err: any) {
      // если бэк возвращает JSON с ошибкой
      const message = err.response?.data?.error || 'Ошибка при формировании вакансии';
      return rejectWithValue(message);
    }
  }
);


const growthRequestDraftSlice = createSlice({
  name: 'growthRequestDraft',
  initialState,
  reducers: {
    setAppId: (state, action) => {
      state.app_id = action.payload;
    },
    setCount: (state, action) => {
      state.count = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setGrowthRequestData: (state, action) => {
        state.growth_request = {
            ...state.growth_request,
            ...action.payload,
        };
    },
    setFactors: (state, action) => {
        state.factors = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
        .addCase(getGrowthRequest.fulfilled, (state, action) => {
            const { growth_request, factors } = action.payload;
            if (growth_request && factors) {
                state.app_id = growth_request.ID;
                state.growth_request = {
                    CurData: growth_request.CurData,
                    StartPeriod: growth_request.StartPeriod,
                    EndPeriod: growth_request.EndPeriod
                };
                state.factors = factors || [];
            }
            state.isDraft = growth_request.Status === "черновик";
        })
        .addCase(getGrowthRequest.rejected, (state) => {
            state.error = 'Ошибка при загрузке данных';
        })

        .addCase(deleteGrowthRequest.fulfilled, (state) => {
            state.app_id = NaN;
            state.count = NaN;
            state.factors = [];
            state.growth_request = {
                CurData: NaN,
                StartPeriod: '',
                EndPeriod: ''
            };
        })
        .addCase(deleteGrowthRequest.rejected, (state) => {
            state.error = 'Ошибка при удалении вакансии';
        })

        .addCase(updateGrowthRequest.fulfilled, (state, action) => {
            state.growth_request = {
                CurData: action.payload.CurData,
                StartPeriod: action.payload.StartPeriod,
                EndPeriod: action.payload.EndPeriod
            };
        })
        .addCase(updateGrowthRequest.rejected, (state) => {
            state.error = 'Ошибка при обновлении данных';
        })

        .addCase(formGrowthRequest.fulfilled, (state) => {
            state.app_id = NaN;
            state.count = NaN;
            state.factors = [];
            state.growth_request = {
                CurData: NaN,
                StartPeriod: '',
                EndPeriod: ''
            };
        })
        // .addCase(formGrowthRequest.rejected, (state) => {
        //     state.error = 'Ошибка при формировании вакансии';
        // })
        .addCase(formGrowthRequest.rejected, (state, action) => {
          state.error = action.payload as string || 'Ошибка при формировании вакансии';
        })
  }
});


export const { setFactors, setGrowthRequestData, setError, setAppId, setCount } = growthRequestDraftSlice.actions;
export const {} = growthRequestDraftSlice.actions;
export default growthRequestDraftSlice.reducer;