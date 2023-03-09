import { createSlice } from "@reduxjs/toolkit";

let name = sessionStorage.getItem("isUser");
let userId = sessionStorage.getItem("userId");
let token = sessionStorage.getItem("token");
const currentUserSlice = createSlice({
  name: "currentUserSlice",
  initialState: { name, token, userId },
  reducers: {
    login(state, action) {
      //khi dang nhap thi nhan email nguoi dung hien tai, luu vao storage
      state.name = action.payload.name;
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      // localStorage.setItem("currentUser", state.name);
      // localStorage.setItem("userId", state.userId);
    },
    logout(state) {
      // khi logout thi xoa email, xoa gio hang, xoa nguoi dung hien tai
      state.email = null;
      state.token = null;
      state.userId = null;
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("isUser");
      // localStorage.removeItem("currentUser");
      localStorage.removeItem("cart");
      // localStorage.removeItem("userId");
    },
  },
});

export const currentUserActions = currentUserSlice.actions;
export default currentUserSlice.reducer;
