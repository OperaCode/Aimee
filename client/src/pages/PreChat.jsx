import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import chatbotProfiles from "../hooks/chatbotProfile";

const PreChat = () => {
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState("happy"); 
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleStartChat = () => {
    localStorage.setItem("userMood", selectedMood);
    localStorage.removeItem("chatHistory"); 
    navigate("/home");
  };

  const personalityKeys = Object.keys(chatbotProfiles);
  const selectedProfile = chatbotProfiles[selectedMood];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 via-indigo-900 to-black flex flex-col items-center px-4 py-10 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full backdrop-blur bg-indigo-900/60 py-4 px-6 flex justify-between items-center border-b border-white/10">
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
          Aimee
        </h1>
        <a
          href="/"
          className="text-white font-bold hover:text-indigo-300 transition"
        >
          ← Go Back
        </a>
      </header>

      {/* Title */}
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold text-center mt-12 mb-4"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        Who's your Aimee today?
      </motion.h1>
      <p className="text-lg text-center text-indigo-200 mb-10">
        Pick a mood that matches your vibe
      </p>

      {/* Spotlight Card */}
      <motion.div
        className="bg-white text-gray-900 rounded-3xl shadow-2xl overflow-hidden w-full max-w-2xl transition-all duration-500"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <p className="w-full text-6xl md:text-8xl text-center p-3 object-cover">
          {selectedProfile.avatar}
        </p>
        <div className="p-6 text-center space-y-2">
          <h2 className="text-3xl font-bold">{selectedProfile.displayName}</h2>
          <p className="text-gray-600 text-sm">{selectedProfile.personality}</p>
          <button
            onClick={handleStartChat}
            className="mt-4 px-6 py-2 bg-indigo-700 text-white rounded-full hover:bg-indigo-800 transition"
          >
            Start Chat
          </button>
        </div>
      </motion.div>

      {/* Mini Mood Selector */}
      <div className="mt-10 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
        {personalityKeys.map((key) => {
          const profile = chatbotProfiles[key];
          return (
            <motion.div
              key={key}
              onClick={() => setSelectedMood(key)}
              className={`cursor-pointer p-4 rounded-xl overflow-hidden shadow-lg border-2 transition bg-white  ${
                selectedMood === key
                  ? "border-white scale-105"
                  : "border-transparent"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
             
              <div className="m-auto text-center py-auto">
                <h3 className="text-3xl">{profile.avatar}</h3>
                <h4 className="text-black font-semibold">{profile.name}</h4>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default PreChat;
