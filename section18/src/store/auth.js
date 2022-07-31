import { createSlice } from "@reduxjs/toolkit"; //리덕스 툴킷 시작하기 // createSlice가 createReducer보다 더 강력함

const initialAuthState = { isAuthenticated: false };

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
  },
});

export const authActions = authSlice.actions; // 액션 생성자라고 부르고, type 프로퍼티와 액션마다 다른 고유 식별자를 가지고 있다.

export default authSlice.reducer;
