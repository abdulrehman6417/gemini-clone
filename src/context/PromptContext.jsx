import { createContext, useState } from "react";
import run from "../config/gemini_api";

export const PromptContext = createContext();

const ContextProvider = ({ children }) => {
  const [inputValue, setInputValue] = useState("");
  const [currentPrompt, setCurrentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState("");

  const delayedText = (index, nextWord) => {
    setTimeout(() => {
      setResult((prev) => prev + nextWord);
    }, 75 * index);
  };

  const onPromptSent = async (prompt) => {
    setResult("");
    setLoading(true);
    setShowResult(true);
    let message;
    if (prompt !== undefined) {
      setCurrentPrompt(prompt);
      message = await run(prompt);
    } else {
      setCurrentPrompt(inputValue);
      setPrevPrompts((prev) => [...prev, inputValue]);
      message = await run(inputValue);
    }

    let splitMessage = message.split("**");
    let finalText;

    for (let i = 0; i < splitMessage.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        finalText += splitMessage[i];
      } else {
        finalText += "<b>" + splitMessage[i] + "</b>";
      }
    }

    let finalText2 = finalText.split("*").join("</br>");
    let finalText3 = finalText2.split(":").join(":</br>");
    let finalText4 = finalText3.split("undefined").join("");

    let completeFinalText = finalText4.split(" ");

    for (let i = 0; i < completeFinalText.length; i++) {
      const nextWord = completeFinalText[i];
      delayedText(i, nextWord + " ");
    }

    setInputValue("");

    setLoading(false);
  };

  const contextValue = {
    inputValue,
    setInputValue,
    currentPrompt,
    setCurrentPrompt,
    prevPrompts,
    setPrevPrompts,
    loading,
    setLoading,
    showResult,
    setShowResult,
    result,
    setResult,
    onPromptSent,
  };

  return (
    <PromptContext.Provider value={contextValue}>
      {children}
    </PromptContext.Provider>
  );
};

export default ContextProvider;
