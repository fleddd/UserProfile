import { createContext, useState } from "react"
import useLocalStorage from "../hooks/useLocalStorage"
export const SoundContext = createContext(true)

const SoundProvider = ({ children }) => {
  const [isSoundAllowed, setIsSoundAllowed] = useLocalStorage("sounds", true)
  const toggleSoundAllowed = () => {
    setIsSoundAllowed(!isSoundAllowed)
  }
  return (
    <SoundContext.Provider value={{ isSoundAllowed, toggleSoundAllowed }}>
      {children}
    </SoundContext.Provider>
  )
}

export default SoundProvider
