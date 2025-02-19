import React from "react";
import { motion } from "framer-motion";
import { Brain, Trophy, Clock, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "../components/ThemeToggle";

// Background animation variants
const backgroundVariants = {
  animate: {
    backgroundPosition: ["0% 0%", "100% 100%"],
    transition: {
      duration: 20,
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
};

// Floating animation variants for icons and title
const floatingAnimation = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Home component
export function Home() {
  return (
    // Main container with animated background gradient
    <motion.div
      className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-8 relative overflow-hidden pb-32"
      variants={backgroundVariants}
      animate="animate"
    >
      {/* Animated background elements */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-4 h-4 bg-yellow-400 rounded-full opacity-20 dark:opacity-10"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}

      {/* Main content container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto relative z-10"
      >
        {/* Title and subtitle section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="inline-block"
          >
            {/* Animated main title */}
            <motion.h1
              variants={floatingAnimation}
              animate="animate"
              className="text-7xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-pink-500 to-blue-500 dark:from-yellow-400 dark:via-pink-400 dark:to-blue-400"
            >
              QUIZ MASTER
            </motion.h1>
          </motion.div>
          {/* Animated subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl text-gray-700 dark:text-gray-300"
          >
            Challenge Your Mind, Expand Your Knowledge
          </motion.p>
        </div>

        {/* Features grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="grid md:grid-cols-3 gap-8"
        >
          {[
            {
              icon: Brain,
              title: "Challenge Yourself",
              description: "Take on various quizzes to test your knowledge",
              color: "bg-gradient-to-br from-yellow-400 to-yellow-500",
            },
            {
              icon: Clock,
              title: "Time-Based",
              description: "Complete questions within the time limit",
              color: "bg-gradient-to-br from-pink-400 to-pink-500",
            },
            {
              icon: Trophy,
              title: "Track Progress",
              description: "Monitor your scores and improvements",
              color: "bg-gradient-to-br from-blue-400 to-blue-500",
            },
          ].map((feature, index) => (
            // Feature card with icon, title and description
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              whileHover={{
                scale: 1.05,
                rotate: [-1, 1, -1, 0],
                transition: { duration: 0.3 },
              }}
              className={`${feature.color} p-8 rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200`}
            >
              <motion.div
                variants={floatingAnimation}
                animate="animate"
                className="mb-6"
              >
                <feature.icon className="w-16 h-16 text-white" />
              </motion.div>
              <h3 className="text-2xl font-bold mb-3 text-white">
                {feature.title}
              </h3>
              <p className="text-white/90 text-lg">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Start quiz button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <Link to="/quiz" className="inline-flex items-center justify-center">
            {/* Link to the quiz page */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-black text-white font-bold py-5 px-10 rounded-lg text-xl shadow-[8px_8px_0px_0px_rgba(255,220,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(255,220,0,1)] transition-all duration-200"
            >
              Start Quiz Now!
              <Sparkles className="w-6 h-6" />
            </motion.div>
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
