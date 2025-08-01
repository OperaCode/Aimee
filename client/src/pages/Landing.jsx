import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { HashLink } from "react-router-hash-link";
import { Menu, X, MessageCircle, Zap, User, Rocket, Twitter, Github, Linkedin } from "lucide-react";

const Landing = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="text-white font-sans bg-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-indigo-900/20 backdrop-blur-lg shadow-lg">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
            Aimee
          </h1>
          <div className="hidden md:flex space-x-8 text-base">
            <a href="#top"  className="font-bold hover:text-indigo-300 transition-colors duration-200">
              Home
            </a>
            <a href="#features"  className="font-bold hover:text-indigo-300 transition-colors duration-200">
              Features
            </a>
            <a href="#how"  className="font-bold hover:text-indigo-300 transition-colors duration-200">
              How It Works
            </a>
            <a href="#get-started"  className="font-bold hover:text-indigo-300 transition-colors duration-200">
              Get Started
            </a>
          </div>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} className="text-indigo-300" /> : <Menu size={24} className="text-indigo-300" />}
          </button>
        </nav>
        {isMenuOpen && (
          <div className="md:hidden bg-indigo-900/90 backdrop-blur-lg px-4 py-6 space-y-4">
            <a
              href="#top"
              className="font-bold block w-full text-left hover:text-indigo-300 transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </a>
            <a
              href="#features"
              className="font-bold block w-full text-left hover:text-indigo-300 transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#how"
              className="font-bold block w-full text-left hover:text-indigo-300 transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </a>
            <a
              href="#get-started"
              className="font-bold block w-full text-left hover:text-indigo-300 transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Get Started
            </a>
          </div>
        )}
      </header>

      {/* Hero */}
      <section id="top" className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-indigo-800 via-purple-800 to-blue-800 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500 to-transparent" />
        <div className="relative z-10 animate-fade-in">
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <MessageCircle size={80} className="text-indigo-300 animate-pulse" />
              <div className="absolute inset-0 bg-indigo-400/30 rounded-full blur-xl animate-pulse" />
            </div>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 to-purple-200 mb-6">
            Welcome to Aimee
          </h2>
          <p className="text-lg sm:text-xl max-w-2xl mx-auto text-indigo-100 mb-10">
            Connect with a chatbot that matches your vibe — whether you need focus, calm, wisdom, or just some fun!
          </p>
          <Link
            to="/pre-chat"
            className="inline-block px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-full hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105"
          >
            Enter Chatroom
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-indigo-950">
        <div className="max-w-6xl mx-auto text-center space-y-12">
          <h3 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-300">
            ✨ Features
          </h3>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="p-6 bg-indigo-900/50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <MessageCircle size={40} className="text-indigo-300 mb-4 mx-auto" />
              <h4 className="text-xl font-semibold mb-2">Mood-Based Chatbots</h4>
              <p className="text-indigo-200">Choose a chatbot that adapts its tone to your mood for a personalized chat experience.</p>
            </div>
            <div className="p-6 bg-indigo-900/50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <User size={40} className="text-indigo-300 mb-4 mx-auto" />
              <h4 className="text-xl font-semibold mb-2">Custom Personalities</h4>
              <p className="text-indigo-200">Talk to creative, wise, or calming bots tailored to your needs.</p>
            </div>
            <div className="p-6 bg-indigo-900/50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <Zap size={40} className="text-indigo-300 mb-4 mx-auto" />
              <h4 className="text-xl font-semibold mb-2">Simple & Fast</h4>
              <p className="text-indigo-200">No login required — jump in and start chatting instantly!</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-tr from-purple-900 to-indigo-900">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-300 mb-12">
            ⚙️ How It Works
          </h3>
          <div className="space-y-8">
            {[
              "Click 'Enter Chatroom' to start your journey.",
              "Pick a mood or personality for your chatbot.",
              "Enjoy tailored responses in real-time.",
              "Switch moods anytime for a fresh vibe."
            ].map((step, index) => (
              <div key={index} className="flex items-center space-x-4 text-left animate-slide-in">
                <div className="flex-shrink-0 w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                  {index + 1}
                </div>
                <p className="text-indigo-100 text-lg">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section id="get-started" className="py-20 px-4 sm:px-6 lg:px-8 bg-indigo-950 flex flex-col items-center text-center">
        <h3 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-300 mb-6">
          🚀 Ready to Connect?
        </h3>
        <p className="text-indigo-200 mb-8 max-w-xl text-lg">
          Whether you need a boost, a deep chat, or just some fun, your chatbot friend is here for you.
        </p>
        <Link
          to="/pre-chat"
          className="inline-block px-10 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-full hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105"
        >
          Enter Chatroom
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-indigo-950 py-8 px-4 sm:px-6 lg:px-8 text-center text-indigo-300">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center space-x-6 mb-6">
            <a href="https://x.com/OperaFaboyinde" target="_blank" className="hover:text-indigo-100 transition-colors">
              <Twitter size={24} />
            </a>
            <a href="https://github.com/OperaCode" target="_blank" className="hover:text-indigo-100 transition-colors">
              <Github size={24} />
            </a>
            <a href="https://www.linkedin.com/in/raphael-faboyinde-a031b1195/" target="_blank" className="hover:text-indigo-100 transition-colors">
              <Linkedin size={24} />
            </a>
          </div>
          <p className="text-sm">© {new Date().getFullYear()} Aimee. Made with 💜 by Opera.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;