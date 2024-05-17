import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { loginSchema } from "../../utils/formSchema"
import { InputForm, Button } from "../../components"
import useAuth from "../../hooks/useAuth"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const Login = () => {
  const { setCurrentUser, loginUserMutation } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  })
  const onSubmit = (data) => {
    loginUserMutation
      .mutateAsync({
        email: data.email,
        password: data.password,
      })
      .then(() => {
        toast.success("Success!", { position: "top-center" })
        reset()
        navigate("/")
      })
      .catch((errors) => {
        console.log(errors)
        toast.error("Error!", { position: "top-center" })
      })
  }

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      <InputForm
        label={"Login or email"}
        {...register("email")}
        errorMessage={errors.login?.message}
      />
      <InputForm
        label={"Password"}
        {...register("password")}
        errorMessage={errors.password?.message}
      />
      <Button text={"Log into account"} type={"submit"} />
    </form>
  )
}

export default Login
