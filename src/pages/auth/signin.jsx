import { useForm } from "react-hook-form"
import InputForm from "../../components/InputForm"
import Button from "../../components/button"
import { loginSchema } from "../../utils/formSchema"
import { zodResolver } from "@hookform/resolvers/zod"

import { auth } from "../../firebase-config"
import { signInWithEmailAndPassword } from "firebase/auth"
const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      login: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  })
  const signInto = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((useCredentials) => {
        console.log(useCredentials)
      })
      .catch((errors) => {
        console.log(errors)
      })
  }
  const onSubmit = (data) => {
    signInto(data.login, data.password)
  }

  return (
    <div className="flex flex-col gap-12 items-center">
      <div>
        <h1 className="text-4xl dark:text-white font-bold">Login</h1>
      </div>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
        <InputForm
          label={"Login or email"}
          {...register("login")}
          errorMessage={errors.login?.message}
        />
        <InputForm
          label={"Password"}
          {...register("password")}
          errorMessage={errors.password?.message}
        />
        <Button text={"ASD"} type={"submit"} />
      </form>
    </div>
  )
}

export default SignIn
