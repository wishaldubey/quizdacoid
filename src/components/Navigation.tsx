import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Brain, Trophy } from "lucide-react";
import { motion } from "framer-motion";

export function Navigation() {
  // Define navigation items with their respective routes, icons, and labels
  const navItems = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/quiz", icon: Brain, label: "Quiz" },
    { to: "/scoreboard", icon: Trophy, label: "Scoreboard" },
  ];

  return (
    // Navigation bar container
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-white dark:bg-gray-800 p-4 rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <ul className="flex space-x-8">
        {/* Map through the navigation items and create a list item for each */}
        {navItems.map(({ to, icon: Icon, label }) => (
          <motion.li
            key={to}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {/* NavLink for navigation with active state styling */}
            <NavLink
              to={to}
              className={({ isActive }) =>
                `flex flex-col items-center space-y-1 ${
                  isActive
                    ? "text-yellow-500 dark:text-yellow-400"
                    : "text-gray-600 dark:text-gray-300"
                }`
              }
            >
              {/* Icon for the navigation item */}
              <Icon className="w-6 h-6" />
              {/* Label for the navigation item */}
              <span className="text-xs font-bold">{label}</span>
            </NavLink>
          </motion.li>
        ))}
      </ul>
    </nav>
  );
}
