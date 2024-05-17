import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { SoundProvider, ThemeProvider, AuthProvider } from "./context"

import { AppRouter } from "./routes/index.jsx"

function App() {
  return (
    <>
      <AuthProvider>
        <SoundProvider>
          <ThemeProvider>
            <AppRouter />
          </ThemeProvider>
        </SoundProvider>
      </AuthProvider>

      <ToastContainer
        pauseOnHover={false}
        autoClose={3500}
        pauseOnFocusLoss={false}
      />
    </>
  )
}

export default App
