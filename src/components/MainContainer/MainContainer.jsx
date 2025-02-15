import React, { useContext, useEffect, useRef } from "react";
import { FaCaretDown } from "react-icons/fa";
import { assets } from "../../assets/assets";
import "./MainContainer.css";
import { LuImagePlus } from "react-icons/lu";
import { FaMicrophone } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { PromptContext } from "../../context/PromptContext";

const MainContainer = () => {
  const {
    onPromptSent,
    inputValue,
    setInputValue,
    showResult,
    currentPrompt,
    result,
    loading,
  } = useContext(PromptContext);

  const resultRef = useRef(null);

  useEffect(() => {
    if (resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [result]);

  return (
    <div className="min-h-screen bg-[#1B1C1D] grow">
      <div className="nav">
        <p className="flex items-center gap-4 text-white text-xl">
          Gemini <span>{<FaCaretDown fontSize="14px" />}</span>
        </p>
        <img src={assets.user} alt="" className="w-9 h-9 rounded-full" />
      </div>
      <div className="main-middle-section ">
        {!showResult ? (
          <>
            <div className="greeting">
              <span>Hello, AbdulRehman</span>
            </div>
          </>
        ) : (
          <div className="result flex flex-col gap-9 ">
            <div className="result-title flex items-center gap-3 text-[#d3d1d1] justify-end">
              <img src={assets.user} alt="" className="w-9 h-9 rounded-full" />
              <p className="text-lg font-medium">{currentPrompt}</p>
            </div>

            <div className="result-data flex gap-3 items-start">
              <img
                src={assets.gemini_icon}
                alt=""
                className="w-9 h-9 rounded-full"
              />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p
                  className="text-[#d3d1d1] text-justify text-lg leading-8"
                  dangerouslySetInnerHTML={{ __html: result }}
                  ref={resultRef}
                ></p>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="main-bottom">
        <div className="input-box">
          <div className="flex gap-3  w-full">
            <div className="image-box">
              <LuImagePlus fontSize="1.4rem" />
            </div>
            <input
              className="input-field w-full"
              type="text"
              placeholder="Ask Gemini"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") onPromptSent();
              }}
            />
          </div>
          <div className="flex gap-2 ">
            <div className="image-box">
              <FaMicrophone fontSize="1.4rem" />
            </div>
            <div className="image-box">
              <IoSend fontSize="1.3rem" onClick={onPromptSent} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
