
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setDarkMode(true);
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleDarkMode}
      className="relative p-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
      aria-label="Toggle dark mode"
    >
      <motion.div
        initial={false}
        animate={{
          rotate: darkMode ? 180 : 0,
          opacity: darkMode ? 0 : 1
        }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <FiSun className="w-5 h-5" />
      </motion.div>
      
      <motion.div
        initial={false}
        animate={{
          rotate: darkMode ? 0 : -180,
          opacity: darkMode ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <FiMoon className="w-5 h-5" />
      </motion.div>
      
      <div className="w-5 h-5 opacity-0">
        <FiSun className="w-5 h-5" />
      </div>
    </motion.button>
  );
};

export default ThemeToggle;
