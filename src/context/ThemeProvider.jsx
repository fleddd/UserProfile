import { createContext, useEffect } from "react"
import useLocalStorage from "../hooks/useLocalStorage"

export const ThemeContext = createContext(false)

const ThemeProvider = ({ children }) => {
  const rootElement = document.getElementById("root")
  const [darkMode, setDarkMode] = useLocalStorage("darkTheme", false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
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
