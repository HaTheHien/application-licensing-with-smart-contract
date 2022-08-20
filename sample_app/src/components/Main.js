import React, { useState } from "react";
import KeyPad from "./KeyPad";
import Screen from "./Screen";

export default function Main() {
  const [result, setResult] = useState("");

  const buttonPressed = (buttonName) => {
    if (buttonName === "=") calculate();
    else if (buttonName === "C") {
      reset();
    } else if (buttonName === "CE") {
      backspace();
    } else {
      setResult(result + buttonName);
    }
  };

  const reset = () => {
    setResult("");
  };

  const backspace = () => {
    setResult(result.slice(0, -1));
  };
  const calculate = () => {
    try {
      setResult((eval(result.replace(/[^-()\d/*+.]/g, '')) || "") + "");
    } catch (e) {
      setResult("Error");
    }
  };
  return (
    <div className="App">
      <div className="calc-body">
        <Screen result={result} />
        <KeyPad buttonPressed={buttonPressed} />
      </div>
    </div>
  );
}
