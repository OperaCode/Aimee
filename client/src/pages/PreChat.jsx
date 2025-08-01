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
    <div className="min-h-screen bg-gradient-to-br from-purple-700 to-indigo-900 flex flex-col items-center justify-start py-10 px-6">
     
      {/* Header */}
      <header className="sticky top-0 z-50 w-full backdrop-blur bg-indigo-900/50 py-4 px-6 flex justify-between items-center shadow-md border-b border-white/10">
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
        className="text-white text-4xl md:text-5xl font-extrabold text-center mt-10 mb-8"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        Choose Your Chatbot's Mood
      </motion.h1>

      {/* Search */}
      <motion.input
        type="text"
        placeholder="Search moods..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-14 w-full max-w-md px-5 py-3 rounded-xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white/10 text-white placeholder-white/60 shadow-md backdrop-blur"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      />

      {/* Mood Cards */}
      <div className="w-2/4 max-w-7xl space-y-16">
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

              <div className="grid grid-cols-1  gap-6">
                {keys.map((key) => {
                  const profile = chatbotProfiles[key];
                  return (
                    <motion.div
                      key={key}
                      variants={cardVariants}
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleMoodSelect(key)}
                      className="cursor-pointer bg-white/90 text-gray-800 hover:bg-white transition-all duration-200 rounded-2xl p-6 shadow-xl border border-white/40 backdrop-blur-lg"
                    >
                      <div className=" mx-auto mb-4 rounded-md text-4xl flex items-center justify-center font-bold shadow-inner">
                        {/* {profile.avatar} */}
                        <img src={profile.avatar} alt="" className="w-30 h-30 rounded-full" />
                      </div>
                      <h3 className="text-lg font-semibold">{profile.displayName}</h3>
                      <p className="text-sm mt-2 text-gray-600">{profile.personality}</p>
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
