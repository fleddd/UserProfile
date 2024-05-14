import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { SoundProvider, ThemeProvider } from "./context"

import { AppRouter } from "./routes/index.jsx"

function App() {
  return (
    <div className="flex flex-col min-h-dvh dark:bg-neutral-900">
      <SoundProvider>
        <ThemeProvider>
          <AppRouter />
        </ThemeProvider>
      </SoundProvider>

      <ToastContainer
        pauseOnHover={false}
        autoClose={3500}
        pauseOnFocusLoss={false}
      />
    </div>
  )
}

export default App
