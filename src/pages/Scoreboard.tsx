import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getAttempts, getAttemptById } from "../utils/db";
import { questions } from "../data/questions";
import type { QuizAttempt } from "../types";
import { ChevronDown, ChevronUp } from "lucide-react";

export function Scoreboard() {
  // State for storing the quiz attempts
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  // State for storing the selected quiz attempt to view details
  const [selectedAttempt, setSelectedAttempt] = useState<QuizAttempt | null>(
    null
  );

  // useEffect hook to load the attempts when the component mounts
  useEffect(() => {
    loadAttempts();
  }, []);

  // Function to load the quiz attempts from the database
  const loadAttempts = async () => {
    const loadedAttempts = await getAttempts();
    // Sort attempts by date in descending order
    setAttempts(
      loadedAttempts.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )
    );
  };

  // Function to handle the click on a quiz attempt
  const handleAttemptClick = async (id: string) => {
    // Collapse if clicking the same attempt, otherwise load the attempt details
    if (selectedAttempt?.id === id) {
      setSelectedAttempt(null);
    } else {
      const attempt = await getAttemptById(id);
      if (attempt) {
        setSelectedAttempt(attempt);
      }
    }
  };

  return (
    // Main container for the scoreboard page
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Title of the scoreboard with animation */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-black mb-8 text-center dark:text-white"
        >
          Scoreboard
        </motion.h1>

        {/* Grid layout for attempt history and attempt details */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Attempt History section with animation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          >
            <h2 className="text-2xl font-bold mb-4 dark:text-white">
              Attempt History
            </h2>
            <div className="space-y-4">
              {attempts.map((attempt) => (
                // Button for each attempt with animation
                <motion.button
                  key={attempt.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAttemptClick(attempt.id)}
                  className={`w-full p-4 text-left rounded-lg transition-all ${
                    selectedAttempt?.id === attempt.id
                      ? "bg-yellow-400 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                      : "bg-gray-100 dark:bg-gray-700 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  }`}
                >
                  <div className="flex justify-between items-center dark:text-white">
                    <span className="font-medium">
                      {new Date(attempt.date).toLocaleDateString()}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">
                        Score: {attempt.score}/{attempt.totalQuestions}
                      </span>
                      {selectedAttempt?.id === attempt.id ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    Time spent: {Math.round(attempt.timeSpent / 60)} minutes
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Attempt Details section with animation */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          >
            <h2 className="text-2xl font-bold mb-4 dark:text-white">
              Attempt Details
            </h2>
            <AnimatePresence mode="wait">
              {selectedAttempt ? (
                // Conditional rendering of attempt details with animation
                <motion.div
                  key={selectedAttempt.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4 overflow-hidden"
                >
                  {questions.map((question) => {
                    const userAnswer = selectedAttempt.answers[question.id];
                    const isCorrect = userAnswer === question.correctAnswer;

                    return (
                      // Question and answer details with animation
                      <motion.div
                        key={question.id}
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        className={`p-4 rounded-lg ${
                          isCorrect
                            ? "bg-green-100 dark:bg-green-900/50"
                            : "bg-red-100 dark:bg-red-900/50"
                        }`}
                      >
                        <p className="font-medium dark:text-white">
                          {question.text}
                        </p>
                        <div className="mt-2 text-sm space-y-1">
                          <p
                            className={`dark:text-gray-300 ${
                              !isCorrect && "text-red-600 dark:text-red-400"
                            }`}
                          >
                            Your answer: {userAnswer}
                          </p>
                          <p className="dark:text-gray-300">
                            Correct answer: {question.correctAnswer}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              ) : (
                // Message when no attempt is selected with animation
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-gray-600 dark:text-gray-300"
                >
                  Select an attempt to view details
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
