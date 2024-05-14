import { createContext, useState, useEffect } from "react"

export const ThemeContext = createContext(false)

const ThemeProvider = ({ children }) => {
  const rootElement = document.getElementById("root")
  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem("darkTheme")
    return savedDarkMode ? JSON.parse(savedDarkMode) : false
  })
  function toggleDarkMode() {
    setDarkMode((current) => {
      localStorage.setItem("darkTheme", !darkMode)
      return !current
    })
  }
  useEffect(() => {
    darkMode
      ? rootElement.classList.add("dark")
      : rootElement.classList.remove("dark")
  }, [darkMode])

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
