import { createContext, useState } from "react"
export const SoundContext = createContext(true)

const SoundProvider = ({ children }) => {
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
  return (
    <SoundContext.Provider value={{ isSoundAllowed, toggleSoundAllowed }}>
      {children}
    </SoundContext.Provider>
  )
}

export default SoundProvider
