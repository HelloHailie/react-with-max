import React from "react";

import classes from "./Button.module.css";

const Button = (props) => {
  console.log("Button RUNNING!");
  return (
    <button
      type={props.type || "button"}
      className={`${classes.button} ${props.className}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default React.memo(Button);
// export default React.memo(Button); 가 작동 안되는 이유

// App 함수가 실행될 때마다 새로운 함수 객체가 생성이 되고 이 함수 객체가 onClick props에 전달된다.
// 이렇게 되면, 버튼은 props.onClick과 props.previous.onClick을 비교하는 셈이 된다.
// 그리고 이 두 함수 객체는 같은 내용을 갖고 있다 해도 자바스크립트에서 이 둘을 비교하면 결코 동일하지 않다.

// React.memo(Button)가 정상 작동하게 하려면 useCallback을 쓰면 된다.
// useCallback 훅은 기본적으로 컴포넌트 실행 전반에 걸쳐 함수를 저장할 수 있게 하는 훅으로,
// useCallback를 쓰면 리액트에 이 함수를 저장하고, 매번 실행때마다 이 함수를 재생성할 필요가 없다는걸 알릴 수 있다.
// 이렇게 되면, 동일한 함수 객체가 메모리의 동일한 위치에 저장되므로 이를 통해 비교 작업을 할 수 있다.
