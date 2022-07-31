import React from "react";
import MyParagraph from "./MyParagragh";

const DemoOutput = (props) => {
  console.log("DemoOutput RUNNING");
  return <MyParagraph>{props.show ? "This is new!" : ""}</MyParagraph>;
};

export default React.memo(DemoOutput); // 특정한 상황일때만 이 컴포넌트가 실행되게 하고 싶다!

//React.memo는 인자로 들어간 이 컴포넌트에 어떤 props가 입력되는지 확인하고 입력되는 모든 props의 신규 값을 확인한 뒤
// 이를 기존의 props의 값과 비교하도록 리액트에게 전달한다. 그리고 props의 값이 바뀐 경우에만 컴포넌트를 재실행 및 재평가한다.
// 그리고 부모 컴포넌트가 변경되었지만 그 컴포넌트의 props 값이 바뀌지 않았다면 컴포넌트 실행은 건너뛴다.
