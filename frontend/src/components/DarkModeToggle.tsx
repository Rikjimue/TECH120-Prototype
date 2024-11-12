import { useEffect, useState } from 'react';

function DarkModeToggle() {
  // State to store if dark mode is enabled
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check localStorage for saved theme on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.body.classList.add("dark");
    }
  }, []);

  // Toggle the theme and save to localStorage
  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setIsDarkMode(!isDarkMode);
  };

  return (
    <button
  onClick={toggleDarkMode}
  className="p-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full focus:outline-none transition-colors duration-200"
  aria-label="Toggle Dark Mode">
  {isDarkMode ? '🔆' : '🌙'}
    </button>
  );
}

export default DarkModeToggle;
