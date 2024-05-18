import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { registerSchema } from "../../utils/formSchema"
import { InputForm, Button } from "../../components"
import useAuth from "../../hooks/useAuth"
import useNotification from "../../hooks/useNotification"
const Signup = ({ setLoginMode }) => {
  const { signupUserMutation } = useAuth()
  const { Success, Error } = useNotification()

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmedPassword: "",
    },
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = (data) => {
    signupUserMutation
      .mutateAsync({
        email: data.email,
        password: data.password,
      })
      .then(() => {
        reset()
        setLoginMode(true)
        Success("Success! Now log into your new account!")
      })
      .catch((error) => {
        console.log(error)
        Error(error.code)
      })
  }
  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      <InputForm
        label={"Login or email"}
        {...register("email")}
        type="email"
        errorMessage={errors.login?.message}
      />
      <InputForm
        label={"Password"}
        {...register("password")}
        errorMessage={errors.password?.message}
      />
      <InputForm
        label={"Confirm password"}
        {...register("confirmedPassword")}
        errorMessage={errors.confirmedPassword?.message}
      />
      <Button text={"Create new acount"} type={"submit"} />
    </form>
  )
}

export default Signup
