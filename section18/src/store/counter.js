import { createSlice } from "@reduxjs/toolkit"; //리덕스 툴킷 시작하기 // createSlice가 createReducer보다 더 강력함

const initialCounterState = { counter: 0, showCounter: true };

// 전역 상태의 slice를 미리 만들어놓기 // 코드를 유지보수하기 좋다.
const counterSlice = createSlice({
  name: "counter",
  initialState: initialCounterState,
  reducers: {
    increment(state) {
      state.counter++; // 리덕스 툴킷과 createSlice와 같은 함수를 함께 쓰면 기존 state를 바꿀 수 없다. (내부적으로 원본 state를 복제해서 원본 state가 변하지 않도록 덮어씌운다.)
    },
    decrement(state) {
      state.counter--;
    },
    increase(state, action) {
      state.counter = state.counter + action.payload;
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    },
  },
});

export const counterActions = counterSlice.actions; // 액션 생성자라고 부르고, type 프로퍼티와 액션마다 다른 고유 식별자를 가지고 있다.

export default counterSlice.reducer;
