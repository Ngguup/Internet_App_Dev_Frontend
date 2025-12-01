import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api';

interface UserState {
  login: string;
  isAuthenticated: boolean;
  error?: string | null; 
}

const initialState: UserState = {
  login: '',
  isAuthenticated: false,
  error: null,
};

// Асинхронное действие для авторизации
export const loginUserAsync = createAsyncThunk(
  'user/loginUserAsync',
  async (credentials: { login: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await api.api.usersLoginCreate(credentials);
      return {"response": response.data, "login": credentials.login}; 
    } catch (error) {
      return rejectWithValue('Ошибка авторизации'); // Возвращаем ошибку в случае неудачи
    }
  }
);

// Асинхронное действие для деавторизации
export const logoutUserAsync = createAsyncThunk(
  'user/logoutUserAsync',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.api.usersLogoutCreate();
      return response.data; 
    } catch (error) {
      return rejectWithValue('Ошибка при выходе из системы'); 
    }
  }
);

export const updateUserAsync = createAsyncThunk(
  'user/updateUserAsync',
  async (updateData: { login: string; password: string }, { rejectWithValue }) => {
    try {
      await api.api.usersMeUpdate(updateData);
      return {"login": updateData.login}; 
    } catch (error) {
      return rejectWithValue('Ошибка редактирования'); // Возвращаем ошибку в случае неудачи
    }
  }
);

export const registerUserAsync = createAsyncThunk(
  'user/registerUserAsync',
  async (credentials: { login: string; password: string }, { rejectWithValue }) => {
    try {
      await api.api.usersRegisterCreate(credentials);
      return; 
    } catch (error) {
      return rejectWithValue('Ошибка регистрации'); // Возвращаем ошибку в случае неудачи
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUserAsync.pending, (state) => {
        state.error = null;
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        console.log(action.payload.response.access_token)
        api.setSecurityData(action.payload.response.access_token);
        state.login = action.payload.login;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isAuthenticated = false; 
      })

      .addCase(logoutUserAsync.fulfilled, (state) => {
        api.setSecurityData(null) //?
        state.login = '';
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logoutUserAsync.rejected, (state, action) => {
        state.error = action.payload as string;
      })  

      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.login = action.payload.login;
        state.error = null;
      })
      .addCase(updateUserAsync.rejected, (state, action) => {
        state.error = action.payload as string;
      })    

      .addCase(registerUserAsync.fulfilled, (state) => {
        state.error = null;
      })
      .addCase(registerUserAsync.rejected, (state, action) => {
        state.error = action.payload as string;
      })
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;