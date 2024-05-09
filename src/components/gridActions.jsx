import { useNavigate } from "react-router-dom"
import { Image } from "../components"
import useFirestore from "../hooks/useFirestore"
import { useState } from "react"
import { toast } from "react-toastify"
import PlaySound from "../utils/playSound"

const GridActions = ({ id }) => {
  const [deleteDialog, setDeleteDialog] = useState(false)
  const { deleteUserMutation } = useFirestore()
  const navigate = useNavigate()

  if (deleteDialog) {
    return (
      <div className="flex items-center justify-center gap-3 w-full h-full ">
        <div
          className="hover:scale-90 transition-all ease-in-out "
          onClick={() =>
            deleteUserMutation
              .mutateAsync({ id: id })
              .then(() => {
                PlaySound({ sound: "success" })
                toast.success("User was successfuly deleted!", {
                  position: "top-center",
                })
              })
              .catch((errors) => {
                PlaySound({ sound: "error" })
                toast.warn(`Something went wrong... ${errors}`, {
                  position: "top-center",
                })
                console.error(errors)
              })
          }
        >
          <Image.Accept width={30} height={30} />
        </div>
        <div
          className="hover:scale-90 transition-all ease-in-out "
          onClick={() => {
            setDeleteDialog((prev) => !prev)
            PlaySound({ sound: "click" })
          }}
        >
          <Image.Cancel width={30} height={30} />
        </div>
      </div>
    )
  }

  return (
    <div className="flex w-full h-full gap-3 justify-center items-center">
      <div
        className="hover:scale-90 transition-all ease-in-out "
        onClick={() => {
          PlaySound({ sound: "click" })
          navigate(`/list/${id}`)
        }}
      >
        <Image.View width={30} height={30} />
      </div>
      <div
        className="hover:scale-90 transition-all ease-in-out "
        onClick={() => {
          PlaySound({ sound: "click" })
          setDeleteDialog((prev) => !prev)
        }}
      >
        <Image.DeleteIcon width={30} height={30} />
      </div>
    </div>
  )
}

export default GridActions
