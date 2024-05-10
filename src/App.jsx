import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Header from "./components/header"
import Router from "./routes/router.jsx"
import { createContext, useState, useEffect } from "react"

export const ThemeContext = createContext(false)

function App() {
  const [darkMode, setDarkMode] = useState(false)
  function toggleDarkMode() {
    setDarkMode((current) => !current)
  }

  return (
    <div className={`${darkMode && "dark"}`}>
      <div
        className="flex flex-col gap-5 min-h-screen dark:bg-neutral-900"
        data-mui-color-scheme="dark"
      >
        <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
          <Header />
          <Router />
        </ThemeContext.Provider>
      </div>

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
