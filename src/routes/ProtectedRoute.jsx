import { useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import { useEffect } from "react"
import { toast } from "react-toastify"

const ProtectedRoute = ({ children }) => {
  const { currentUser, isUserLoggedIn } = useAuth()
  const navigate = useNavigate()
  useEffect(() => {
    if (currentUser === null) {
      navigate("/UserProfile/auth", { replace: true })
    }
  }, [currentUser, isUserLoggedIn, navigate])

  return <>{children}</>
}

export default ProtectedRoute
