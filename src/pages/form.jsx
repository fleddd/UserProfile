// TODO:
//  - auth
//  - admin mode / user mode

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import UploadImage from "../components/UploadImage"
import "react-image-crop/dist/ReactCrop.css"

import { motion } from "framer-motion"
import InputForm from "../components/InputForm"
import { formSchema } from "../utils/formSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "react-toastify"
import useFirestore from "../hooks/useFirestore"

function Form() {
  const { createUserMutation } = useFirestore()

  const [image, setImage] = useState("")
  const [croppedImage, setCroppedImage] = useState("")
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
    },
    resolver: zodResolver(formSchema),
    reValidateMode: "onChange",
    mode: "onChange",
  })

  function onSubmit(data) {
    // send data
    createUserMutation
      .mutateAsync({
        data: data,
        image: image,
      })
      .then(() => {
        toast.success("User was successfuly added to the database!", {
          position: "top-center",
        })
      })
      .catch((error) => {
        toast.error(`Some error occured here... ${error.message}`, {
          position: "top-center",
        })
        console.error(error)
      })

    // reset form
    setImage("")
    setCroppedImage("")
    reset()
  }
  return (
    <main className="flex justify-center items-center flex-col">
      <motion.form
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
        action=""
        className="flex flex-col justify-start items-start max-w-[300px] "
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-3">
          <InputForm
            label={"First Name"}
            {...register("firstName")}
            errorMessage={errors?.firstName?.message}
          />
          <InputForm
            label={"Middle Name"}
            {...register("middleName")}
            errorMessage={errors?.middleName?.message}
          />
          <InputForm
            label={"Last Name"}
            {...register("lastName")}
            errorMessage={errors?.lastName?.message}
          />
        </div>
        <div className="flex flex-col gap-3">
          <InputForm
            max="2006-01-01"
            min="1900-01-01"
            type="date"
            {...register("date")}
            name="date"
          />
          <span className="error">{errors.date?.message}</span>
          <textarea
            {...register("desc")}
            type="text"
            placeholder="Description"
            className={`border-2 ${errors.desc ? "border-red-500" : "border-blue-800"} w-[300px] px-2 py-2 rounded-md focus:outline-none focus:border-yellow-500 transition-all ease-in-out`}
          />
          <span className="error">{errors.desc?.message}</span>
          <select
            {...register("role")}
            name="role"
            id=""
            className={`border-2 ${errors.role ? "border-red-500" : "border-blue-800"} w-[300px] px-2 py-2 rounded-md focus:outline-none focus:border-yellow-500 transition-all ease-in-out`}
          >
            <option value="Manager">Manager</option>
            <option value="C-Level">C-Level</option>
            <option value="Worker">Worker</option>
            <option value="Staff">Staff</option>
          </select>
          <span className="error">{errors.role?.message}</span>

          <UploadImage
            image={image}
            setImage={setImage}
            croppedImage={croppedImage}
            setCroppedImage={setCroppedImage}
          />
        </div>

        <input
          type="submit"
          onClick={() => setImage(croppedImage)}
          value={"Create User"}
          className="m-auto my-5 p-2 border-2 border-blue-600 rounded-md py-2  cursor-pointer hover:-translate-y-1 transition-all ease-in-out bg-blue-500 text-white"
        />
      </motion.form>
    </main>
  )
}

export default Form
