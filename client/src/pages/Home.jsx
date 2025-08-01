import React, { useState, useEffect, useRef } from "react";
import { getBotReply } from "../hooks/chatbotConfig";
import chatbotProfiles from "../hooks/chatbotProfile";
import MoodSelector from "../components/MoodSelector";

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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-indigo-950 to-black text-white">
     
 {/* Header */}
      <header className="sticky top-0 z-50 w-full backdrop-blur bg-indigo-900/50 py-4 px-6 flex justify-between items-center shadow-md border-b border-white/10">
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
          Aimee
        </h1>
        <a
          href="/pre-chat"
          className="text-white font-bold hover:text-indigo-300 transition"
        >
          ← Go Back
        </a>
      </header>

      <header className="px-4 py-5 border-b border-indigo-900 backdrop-blur-lg shadow">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-3xl font-extrabold tracking-tight">💬 ChatBot Friend</h1>
          <div className="mt-3 flex items-center gap-4">
            <div
              title={currentBot.personality}
              className={`text-5xl transition-transform duration-300 ${
                loading ? "animate-bounce" : ""
              }`}
            >
              {/* {currentBot.avatar} */}
              <img src={currentBot.avatar} alt="" className="w-20 h-20 rounded-full" />
            </div>
            <div>
              <p className="text-sm text-gray-300">{currentBot.displayName}</p>
              <select
                value={mood}
                onChange={(e) => handleMoodSelect(e.target.value)}
                className="mt-1 px-3 py-1 rounded-md bg-indigo-900 text-sm text-white border border-indigo-700 focus:outline-none focus:ring focus:ring-indigo-500"
              >
                {Object.entries(chatbotProfiles).map(([key, bot]) => (
                  <option key={key} value={key}>
                    {bot.displayName}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Chat area */}
      <main className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex flex-col max-w-[80%] ${
              msg.role === "user" ? "ml-auto items-end" : "mr-auto items-start"
            }`}
          >
            <span className="text-xs mb-1 text-indigo-300">
              {msg.role === "user" ? "You" : currentBot.displayName}
            </span>
            <div
              className={`p-4 rounded-2xl text-sm shadow-md max-w-full backdrop-blur-sm ${
                msg.role === "user"
                  ? "bg-indigo-600 text-white"
                  : "bg-white/10 border border-indigo-700 text-white"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-sm text-indigo-300 italic animate-pulse">
            <span>{currentBot.avatar}</span>
            {currentBot.displayName} is typing...
          </div>
        )}
        <div ref={chatEndRef} />
      </main>

      {/* Footer input */}
      <footer className="p-4 border-t border-indigo-800 bg-black/70 backdrop-blur-md flex gap-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 p-3 rounded-xl bg-gray-900 border border-indigo-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="bg-green-600 px-5 py-2 rounded-xl hover:bg-green-700 transition-all"
        >
          Send
        </button>
      </footer>
    </div>
  );
};

export default Home;
