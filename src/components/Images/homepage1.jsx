import Image from "../../assets/images/screen-1.png"
import ImageDark from "../../assets/images/screenDark-2.png"
import useTheme from "../../hooks/useTheme"

const Homepage1 = () => {
  const { darkMode } = useTheme()
  return <img src={darkMode ? ImageDark : Image} width={550} />
}
export default Homepage1
