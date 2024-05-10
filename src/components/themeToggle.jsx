import { ThemeContext } from "../App"
import { useContext } from "react"
import { Image } from "."

const ThemeToggle = () => {
  function onClickHandle() {
    toggleDarkMode()
  }
  // LIGHT
  // background #ffffff
  // primary #3B82F6
  // secondary #1e40af
  // white #ffffff

  // Dark
  // background #131414
  // primary #1a1d21
  // secondary #131414
  // white #ffffff
  const { darkMode, toggleDarkMode } = useContext(ThemeContext)
  return (
    <div
      className="hover:translate-y-[-1px] transition-all ease-in-out text-blue-800"
      onClick={onClickHandle}
    >
      {darkMode ? <Image.Night /> : <Image.Sun />}
    </div>
  )
}

export default ThemeToggle
