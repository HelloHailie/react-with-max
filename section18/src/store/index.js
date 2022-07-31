// 리덕스 로직 저장
// 여기에 스토어를 만들고, 리듀서 함수를 만들자! (구독은 x)

//import { createStore } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "./counter";
import authReducer from "./auth";

// const store = createStore(firstReducer); // 일반 리덕스에서 store와 연결하는 방법
//const store = createStore(createSlice.reducer); // 리덕스 툴킷 에서 store와 연결하는 방법

//const store = configureStore({ reducer: counterSlice.reducer }); // 이걸 전역 상태를 담당하는 주요 리듀서로서 사용할 수 있다.

//const store = configureStore({ reducer: {counter : createSlice.reducer} }); // 만약 slice가 여러개인 경우

const store = configureStore({
  reducer: { counter: counterReducer, auth: authReducer },
}); // slice가 2개 이상이라면!

export default store;

// const firstReducer = (state = initialState, action) => {
//   if (action.type === "increment") {
//     return {
//       counter: state.counter + 1, // 기존의 state와 병합되지 않고 기존 state를 덮어쓴다. 아예 새로운 state 객체값을 반환하기 때문에!! 그래서 항상 다른 state도 값을 써주어야 한다.
//       showCounter: state.showCounter, // 객체와 배열은 자바스크립트에서 참조값이기 때문에 뜻하지 않게 기존의 state를 재정의하거나 변경하기 쉽다. redux를 쓸때 절대 원본 state 변경하지 않기!!
//     };
//   }

//   if (action.type === "increase") {
//     return {
//       counter: state.counter + action.amount,
//       showCounter: state.showCounter,
//     };
//   }

//   if (action.type === "decrement") {
//     return {
//       counter: state.counter - 1,
//       showCounter: state.showCounter,
//     };
//   }

//   if (action.type === "toggle") {
//     return {
//       counter: state.counter,
//       showCounter: !state.showCounter,
//     };
//   }

//   return state;
// };
