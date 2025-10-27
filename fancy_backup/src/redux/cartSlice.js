import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { cartitems: [] },
  reducers: {
    addToCart: (state, action) => {
      const existing = state.cartitems.find(i => i.id === action.payload.id);
      if (existing) existing.quantity += 1;
      else state.cartitems.push({ ...action.payload, quantity: 1 });
    },
    deleteFromCart: (state, action) => {
      state.cartitems = state.cartitems.filter(i => i.id !== action.payload.id);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cartitems.find(i => i.id === id);
      if (item && quantity > 0) item.quantity = quantity;
    },
    clearCart: (state) => { state.cartitems = []; },
  },
});

export const { addToCart, deleteFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
