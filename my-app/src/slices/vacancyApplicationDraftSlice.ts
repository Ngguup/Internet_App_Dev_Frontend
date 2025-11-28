import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api';

interface VacancyApplicationState {
  app_id?: number;
  count: number | undefined;

  cities: City[]; // массив услуг
  vacancyData: VacancyData; // поля заявки
  error: string | null;

  isDraft: boolean;
}

const initialState: VacancyApplicationState = {
  app_id: NaN,
  count: NaN,

  cities: [],
  vacancyData: {
    vacancy_name: '',
    vacancy_responsibilities: '',
    vacancy_requirements: ''
  },
  error: null,

  isDraft: false,
};

interface City {
    city_id?: { 
        city_id?: number | undefined; 
        name: string; 
        population: string; 
        salary: string; 
        unemployment_rate: string; 
        description: string; 
        url?: string | undefined; 
    } | undefined;
    count?: number | undefined;  
}

interface VacancyData {
    vacancy_name?: string | null;
    vacancy_responsibilities?: string | null;
    vacancy_requirements?: string | null;
}


export const getVacancyApplication = createAsyncThunk(
  'vacancyApplication/getVacancyApplication',
  async (appId: string) => {
    const response = await api.vacancyApplications.vacancyApplicationsRead(appId);
    return response.data;
  }
);

export const addCityToVacancyApplication = createAsyncThunk(
  'cities/addCityToVacancyApplication',
  async (cityId: number) => {
    const response = await api.cities.citiesAddToVacancyApplicationCreate(cityId.toString());
    return response.data;
  }
);

export const deleteVacancyApplication = createAsyncThunk(
  'vacancyApplication/deleteVacancyApplication',
  async (appId: string) => {
    const response = await api.vacancyApplications.vacancyApplicationsDeleteVacancyApplicationDelete(appId);
    return response.data;
  }
);

export const updateVacancyApplication = createAsyncThunk(
  'vacancyApplication/updateVacancyApplication',
  async ({ appId, vacancyData }: { appId: string; vacancyData: VacancyData }) => {
    const vacancyDataToSend = {
      vacancy_name: vacancyData.vacancy_name ?? '', 
      vacancy_responsibilities: vacancyData.vacancy_responsibilities ?? '',
      vacancy_requirements: vacancyData.vacancy_requirements ?? ''
    };
    const response = await api.vacancyApplications.vacancyApplicationsUpdateVacancyUpdate(appId, vacancyDataToSend);
    return response.data;
  }
);

export const deleteCityFromVacancyApplication = createAsyncThunk(
  'cities/deleteCityFromVacancyApplication',
  async ({ appId, cityId }: { appId: number; cityId: number }) => {
    await api.citiesVacancyApplications.citiesVacancyApplicationsDeleteCityFromVacancyApplicationDelete(
      appId.toString(),
      cityId.toString()
    ); 
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
        state.vacancyData = {
            ...state.vacancyData,
            ...action.payload,
        };
    },
    setCities: (state, action) => {
        state.cities = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
        .addCase(getVacancyApplication.fulfilled, (state, action) => {
            const { vacancy_application, cities } = action.payload;
            if (vacancy_application && cities) {
                state.app_id = vacancy_application.app_id;
                state.vacancyData = {
                    vacancy_name: vacancy_application.vacancy_name,
                    vacancy_responsibilities: vacancy_application.vacancy_responsibilities,
                    vacancy_requirements: vacancy_application.vacancy_requirements
                };
                state.cities = cities || [];
            }
            state.isDraft = vacancy_application.status === 1;
        })
        .addCase(getVacancyApplication.rejected, (state) => {
            state.error = 'Ошибка при загрузке данных';
        })

        .addCase(deleteVacancyApplication.fulfilled, (state) => {
            state.app_id = NaN;
            state.count = NaN;
            state.cities = [];
            state.vacancyData = {
                vacancy_name: '',
                vacancy_responsibilities: '',
                vacancy_requirements: ''
            };
        })
        .addCase(deleteVacancyApplication.rejected, (state) => {
            state.error = 'Ошибка при удалении вакансии';
        })

        .addCase(updateVacancyApplication.fulfilled, (state, action) => {
            state.vacancyData = action.payload;
        })
        .addCase(updateVacancyApplication.rejected, (state) => {
            state.error = 'Ошибка при обновлении данных';
        })
  }
});


export const { setCities, setVacancyData, setError, setAppId, setCount } = vacancyApplicationDraftSlice.actions;
export const {} = vacancyApplicationDraftSlice.actions;
export default vacancyApplicationDraftSlice.reducer;