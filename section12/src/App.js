import React, { useState, useCallback } from "react";
import Button from "./components/UI/Button/Button.js";
import DemoOutput from "./components/Demo/DemoOutput.js";

import "./App.css";

function App() {
  const [showParagraph, setShowParagraph] = useState(false);
  const [allowToggle, setAllowToggle] = useState(false);

  console.log("App RUNNING!");

  const toggleParagraphHandler = useCallback(() => {
    // 어떤 함수가 절대 변경이 안된다면 useCallback 써도된다.
    //return setShowParagraph((prevShowParagraph) => !prevShowParagraph);

    if (allowToggle) {
      setShowParagraph((prevShowParagraph) => !prevShowParagraph);
    }
  }, [allowToggle]);

  const allowToggleHandler = () => {
    setAllowToggle(true);
  };

  return (
    <div className='app'>
      <h1>Hi there!</h1>
      <DemoOutput show={showParagraph} />
      {/* <Button onClick={allowToggleHandler}>Allow Toggling </Button> */}
      <Button onClick={toggleParagraphHandler}>Toggle Paragraph!</Button>
    </div>
  );
}

export default App;
