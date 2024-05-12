import { useParams, Link } from "react-router-dom"
import { useState } from "react"
import { useForm } from "react-hook-form"
import Button from "../components/button"
import { motion } from "framer-motion"
import { toast } from "react-toastify"
import { formSchema } from "../utils/formSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import InputForm from "../components/InputForm"
import LoadingSpinner from "../components/loadingSpinner"
import useGetUserByID from "../hooks/useGetUserByID"
import fetchUserByID from "../services/api"
import defaultAvatar from "../assets/images/defaultLogo.png"
import useFirestore from "../hooks/useFirestore"
import usePlaySound from "../hooks/usePlaySound"

const EditPage = () => {
  const { id } = useParams()
  const { user, isLoading } = useGetUserByID(id)
  const { editUserMutation } = useFirestore()
  const [isEditable, setIsEditable] = useState(false)
  const { playSuccess, playError, playClick } = usePlaySound()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: async () => fetchUserByID(id),
  })

  async function onSubmitSave(data) {
    editUserMutation
      .mutateAsync({
        updatedData: data,
        id: id,
      })
      .then(() => {
        playSuccess()
        toast.success("Data was successfuly updated!", {
          position: "top-center",
          duration: 1000,
        })
        setIsEditable(false)
      })
      .catch((error) => {
        playError()
        toast.error("Data wasnt updated")
        console.error(error)
      })
  }

  if (isLoading) {
    return <LoadingSpinner />
  }
  if (errors) {
  }

  return (
    <main className="flex items-center justify-center">
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
          transition: {
            duration: 0.5,
          },
        }}
        key={user?.id}
        className={`border-2 border-blue-800 md:max-w-1300px flex flex-col justify-between text-black text-xl rounded-2xl p-5 shadow-md dark:border-neutral-700 dark:text-white`}
      >
        <form
          className="flex flex-col gap-5  md:grid md:grid-cols-[200px_minmax(320px,_1fr)_100px] px-4"
          action="POST"
          onSubmit={handleSubmit(onSubmitSave)}
        >
          <div className="max-w-[300px]  max-h-[300px] m-auto flex flex-col items-center">
            <label
              htmlFor="avatarImage"
              className="text-blue-800 font-bold text-base dark:text-white"
            >
              User image
            </label>
            <img
              id="avatarImage"
              src={user?.image || defaultAvatar}
              width={150}
              height={150}
              className="rounded-md max-h-[300px] mb-[4px]"
            />
          </div>
          <div>
            <div className="flex flex-col gap-[2px]">
              <p className="text-blue-800 dark:text-white font-bold text-base">
                First name:
              </p>
              <InputForm
                {...register(`firstName`)}
                errorMessage={errors?.firstName?.message}
                readOnly={!isEditable}
              />

              <p className="text-blue-800 dark:text-white font-bold text-base">
                Middle name:
              </p>
              <InputForm
                {...register(`middleName`)}
                readOnly={!isEditable}
                errorMessage={errors?.middleName?.message}
              />

              <p className="text-blue-800 dark:text-white font-bold text-base">
                Last name:
              </p>
              <InputForm
                {...register(`lastName`)}
                readOnly={!isEditable}
                errorMessage={errors?.lastName?.message}
              />

              <p className="text-blue-800 dark:text-white font-bold text-base">
                Birth date:
              </p>
              <InputForm
                {...register(`date`)}
                type={"date"}
                max={"2006-01-01"}
                disabled={!isEditable}
                errorMessage={errors?.date?.message}
              />

              <p className="text-blue-800 dark:text-white font-bold text-base">
                Role:
              </p>
              <select
                disabled={!isEditable}
                {...register(`role`)}
                className="focus:outline-none border-2 border-blue-800 dark:border-neutral-700 dark:text-white  w-[300px] px-2 py-2 rounded-md overflow-hidden bg-transparent focus:border-yellow-500 transition-all ease-in-out mb-[4px]"
              >
                <option
                  checked
                  value="manager"
                  className="text-black forced-color-adjust-auto dark:bg-neutral-950 dark:text-white"
                >
                  Manager
                </option>
                <option
                  value="C-Level"
                  className="text-black forced-color-adjust-auto dark:bg-neutral-950 dark:text-white"
                >
                  C-Level
                </option>
                <option
                  value="Worker"
                  className="text-black forced-color-adjust-auto dark:bg-neutral-950 dark:text-white"
                >
                  Worker
                </option>
                <option
                  value="Staff"
                  className="text-black forced-color-adjust-auto dark:bg-neutral-950 dark:text-white"
                >
                  Staff
                </option>
              </select>
            </div>
            <div>
              <p className="text-blue-800 dark:text-white font-bold text-base mb-[2px]">
                Description:
              </p>
              <textarea
                readOnly={!isEditable}
                maxLength={1024}
                {...register(`desc`)}
                className="text-2xl max-w-[300px] w-full min-h-[200px] max-h-[500px] resize-none p-2 border-2 border-blue-800 dark:border-neutral-700 dark:text-white rounded-md placeholder:text-base bg-transparent focus:outline-none transition-all ease-in-out mb-[16px]"
                placeholder="User's description..."
              />
            </div>
          </div>
          <div className="flex items-start justify-center gap-3 text-center">
            <div className="flex gap-3">
              {isEditable ? (
                <input
                  disabled={!isDirty}
                  type="submit"
                  className={`${isDirty ? "opacity-100" : "opacity-50"} bg-green-600 px-4 py-2 rounded-2xl hover:scale-95 transition-all ease cursor-pointer text-white`}
                  value={"Save"}
                />
              ) : (
                <Button
                  className="px-4 py-2 bg-blue-600 rounded-2xl hover:scale-95 transition-all ease"
                  onClick={() => {
                    setIsEditable(true)
                    playClick()
                  }}
                  text="Edit"
                />
              )}
              {isEditable && (
                <Button
                  styles={"bg-red-700"}
                  onClick={() => {
                    playClick()
                    setIsEditable(false)
                    reset()
                  }}
                  text={"Close"}
                />
              )}
            </div>

            <div className={`${isEditable && "hidden"} flex gap-3 flex-wrap`}>
              <Link to={"/list"}>
                <Button text={"Back"} onClick={() => playClick()} />
              </Link>
            </div>
          </div>
        </form>
      </motion.div>
    </main>
  )
}

export default EditPage
