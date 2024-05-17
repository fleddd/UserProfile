import { toast } from "react-toastify"
import usePlaySound from "./usePlaySound"

const useNotification = () => {
  const { playSuccess, playError, playClick } = usePlaySound()
  const Success = (text) => {
    toast.success(text, { position: "top-center" })
    playSuccess()
  }
  const Error = (text) => {
    toast.error(text, { position: "top-center" })
    playError()
  }
  const Warn = (text) => {
    toast.warn(text, { position: "top-center" })
    playClick()
  }

  return { Success, Warn, Error }
}

export default useNotification
