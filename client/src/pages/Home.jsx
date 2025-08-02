import React, { useState, useEffect, useRef } from "react";
import { getBotReply } from "../hooks/chatbotConfig";
import chatbotProfiles from "../hooks/chatbotProfile";
import MoodSelector from "../components/MoodSelector";
import { p } from "framer-motion/client";

const Home = () => {
  const [mood, setMood] = useState("");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    const storedMood = localStorage.getItem("userMood");
    if (storedMood) setMood(storedMood);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleMoodSelect = (selectedMood) => {
    setMood(selectedMood);
    localStorage.setItem("userMood", selectedMood);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");
    setLoading(true);

    try {
      const botReply = await getBotReply(input, mood || "neutral");
      const replyMsg = { role: "assistant", content: botReply };
      setMessages((prev) => [...prev, replyMsg]);
    } catch (err) {
      alert("Failed to get response.");
    } finally {
      setLoading(false);
    }
  };

  if (!mood) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-800 to-indigo-900 flex items-center justify-center">
        <MoodSelector onSelect={handleMoodSelect} />
      </div>
    );
  }

  const currentBot = chatbotProfiles[mood] || {
    avatar: "🤖",
    displayName: "Bot",
    personality: "Friendly assistant",
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-black text-white">

      {/* Top Header */}
      <header className="sticky top-0 z-40 w-full backdrop-blur bg-indigo-900/50 border-b border-indigo-700 shadow-sm px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* <img src={currentBot.avatar} alt="Bot Avatar" className="w-12 h-12 rounded-full border-2 border-indigo-400 shadow-md" /> */}
          <p className=" text-4xl rounded-full border-2 border-indigo-400 shadow-md">{currentBot.avatar}</p>
          <div>
            <h2 className="text-xl font-bold text-indigo-100">{currentBot.displayName}</h2>
            <select
              value={mood}
              onChange={(e) => handleMoodSelect(e.target.value)}
              className="mt-1 text-sm bg-indigo-800 px-2 py-1 rounded-md border border-indigo-600 focus:outline-none"
            >
              {Object.entries(chatbotProfiles).map(([key, bot]) => (
                <option key={key} value={key}>
                  {bot.displayName}
                </option>
              ))}
            </select>
          </div>
        </div>
        <a href="/pre-chat" className="text-indigo-300 hover:underline font-medium text-sm">← Go Back</a>
      </header>

      {/* Chat History */}
      <main className="flex-1 px-4 py-6 overflow-y-auto space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div className="relative max-w-[80%] sm:max-w-[70%] md:max-w-[60%]">
              {msg.role !== "user" && (
                // <img
                //   src={currentBot.avatar}
                //   alt="bot avatar"
                //   className="absolute -left-10 top-1 w-8 h-8 rounded-full border border-indigo-500 shadow-md hidden sm:block"
                // />
                <p> {currentBot.avatar}</p>
              )}
              <div
                className={`p-4 rounded-2xl shadow-md text-sm whitespace-pre-wrap ${
                  msg.role === "user"
                    ? "bg-indigo-600 text-white rounded-br-none"
                    : "bg-white/10 border border-indigo-700 text-white rounded-bl-none"
                }`}
              >
                <span className="block mb-1 text-xs text-indigo-300 font-medium">
                  {msg.role === "user" ? "You" : currentBot.displayName}
                </span>
                {msg.content}
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="text-sm italic text-indigo-300 animate-pulse flex items-center gap-2">
            <img src={currentBot.avatar} className="w-6 h-6 rounded-full" />
            {currentBot.displayName} is typing...
          </div>
        )}
        <div ref={chatEndRef} />
      </main>

      {/* Chat Input */}
      <footer className="p-4 border-t border-indigo-800 bg-black/70 backdrop-blur-md flex items-center gap-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
          className="flex-1 p-3 rounded-xl bg-gray-900 border border-indigo-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          onClick={sendMessage}
          className="bg-green-600 hover:bg-green-700 px-5 py-2 rounded-xl font-semibold transition"
        >
          Send
        </button>
      </footer>
    </div>
  );
};

export default Home;
