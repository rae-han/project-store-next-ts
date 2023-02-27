import { createSlice } from '@reduxjs/toolkit';

interface DefaultState {
  categoryId: string;
}

const initialState: DefaultState = {
  categoryId: '',
};

const stateSlice = createSlice({
  name: 'state',
  initialState,
  reducers: {
    setCategoryId: (state) => {
      state.categoryId = '';
    },
  },
});

const { actions, reducer: stateReducer } = stateSlice;

export const { setCategoryId } = actions;

export default stateReducer;
