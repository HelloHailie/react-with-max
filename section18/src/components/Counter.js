// import { Component } from "react"; // 클래스 기반 컴포넌트 진행시 필요함
import { useSelector, useDispatch } from "react-redux"; //리덕스에 접근하는 방법 hook을 사용하자 // useSelector 자동으로 상태의 일부를 선택하게 해준다.

// import { useSelector, useDispatch, connect } from "react-redux";클래스 기반 컴포넌트 에서 리덕스에 접근하는 방법

import { counterActions } from "../store/counter";
import classes from "./Counter.module.css";

const Counter = () => {
  const dispatch = useDispatch(); // dispatch는 Redux store에 대한 action을 보낸다.
  const counter = useSelector((state) => state.counter.counter); // store가 관리하는 데이터에 접근할 수 있다. //(state) => state.counter 이 함수는 리액트 리덕스에 의해 실행될 것이다. 그리고 리덕스 상태를 보낸다. 그리고 이 함수로 데이터를 관리한다.//이게 subscrition을 설정한다.
  const show = useSelector((state) => state.counter.showCounter);

  const incrementHandler = () => {
    dispatch(counterActions.increment());
    //dispatch({ type: "increment" }); 일반 리덕스에서 액션을 디스패치하는 방법
  };

  const increaseHandler = () => {
    dispatch(counterActions.increase(5)); // payload는 인자로 넣어주기만 하면 된다.

    //dispatch({ type: "increase", amount: 5 });
  };

  const decrementHandler = () => {
    dispatch(counterActions.decrement());
    //dispatch({ type: "decrement" });
  };

  const toggleCounterHandler = () => {
    dispatch(counterActions.toggleCounter());
    //dispatch({ type: "toggle" });
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {show && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={increaseHandler}>Increment by 5</button>

        <button onClick={decrementHandler}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;

// class Counter extends Component {
//   // 클래스 기반 컴포넌트 (useSelector, useDispatch 못쓴다. 대신 connect 사용)
//   incrementHandler() {
//     this.props.increment();
//   }
//   decrementHandler() {
//     this.props.decrement();
//   }
//   toggleCounterHandler() {}
//   render() {
//     return (
//       <main className={classes.counter}>
//         <h1>Redux Counter</h1>
//         <div className={classes.value}>{this.props.counter}</div>
//         <div>
//           <button onClick={this.incrementHandler.bind(this)}>Increment</button>
//           <button onClick={this.decrementHandler.bind(this)}>Decrement</button>
//         </div>
//         <button onClick={this.toggleCounterHandler}>Toggle Counter</button>
//       </main>
//     );
//   }
// }

// const mapStateToProps = (state) => {
//   // useSelector랑 약간 비슷
//   return {
//     counter: state.counter,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   // useDispatch랑 약간 비슷
//   return {
//     increment: () => dispatch({ type: "increment" }),
//     decrement: () => dispatch({ type: "decrement" }),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Counter); // 인자를 2개 받는다
