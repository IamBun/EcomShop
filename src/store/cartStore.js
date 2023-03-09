import { createSlice } from "@reduxjs/toolkit";

const totalProduct = localStorage.getItem("cartTotal");
const cart = [];
const cartChange = true;
const cartSlice = createSlice({
  name: "cartSlice",
  initialState: { cart, totalProduct, cartChange },
  reducers: {
    changeProductQuantity(state, action) {
      state.totalProduct = action.payload.totalProduct;
      localStorage.setItem("cartTotal", state.totalProduct);
    },
    changeCart(state, action) {
      state.cart = action.payload.cart;
    },
    logoutCart(state) {
      state.totalProduct = null;
      state.cart = null;
      localStorage.removeItem("cartTotal");
    },
    change(state) {
      state.cartChange = !state.cartChange;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
