import { useForm } from "react-hook-form"
import { useState } from "react"
import { motion } from "framer-motion"

import { Button, InputForm } from "../../components"
import useAuth from "../../hooks/useAuth"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

const Profile = () => {
  const [isEditable, setIsEditable] = useState(false)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isConfirmedLogout, setIsConfirmedLogout] = useState(false)
  const { currentUser, setCurrentUser, signOutUser } = useAuth()
  const navigate = useNavigate()
  const { register, reset } = useForm({
    defaultValues: {
      email: currentUser === null ? "" : currentUser.email,
      password: "",
    },
  })
  const toggleIsEditable = () => {
    setIsEditable((prev) => !prev)
    if (isConfirmedLogout) setIsConfirmedLogout(false)
    reset()
  }
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -10,
      }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.7,
        },
      }}
      className=" w-full h-full flex flex-col justify-center items-center gap-8"
    >
      <div className="w-[350px] md:w-[500px] border-2 rounded-xl border-blue-700 dark:border-neutral-700 p-12 md:p-20 flex flex-col justify-center items-center gap-16">
        <div>
          <h2 className="text-3xl md:text-4xl dark:text-white font-bold">
            Your profile info:
          </h2>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <h3 className="dark:text-white font-bold">Email:</h3>
            <InputForm readOnly={!isEditable} {...register("email")} />
            {currentUser !== null && !isEditable && (
              <>
                <h3 className="dark:text-white ">Your user ID:</h3>
                <p className="dark:text-white font-bold">{currentUser?.uid}</p>
              </>
            )}
          </div>
          {isEditable && (
            <div className="flex flex-col gap-2">
              <h3 className="dark:text-white font-bold">Password:</h3>
              <InputForm
                readOnly={!isEditable}
                {...register("password")}
                type={`${isPasswordVisible ? "text" : "password"}`}
                label="Optional"
              />
              <p
                className="dark:text-neutral-400 font-bold cursor-pointer select-none"
                onClick={() => setIsPasswordVisible((prev) => !prev)}
              >
                {isPasswordVisible ? "Hide password" : "Show password"}
              </p>
            </div>
          )}
        </div>

        <div className="space-x-2 text-center space-y-2">
          {isEditable && (
            <Button
              disabled={!isEditable}
              type="submit"
              styles={`dark:bg-green-900 bg-green-600`}
              text={"Save"}
            />
          )}
          <Button
            text={`${isEditable ? "Back" : "Update credentials"}`}
            onClick={toggleIsEditable}
          />
          <Button
            text={`${isConfirmedLogout ? "You sure?" : "Logout"}`}
            onClick={() => {
              if (isEditable) setIsEditable(false)
              if (isConfirmedLogout) {
                signOutUser()
                navigate("/auth")
                toast.warn("You logged out!", {
                  position: "top-center",
                })
              } // put here function of loggin out
              setIsConfirmedLogout((prev) => !prev)
            }}
            styles={`${isConfirmedLogout && "bg-red-600 dark:bg-red-950"}`}
          />
        </div>
      </div>
    </motion.div>
  )
}

export default Profile
