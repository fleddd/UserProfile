import Image from "../../assets/images/screen-2.png"
import ImageDark from "../../assets/images/screenDark-1.png"
import useTheme from "../../hooks/useTheme"

const Homepage2 = () => {
  const { darkMode } = useTheme()
  return <img src={darkMode ? ImageDark : Image} width={881} />
}
export default Homepage2
