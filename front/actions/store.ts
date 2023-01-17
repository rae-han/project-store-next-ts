import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { backUrl } from '../config/config';
import storeSlice from '../reducers/modules/store';
import { fetchStoreInfo, fetchSettings, fetchBanners, fetchCategories, fetchMenus } from '../apis/store';

axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true; // front, backend 간 쿠키 공유

export const loadStoreInfo = createAsyncThunk('store/loadStoreInfo', async (data, thunkAPI) => {
  const { storeInfoLoading } = thunkAPI.getState().store;

  if (!storeInfoLoading) {
    return;
  }

  try {
    const response = await fetchStoreInfo(data);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const loadSettings = createAsyncThunk('store/loadSettings', async (data, thunkAPI) => {
  try {
    const response = await fetchSettings(data);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const loadBanners = createAsyncThunk('store/loadBanners', async (data, thunkAPI) => {
  try {
    const response = await fetchBanners(data);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const loadCategories = createAsyncThunk('store/loadCategories', async (data, thunkAPI) => {
  try {
    const response = await fetchCategories(data);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const loadMenus = createAsyncThunk('store/loadMenus', async (data, thunkAPI) => {
  try {
    const response = await fetchMenus(data);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
