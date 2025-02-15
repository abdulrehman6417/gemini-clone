import React, { useContext, useState } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { MdOutlineChatBubbleOutline } from "react-icons/md";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { LuHistory } from "react-icons/lu";
import { LuSettings } from "react-icons/lu";
import { FaPlus } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";
import { PromptContext } from "../../context/PromptContext";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    prevPrompts,
    setCurrentPrompt,
    onPromptSent,
    setLoading,
    setShowResult,
  } = useContext(PromptContext);

  const onPromptLoad = async (prompt) => {
    setCurrentPrompt(prompt);
    await onPromptSent(prompt);
  };

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  };

  return (
    <div className="sidebar">
      <div className="top">
        <IoMenu
          onClick={() => setIsOpen((prev) => !prev)}
          className="menu "
          fontSize="1.4rem"
          color="#b4b3b3"
        />
        <div onClick={newChat} className="new-chat cursor-pointer">
          <FaPlus fontSize="1.2rem" />
          {isOpen ? <p>New Chat</p> : null}
        </div>
        {isOpen ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.map((prompt, index) => (
              <div onClick={() => onPromptLoad(prompt)} className="recent-chat">
                <MdOutlineChatBubbleOutline fontSize="1.2rem" />
                <p className="min-w-[110px]">{prompt.slice(0, 20)}...</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-chat">
          <IoMdHelpCircleOutline fontSize="1.5rem" />
          {isOpen ? <p>Help</p> : null}
        </div>
        <div className="bottom-item recent-chat">
          <LuHistory fontSize="1.5rem" />

          {isOpen ? <p>Activity</p> : null}
        </div>
        <div className="bottom-item recent-chat">
          <LuSettings fontSize="1.5rem" />

          {isOpen ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
