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


export const getVacancyApplication = createAsyncThunk(
  'vacancyApplication/getVacancyApplication',
  async (appId: number) => {
    const response = await api.api.growthRequestsDetail(appId);
    return response.data;
  }
);

export const addCityToVacancyApplication = createAsyncThunk(
  'cities/addCityToVacancyApplication',
  async (factorId: number) => {
    const response = await api.api.dataGrowthFactorsAddCreate(factorId);
    return response.data;
  }
);

export const deleteVacancyApplication = createAsyncThunk(
  'vacancyApplication/deleteVacancyApplication',
  async (appId: number) => {
    const response = await api.api.growthRequestsDelete(appId);
    return response.data;
  }
);

export const updateVacancyApplication = createAsyncThunk(
  'vacancyApplication/updateVacancyApplication',
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

export const deleteCityFromVacancyApplication = createAsyncThunk(
  'cities/deleteCityFromVacancyApplication',
  async (factorId : number) => {
    await api.api.growthRequestDataGrowthFactorsDelete(factorId); 
  }
);


const vacancyApplicationDraftSlice = createSlice({
  name: 'vacancyApplicationDraft',
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
    setVacancyData: (state, action) => {
        state.growth_request = {
            ...state.growth_request,
            ...action.payload,
        };
    },
    setCities: (state, action) => {
        state.factors = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
        .addCase(getVacancyApplication.fulfilled, (state, action) => {
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
        .addCase(getVacancyApplication.rejected, (state) => {
            state.error = 'Ошибка при загрузке данных';
        })

        .addCase(deleteVacancyApplication.fulfilled, (state) => {
            state.app_id = NaN;
            state.count = NaN;
            state.factors = [];
            state.growth_request = {
                CurData: NaN,
                StartPeriod: '',
                EndPeriod: ''
            };
        })
        .addCase(deleteVacancyApplication.rejected, (state) => {
            state.error = 'Ошибка при удалении вакансии';
        })

        .addCase(updateVacancyApplication.fulfilled, (state, action) => {
            state.growth_request = {
                CurData: action.payload.CurData,
                StartPeriod: action.payload.StartPeriod,
                EndPeriod: action.payload.EndPeriod
            };
        })
        .addCase(updateVacancyApplication.rejected, (state) => {
            state.error = 'Ошибка при обновлении данных';
        })
  }
});


export const { setCities, setVacancyData, setError, setAppId, setCount } = vacancyApplicationDraftSlice.actions;
export const {} = vacancyApplicationDraftSlice.actions;
export default vacancyApplicationDraftSlice.reducer;