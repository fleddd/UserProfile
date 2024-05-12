import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Header from "./components/header"
import Router from "./routes/router.jsx"
import { createContext, useState, useEffect } from "react"

export const ThemeContext = createContext(false)
export const SoundContext = createContext(true)

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem("darkTheme")
    return savedDarkMode ? JSON.parse(savedDarkMode) : false
  })
  const [isSoundAllowed, setIsSoundAllowed] = useState(() => {
    const savedIsAllowedSounds = localStorage.getItem("sounds")
    return savedIsAllowedSounds ? JSON.parse(savedIsAllowedSounds) : true
  })
  const toggleSoundAllowed = () => {
    setIsSoundAllowed((current) => {
      localStorage.setItem("sounds", !isSoundAllowed)
      return !current
    })
  }

  function toggleDarkMode() {
    setDarkMode((current) => {
      localStorage.setItem("darkTheme", !darkMode)
      return !current
    })
  }
  useEffect(() => {
    const rootElement = document.getElementById("root")
    darkMode
      ? rootElement.classList.add("dark")
      : rootElement.classList.remove("dark")
  }, [darkMode])

  return (
    <div className="flex flex-col gap-5 min-h-screen dark:bg-neutral-900">
      <SoundContext.Provider value={{ isSoundAllowed, toggleSoundAllowed }}>
        <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
          <Header />
          <Router />
        </ThemeContext.Provider>
      </SoundContext.Provider>

      <ToastContainer
        darkMode={darkMode}
        pauseOnHover={false}
        autoClose={3500}
        pauseOnFocusLoss={true}
      />
    </div>
  )
}

export default App
