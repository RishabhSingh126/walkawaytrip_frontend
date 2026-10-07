import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import aiChatBg from "@/assets/image/AiChat/image.png";

const TravelAIChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() === "") return;
    setMessages([...messages, { text: input, sender: "user" }]);
    setInput("");

    // Simulating AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: "I'm here to help with your travel!", sender: "ai" },
      ]);
    }, 1000);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full">
      {/* Chat Section */}
      <div className="md:w-1/2 w-full flex flex-col border-r bg-gray-100 p-4">
        <div className="flex items-center justify-between pb-2 border-b">
          <h2 className="text-lg font-semibold">Travel AI Chat</h2>
        </div>
        {/* Chat Messages */}
        <div className="flex-1 overflow-auto p-4 space-y-4 flex flex-col">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
            >
              <div
                className={`p-3 rounded-xl ${msg.sender === "user"
                  ? "bg-[#5095d0] text-white text-right w-auto max-w-xs"
                  : "bg-[#d9d9d9] text-black text-left w-auto max-w-xs"
                  }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <div className="flex items-center border-t p-2">
          <input
            type="text"
            className="flex-1 p-2 border rounded-lg outline-none"
            placeholder="Ask Anything"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            onClick={handleSend}
            className="ml-2 bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
          >
            <FaPaperPlane />
          </button>
        </div>
      </div>

      {/* AI Section */}
      <div
        className="md:w-1/2 w-full flex flex-col items-center bg-cover bg-center text-white p-8 min-h-screen"
        style={{ backgroundImage: `url(${aiChatBg})` }}
      >
        <h1 className="text-[25px] md:text-[50px] font-bold text-center font-[Inknut_Antiqua] pt-[91px] md:pt-[183px]">
          Your Personal Travel AI Agent
        </h1>
        <p className="text-lg text-center mt-2 pt-[50px]">
          Got a vacation coming up? Start here by asking me anything about it.
        </p>
        <img src="/assets/image/AiChat/Arrow.png" className="pt-[90px] md:pt-[180px]" />
      </div>
    </div>
  );
};

export default TravelAIChat;
