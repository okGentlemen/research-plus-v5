import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/user';
import vipReducer from './slices/vipSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    vip: vipReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;