import { createSlice } from "@reduxjs/toolkit";

const selectedProductSlice = createSlice({
  name: "selectedProduct",
  initialState: { product: null },
  reducers: {
    setProduct: (state, action) => {
      state.product = action.payload;
    },
    clearProduct: (state) => {
      state.product = null;
    },
  },
});

export const { setProduct, clearProduct } = selectedProductSlice.actions;
export default selectedProductSlice.reducer;
