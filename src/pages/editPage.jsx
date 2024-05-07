import { useParams, Link } from "react-router-dom"
import { useCallback } from "react"
import { useForm } from "react-hook-form"
import Button from "../components/button"
import { motion } from "framer-motion"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "./../firebase-config"
import { toast } from "react-toastify"
import { formSchema } from "../utils/formSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import InputForm from "../components/InputForm"
import LoadingSpinner from "../components/loadingSpinner"
import useGetUserByID from "../hooks/useGetUserByID"
import fetchUserByID from "../services/api"

const EditPage = () => {
  const { id } = useParams()
  const { user, isLoading } = useGetUserByID(id)
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isDirty },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: async () => fetchUserByID(id),
  })

  const toggleEditAttribute = useCallback((id) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, toggled: !user.toggled } : user
      )
    )
  }, [])
  async function onSubmitSave(data) {
    const userDoc = doc(db, "users", id)
    try {
      for (let key in data) {
        const keyProperty = key.split("E")[0]

        if (data[key] !== undefined) {
          user[keyProperty] = data[key]
        } else return
      }

      // setUsers(prevUsers => prevUsers.map(user =>
      //     user.id === id ? { ...user, [attribute]: !user[attribute] } : user
      // ));
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong...")
    }

    updateDoc(userDoc, user)
      .then(() => {
        toast.success("Data was successfuly updated!")
        toggleEditAttribute(id)
      })
      .catch(() => {
        toast.error("Data wasnt updated")
      })
  }

  if (isLoading) {
    return <LoadingSpinner />
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
        className={`border-2 border-blue-800 md:max-w-1300px flex flex-col justify-between text-black text-xl rounded-2xl p-5 shadow-md shadow-blue-400`}
      >
        <form
          className="flex flex-col gap-5  md:grid md:grid-cols-3"
          action="POST"
          onSubmit={handleSubmit(onSubmitSave)}
        >
          <div className="max-w-[300px]  max-h-[300px] m-auto">
            <img
              src={user?.image}
              width={150}
              height={150}
              className="rounded-md max-h-[300px]"
              alt="NO IMAGE"
            />
          </div>
          <div>
            <div>
              <p className="text-blue-800 font-bold text-base">First name:</p>
              <InputForm
                {...register(`firstName`)}
                disabled={!user?.toggled}
                errorMessage={errors?.firstName?.message}
              />

              <p className="text-blue-800 font-bold text-base">Middle name:</p>
              <InputForm
                {...register(`middleName`)}
                disabled={!user?.toggled}
                errorMessage={errors?.middleName?.message}
              />

              <p className="text-blue-800 font-bold text-base">Last name:</p>
              <InputForm
                {...register(`lastName`)}
                disabled={!user?.toggled}
                errorMessage={errors?.lastName?.message}
              />

              <p className="text-blue-800 font-bold text-base">Birth date:</p>
              <InputForm
                {...register(`date`)}
                type={"date"}
                max={"2006-01-01"}
                disabled={!user?.toggled}
                errorMessage={errors?.date?.message}
              />

              <p className="text-blue-800 font-bold text-base">Role:</p>
              <select
                disabled={!user?.toggled}
                {...register(`role`)}
                className="focus:outline-none border-2 border-blue-800  w-[300px] px-2 py-2 rounded-md overflow-hidden bg-transparent focus:border-yellow-500 transition-all ease-in-out"
              >
                <option checked value="manager" className="text-black">
                  Manager
                </option>
                <option value="C-Level" className="text-black">
                  C-Level
                </option>
                <option value="Worker" className="text-black">
                  Worker
                </option>
                <option value="Staff" className="text-black">
                  Staff
                </option>
              </select>
            </div>
            <div>
              <p className="text-blue-800 font-bold text-base">Description:</p>
              <textarea
                disabled={!user?.toggled}
                maxLength={1024}
                {...register(`desc`)}
                className="text-2xl max-w-[400px] w-full min-h-[150px] max-h-[300px] resize-none p-2 border-2 border-blue-800 rounded-md  bg-transparent focus:outline-none focus:border-yellow-500 transition-all ease-in-out"
              />
            </div>
          </div>
          <div className="flex items-start justify-center gap-3 text-center">
            <div className="flex gap-3">
              {user?.toggled ? (
                <input
                  disabled={!isDirty}
                  type="submit"
                  className={`${isDirty ? "opacity-100" : "opacity-50"} bg-green-600 px-4 py-2 rounded-2xl hover:scale-95 transition-all ease cursor-pointer text-white`}
                  value={"Save"}
                />
              ) : (
                <Button
                  className="px-4 py-2 bg-blue-600 rounded-2xl hover:scale-95 transition-all ease"
                  onClick={() => toggleEditAttribute(id)}
                  text="Edit"
                />
              )}
              {user?.toggled && (
                <Button
                  styles={"bg-red-700"}
                  onClick={() => {
                    toggleEditAttribute(id)
                    reset()
                  }}
                  text={"Close"}
                />
              )}
            </div>

            <div className="flex gap-3 flex-wrap">
              <Link to={"/list"}>
                <Button text={"Back"} />
              </Link>
            </div>
          </div>
        </form>
      </motion.div>
    </main>
  )
}

export default EditPage
