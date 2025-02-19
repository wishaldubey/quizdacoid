import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { questions } from "../data/questions";
import { saveAttempt } from "../utils/db";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, XCircle } from "lucide-react";

export function Quiz() {
  // State for current question index
  const [currentQuestion, setCurrentQuestion] = useState(0);
  // State for storing user's answers
  const [answers, setAnswers] = useState<Record<number, string | number>>({});
  // State for timer
  const [timeLeft, setTimeLeft] = useState(30);
  // State to control quiz start
  const [quizStarted, setQuizStarted] = useState(false);
  // State to show feedback (correct/incorrect)
  const [showFeedback, setShowFeedback] = useState(false);
  // State for integer input field
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  // Timer effect
  useEffect(() => {
    if (!quizStarted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizStarted, currentQuestion]);

  // Start quiz handler
  const handleStartQuiz = () => {
    setQuizStarted(true);
    setTimeLeft(30);
  };

  // Answer selection handler
  const handleAnswer = (answer: string | number) => {
    if (!answers[questions[currentQuestion].id]) {
      setAnswers((prev) => ({
        ...prev,
        [questions[currentQuestion].id]: answer,
      }));
      setShowFeedback(true);
    }
  };

  // Handler for integer answers
  const handleIntegerAnswer = () => {
    if (inputValue && !answers[questions[currentQuestion].id]) {
      const numericValue = parseInt(inputValue);
      if (!isNaN(numericValue)) {
        handleAnswer(numericValue);
      }
    }
  };

  // Move to next question or finish quiz
  const handleNextQuestion = async () => {
    if (!answers[questions[currentQuestion].id]) {
      return; // Don't proceed if no answer is selected
    }

    setShowFeedback(false);
    setInputValue("");

    if (currentQuestion === questions.length - 1) {
      // Quiz finished, save attempt and navigate to scoreboard
      const score = calculateScore();
      const attempt = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        score,
        totalQuestions: questions.length,
        answers,
        timeSpent: (30 - timeLeft) * (currentQuestion + 1),
      };
      await saveAttempt(attempt);
      navigate("/scoreboard");
    } else {
      // Move to the next question
      setCurrentQuestion((prev) => prev + 1);
      setTimeLeft(30);
    }
  };

  // Calculate the quiz score
  const calculateScore = () => {
    return questions.reduce((score, question) => {
      const userAnswer = answers[question.id];
      return userAnswer === question.correctAnswer ? score + 1 : score;
    }, 0);
  };

  // Check if current answer is correct
  const isCurrentAnswerCorrect = () => {
    const currentAnswer = answers[questions[currentQuestion].id];
    return currentAnswer === questions[currentQuestion].correctAnswer;
  };

  // Initial quiz start screen
  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-8">
        {/* Animation for the quiz start screen */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-md w-full"
        >
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-black mb-4 dark:text-white"
          >
            Ready to Challenge Yourself?
          </motion.h2>
          <motion.p
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-600 dark:text-gray-300 mb-8"
          >
            You'll have 30 seconds for each question. Show us what you've got!
            🚀
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleStartQuiz}
            className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 py-4 px-6 rounded-lg font-bold text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
          >
            Start Quiz
          </motion.button>
        </motion.div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const hasAnswered = answers[question.id] !== undefined;

  // Main quiz rendering
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <div className="max-w-2xl mx-auto">
        {/* Question and answer section with animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
          >
            <div className="flex justify-between items-center mb-8">
              <motion.span
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-lg font-bold dark:text-white bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-full"
              >
                Question {currentQuestion + 1}/{questions.length}
              </motion.span>
              <motion.span
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`text-lg font-bold px-4 py-2 rounded-full ${
                  timeLeft <= 10
                    ? "bg-red-100 text-red-500 dark:bg-red-900"
                    : "bg-green-100 text-green-500 dark:bg-green-900"
                }`}
              >
                {timeLeft}s
              </motion.span>
            </div>

            <motion.h2
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-2xl font-bold mb-8 dark:text-white"
            >
              {question.text}
            </motion.h2>

            {/* Render multiple choice questions */}
            {question.type === "multiple-choice" ? (
              <div className="space-y-4">
                {question.options?.map((option, index) => (
                  <motion.button
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={!hasAnswered ? { scale: 1.02 } : {}}
                    whileTap={!hasAnswered ? { scale: 0.98 } : {}}
                    onClick={() => handleAnswer(option)}
                    disabled={hasAnswered}
                    className={`w-full p-4 text-left rounded-lg font-medium transition-all relative ${
                      answers[question.id] === option
                        ? "bg-yellow-400 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                        : "bg-gray-100 dark:bg-gray-700 dark:text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    } ${hasAnswered && "cursor-not-allowed opacity-75"}`}
                  >
                    {option}
                    {showFeedback && answers[question.id] === option && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute right-4 top-1/2 -translate-y-1/2"
                      >
                        {isCurrentAnswerCorrect() ? (
                          <CheckCircle2 className="w-6 h-6 text-green-500" />
                        ) : (
                          <XCircle className="w-6 h-6 text-red-500" />
                        )}
                      </motion.span>
                    )}
                  </motion.button>
                ))}
              </div>
            ) : (
              // Render integer input questions
              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    disabled={hasAnswered}
                    className={`w-full p-4 rounded-lg border-2 border-black dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${
                      hasAnswered ? "cursor-not-allowed opacity-75" : ""
                    }`}
                    placeholder="Enter your answer..."
                  />
                  {showFeedback && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute right-4 top-1/2 -translate-y-1/2"
                    >
                      {isCurrentAnswerCorrect() ? (
                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                      ) : (
                        <XCircle className="w-6 h-6 text-red-500" />
                      )}
                    </motion.span>
                  )}
                </div>
                {!hasAnswered && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleIntegerAnswer}
                    className="w-full bg-yellow-400 py-3 px-6 rounded-lg font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                  >
                    Submit Answer
                  </motion.button>
                )}
              </div>
            )}

            {/* Next question button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNextQuestion}
              disabled={!hasAnswered}
              className={`w-full mt-8 bg-gradient-to-r from-black to-gray-800 text-white py-4 px-6 rounded-lg font-bold text-lg shadow-[4px_4px_0px_0px_rgba(255,220,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(255,220,0,1)] transition-all duration-200 ${
                !hasAnswered ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {currentQuestion === questions.length - 1
                ? "Finish Quiz"
                : "Next Question"}
            </motion.button>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
