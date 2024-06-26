import success from "../assets/sounds/success.mp3"
import error from "../assets/sounds/error.m4a"
import click from "../assets/sounds/click.mp3"
import { useContext } from "react"
import { SoundContext } from "../context/SoundProvider"

function usePlaySound() {
  const { isSoundAllowed, toggleSoundAllowed } = useContext(SoundContext)
  const playSuccess = () => {
    if (!isSoundAllowed) return
    new Audio(success).play()
  }
  const playError = () => {
    if (!isSoundAllowed) return
    new Audio(error).play()
  }
  const playClick = () => {
    if (!isSoundAllowed) return
    new Audio(click).play()
  }

  return {
    playClick,
    playError,
    playSuccess,
    toggleSoundAllowed,
    isSoundAllowed,
  }
}

export default usePlaySound
