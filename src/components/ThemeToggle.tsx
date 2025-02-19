import React from "react";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

// Interface for ThemeToggle component props
interface ThemeToggleProps {
  isDark: boolean; // Boolean indicating whether dark mode is active
  toggleTheme: () => void; // Function to toggle the theme
}

// ThemeToggle component
export function ThemeToggle({ isDark, toggleTheme }: ThemeToggleProps) {
  return (
    // Button to toggle the theme
    <motion.button
      whileHover={{ scale: 1.1 }} // Scale up on hover
      whileTap={{ scale: 0.9 }} // Scale down on tap
      onClick={toggleTheme} // Call toggleTheme function on click
      className="fixed top-4 right-4 p-3 rounded-lg bg-yellow-400 dark:bg-blue-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
    >
      {/* Display Sun icon if dark mode is active, otherwise display Moon icon */}
      {isDark ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
    </motion.button>
  );
}
