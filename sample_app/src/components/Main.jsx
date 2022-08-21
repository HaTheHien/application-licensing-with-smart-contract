import { useLicenseContext } from "context/LicenseContext";
import { useCallback, useState } from "react";
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
    <main>
      {!havePremiumLicense && (
        <div className="flex w-full items-center justify-center p-4 bg-green-200 mb-4 rounded-lg shadow-lg">
          <h3 className="text-center">
            💎 Buy premium license to use "/" button 💎
          </h3>
        </div>
      )}

      <div className="max-w-[400px] m-auto border-2 rounded-lg border-gray-300 shadow-lg">
        <Screen result={result} />
        <KeyPad buttonPressed={buttonPressed} />
      </div>
    </main>
  );
}
