import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { toast } from "react-toastify"

import usePlaySound from "../../hooks/usePlaySound"
import useFirestore from "../../hooks/useFirestore"

import { Image } from "../../components"
import useAuth from "../../hooks/useAuth"

const GridActions = ({ id }) => {
  const { uid } = useAuth()
  const [deleteDialog, setDeleteDialog] = useState(false)
  const { deleteUserMutation } = useFirestore()
  const navigate = useNavigate()
  const { playSuccess, playError, playClick } = usePlaySound()

  if (deleteDialog) {
    return (
      <div className="flex items-center justify-center gap-3 w-full h-full ">
        <div
          className="hover:scale-90 transition-all ease-in-out "
          onClick={() =>
            deleteUserMutation
              .mutateAsync({ id: id, uid: uid })
              .then(() => {
                playSuccess()
                toast.success("User was successfuly deleted!", {
                  position: "top-center",
                })
              })
              .catch((errors) => {
                playError()
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
            playClick()
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
          playClick()
          navigate(`/list/${id}`)
        }}
      >
        <Image.View width={30} height={30} />
      </div>
      <div
        className="hover:scale-90 transition-all ease-in-out "
        onClick={() => {
          playClick()
          setDeleteDialog((prev) => !prev)
        }}
      >
        <Image.DeleteIcon width={30} height={30} />
      </div>
    </div>
  )
}

export default GridActions
