import { useState } from "react"
import SignIn from "./signin"
import SignUp from "./signup"
import Button from "../../components/button"

const Auth = () => {
  const [loginMode, setLoginMode] = useState(true)
  return (
    <main className="w-full flex justify-center items-center pt-20">
      <div className="flex flex-col items-center gap-20">
        <div>{loginMode ? <SignIn /> : <SignUp />}</div>
        <div className="flex gap-3">
          <Button text="Login" onClick={() => setLoginMode(true)} />
          <Button text="Register" onClick={() => setLoginMode(false)} />
        </div>
      </div>
    </main>
  )
}

export default Auth
