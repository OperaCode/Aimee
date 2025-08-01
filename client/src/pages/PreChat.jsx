import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import chatbotProfiles from "../hooks/chatbotProfile";

const groupedProfiles = {
  "Mood Boosters": ["happy", "calm"],
  "Productivity & Focus": ["focused", "neutral"],
  "Wisdom & Creativity": ["wise", "creative"],
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const PreChat = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMoodSelect = (mood) => {
    localStorage.setItem("userMood", mood);
    navigate("/home");
  };

  const filteredGroupedProfiles = Object.fromEntries(
    Object.entries(groupedProfiles).map(([groupName, keys]) => [
      groupName,
      keys.filter((key) =>
        chatbotProfiles[key].displayName
          .toLowerCase()
          .includes(search.toLowerCase())
      ),
    ])
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 to-indigo-800 flex flex-col items-center justify-start py-16 px-6">
      <motion.h1
        className="text-white text-4xl md:text-5xl font-extrabold text-center mb-8"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        Choose Your Chatbot's Mood
      </motion.h1>

      <motion.input
        type="text"
        placeholder="Search moods..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-12 w-full max-w-md px-5 py-3 rounded-xl border border-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white/20 text-white placeholder-white/70"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      />

      <div className="w-full max-w-7xl space-y-14">
        {Object.entries(filteredGroupedProfiles).map(([groupName, keys], index) =>
          keys.length > 0 ? (
            <motion.div
              key={groupName}
              initial="hidden"
              animate={mounted ? "visible" : "hidden"}
              variants={containerVariants}
            >
              <motion.h2
                className="text-2xl md:text-3xl font-bold text-white mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {groupName}
              </motion.h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {keys.map((key) => {
                  const profile = chatbotProfiles[key];
                  return (
                    <motion.div
                      key={key}
                      variants={cardVariants}
                      onClick={() => handleMoodSelect(key)}
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.98 }}
                      className="cursor-pointer bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg p-6 text-center border border-indigo-300 hover:shadow-2xl transition-all"
                    >
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-indigo-100 text-indigo-600 text-4xl flex items-center justify-center font-bold shadow">
                        {profile.avatar}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {profile.displayName}
                      </h3>
                      <p className="text-sm text-gray-600 mt-2 leading-snug">
                        {profile.personality}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default PreChat;
