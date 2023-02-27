import { configureStore } from '@reduxjs/toolkit';
import stateReducer from '@store/state/stateSlice';
import counterReducer from '@/store/counter/counterSlice';

export const store = configureStore({
  reducer: {
    state: stateReducer,
    counter: counterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
