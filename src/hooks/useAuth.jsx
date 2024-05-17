import { useContext } from "react"
import { AuthContext } from "../context/AuthProvider"
import { loginUser, signupUser } from "../services/api"
import { useMutation } from "@tanstack/react-query"
import { signOut } from "firebase/auth"
import { auth } from "../firebase-config"

const useAuth = () => {
  const { currentUser, setCurrentUser, isUserLoggedIn, uid } =
    useContext(AuthContext)
  const signupUserMutation = useMutation({
    mutationFn: signupUser,
  })
  const loginUserMutation = useMutation({
    mutationFn: loginUser,
  })
  const signOutUser = () => {
    signOut(auth)
    setCurrentUser(null)
  }

  return {
    currentUser,
    setCurrentUser,
    signupUserMutation,
    loginUserMutation,
    signOutUser,
    isUserLoggedIn,
    uid,
  }
}

export default useAuth
