import { createSlice } from "@reduxjs/toolkit";

const billSlice = createSlice({
  name: "billSlice",
  initialState: { bill: [] },
  reducers: {
    getInfo(state, action) {
      state.bill.push(action.payload);
    },
  },
});

export const billActions = billSlice.actions;
export default billSlice.reducer;
