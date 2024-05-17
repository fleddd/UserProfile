import { onAuthStateChanged } from "firebase/auth"
import { createContext, useEffect, useState } from "react"
import { auth } from "../firebase-config"
import useLocalStorage from "../hooks/useLocalStorage"
export const AuthContext = createContext(true)

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useLocalStorage("userData", null)
  const [isUserLoggedIn, setUserLoggedIn] = useState(false)

  const uid = currentUser === null ? "" : currentUser.uid

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser)
    return unsubscribe
  }, [])

  async function initializeUser(user) {
    const email = user !== null && user.email
    const uid = user !== null && user.uid
    if (user) {
      setUserLoggedIn(true)
      setCurrentUser({ email, uid })
    } else {
      setUserLoggedIn(false)
      setCurrentUser(null)
    }
  }

  return (
    <AuthContext.Provider
      value={{ currentUser, setCurrentUser, isUserLoggedIn, uid }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
