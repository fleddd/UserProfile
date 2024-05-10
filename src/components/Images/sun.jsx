import { faSun } from "@fortawesome/free-solid-svg-icons"
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

library.add(faSun)
const Sun = () => {
  return (
    <>
      <FontAwesomeIcon
        icon="fa-sun"
        size="2xl"
        color="white"
        className="cursor-pointer"
      />
    </>
  )
}

export default Sun
