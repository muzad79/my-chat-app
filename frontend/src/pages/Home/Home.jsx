import React, { useState, useEffect } from "react";
import SideBar from "../../components/sidebar/SideBar";
import MessageContainer from "../../components/messages/MessageContainer";
import useConversation from "../../zustand/useConversation";
import { IoMdArrowBack } from "react-icons/io";

const Home = () => {
  const { selectedConversation } = useConversation();
  const [isMessageView, setIsMessageView] = useState(false);

  useEffect(() => {
    // Set the initial view based on whether a conversation is selected
    setIsMessageView(!!selectedConversation);
  }, [selectedConversation]);

  const handleBackClick = () => {
    setIsMessageView(false);
  };

  return (
    <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      {/* SideBar: Visible if no conversation is selected or on larger screens */}
      <div className={`flex h-[450px] sm:h-[450px] md:h-[550px] ${isMessageView ? "hidden md:flex" : ""}`}>
        <SideBar />
      </div>

      {/* MessageContainer: Visible if a conversation is selected */}
      <div className={`h-[450px] sm:h-[450px] md:h-[550px]  ${isMessageView ? "flex" : "hidden md:flex"} gap-2 justify-center`}>
        <button className={`btn btn-ghost btn-xs bg-slate-500 md:hidden`} onClick={handleBackClick}>
          <IoMdArrowBack />
        </button>
        <MessageContainer />
      </div>
    </div>
  );
};

export default Home;
