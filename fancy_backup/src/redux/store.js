import { configureStore } from '@reduxjs/toolkit';
import FamousReducer from './CounterSlice';
import cartReducer from './cartSlice';

export const store = configureStore({
  reducer: {
    famous: FamousReducer,
    cart: cartReducer,
  },
});
