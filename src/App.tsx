import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Quiz } from "./pages/Quiz";
import { Scoreboard } from "./pages/Scoreboard";
import { Navigation } from "./components/Navigation";
import { ThemeToggle } from "./components/ThemeToggle";

function App() {
  // State for dark mode, initialized from localStorage or system preference
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved
      ? saved === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // Effect to apply and save the theme to localStorage
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  // Function to toggle the theme
  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    // Router for navigation
    <BrowserRouter>
      {/* Main container with dynamic background color */}
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
        {/* Theme toggle button */}
        <div className="fixed top-4 right-4 z-50">
          <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
        </div>
        {/* Routes for different pages */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/scoreboard" element={<Scoreboard />} />
        </Routes>
        {/* Navigation bar */}
        <Navigation />
      </div>
    </BrowserRouter>
  );
}

export default App;
