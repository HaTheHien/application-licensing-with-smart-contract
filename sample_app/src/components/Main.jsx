import {useLicenseContext} from "context/LicenseContext";
import React, { useCallback, useState } from "react";
import KeyPad from "./KeyPad";
import Screen from "./Screen";

export default function Main() {
  const [result, setResult] = useState("");

  const reset = useCallback(() => {
    setResult("");
  }, []);

  const backspace = useCallback(() => {
    setResult(result.slice(0, -1));
  }, [result]);

  const calculate = useCallback(() => {
    try {
      setResult((eval(result.replace(/[^-()\d/*+.]/g, "")) || "") + "");
    } catch (e) {
      setResult("Error");
    }
  }, [result]);

  const buttonPressed = useCallback(
    (buttonName) => {
      if (buttonName === "=") calculate();
      else if (buttonName === "C") {
        reset();
      } else if (buttonName === "CE") {
        backspace();
      } else {
        setResult(result + buttonName);
      }
    },
    [backspace, calculate, reset, result]
  );

  const { havePremiumLicense } = useLicenseContext();


  return (
    <div className="App">
      {!havePremiumLicense && <h3>💎 Buy premium license to use "/" button 💎</h3>}
      <div className="calc-body">
        <Screen result={result} />
        <KeyPad buttonPressed={buttonPressed} />
      </div>
    </div>
  );
}
