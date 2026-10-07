import React from "react";
import { ArrowLeft, Send, Plane } from "lucide-react";

const TravelChat = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col md:flex-row overflow-hidden">
      {/* Left Pane - Chat Section */}
      <div className="w-full md:w-[55%] lg:w-[50%] h-full flex flex-col bg-[#F9FAFB]">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 bg-white border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="font-extrabold text-3xl tracking-tighter flex items-center gap-1 text-black font-[Unbounded]">
              <Plane size={32} className="transform -rotate-45" />
              <span>Travel</span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors text-sm font-medium"
          >
            <ArrowLeft size={20} />
            Back to Home
          </button>
        </div>

        {/* Chat Area with Custom Scrollbar */}
        <div className="flex-grow overflow-y-auto p-8 space-y-8 bg-[#F3F4F6] custom-chat-scrollbar">
          {/* AI Message - Grey */}
          <div className="flex justify-start">
            <div className="w-[85%] md:w-[70%] lg:w-[60%] bg-[#DEDEDE] rounded-[10px] p-8 min-h-[160px] shadow-sm"></div>
          </div>

          {/* User Message - Blue */}
          <div className="flex justify-end">
            <div className="w-[75%] md:w-[60%] lg:w-[50%] bg-[#5B9BD5] rounded-[10px] p-6 min-h-[100px] shadow-sm"></div>
          </div>

          {/* AI Message - Grey */}
          <div className="flex justify-start">
            <div className="w-[85%] md:w-[70%] lg:w-[60%] bg-[#DEDEDE] rounded-[10px] p-8 h-[240px] shadow-sm"></div>
          </div>
        </div>

        {/* Input Area */}
        <div className="p-8 bg-[#F3F4F6]">
          <div className="relative flex items-center bg-white border border-gray-300 rounded-[15px] p-1 shadow-sm">
            <input 
              type="text"
              placeholder="Ask Anything"
              className="w-full bg-transparent py-4 px-6 focus:outline-none placeholder:text-gray-400 text-base font-normal"
            />
            <button className="bg-[#005fad] text-white p-3.5 rounded-full hover:bg-blue-700 transition-all shadow-md ml-2 m-1">
              <Send size={22} fill="white" />
            </button>
          </div>
        </div>

        <style jsx>{`
          .custom-chat-scrollbar::-webkit-scrollbar {
            width: 20px;
          }
          .custom-chat-scrollbar::-webkit-scrollbar-track {
            background: #F3F4F6;
          }
          .custom-chat-scrollbar::-webkit-scrollbar-thumb {
            background: #C1C1C1;
            border: 4px solid #F3F4F6;
            border-radius: 10px;
          }
          .custom-chat-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #A8A8A8;
          }
        `}</style>
      </div>

      {/* Right Pane - Visual Section */}
      <div className="hidden md:block flex-grow relative bg-white overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center h-full w-full rounded-tl-3xl rounded-bl-3xl lg:rounded-tl-[40px] lg:rounded-bl-[40px]"
          style={{ 
            backgroundImage: `url('https://images.pexels.com/photos/28896142/pexels-photo-28896142.jpeg?auto=compress&cs=tinysrgb&w=3840&q=100')`
          }}
        >
          {/* Dark Overlay for Text Readability */}
          <div className="absolute inset-0 bg-black/30 rounded-tl-3xl rounded-bl-3xl lg:rounded-tl-[40px] lg:rounded-bl-[40px]"></div>

          {/* Content */}
          <div className="relative h-full flex flex-col items-center justify-center text-center px-12">
            <h2 className="text-white text-5xl lg:text-7xl font-bold mb-6 font-serif tracking-tight drop-shadow-xl">
              Your Personal Travel AI Agent
            </h2>
            <p className="text-white text-xl lg:text-2xl font-bold max-w-lg leading-relaxed drop-shadow-lg">
              Got a vacation coming up? Start here by asking me anything about it.
            </p>

            {/* Bottom Arrow Graphic */}
            <div className="absolute bottom-16 w-full flex justify-center items-center gap-4 px-10">
               <div className="w-1/2 h-[1px] bg-white opacity-60"></div>
               <ArrowLeft className="text-white" size={32} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelChat;
