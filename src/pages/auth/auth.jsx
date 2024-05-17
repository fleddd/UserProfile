import { useState } from "react"
import { motion } from "framer-motion"
import Login from "./login"
import Signup from "./signup"

const Auth = () => {
  const [loginMode, setLoginMode] = useState(true)
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
      className="w-full flex justify-center items-center pt-20"
    >
      <div className="flex flex-col items-center gap-20">
        <div className="flex flex-col gap-12 items-center">
          <div>
            <h1 className="text-4xl dark:text-white font-bold">
              {loginMode ? "Log in" : "Sign up"}
            </h1>
          </div>
        </div>
        {loginMode ? <Login /> : <Signup setLoginMode={setLoginMode} />}

        <div className="flex gap-3">
          {loginMode ? (
            <p
              onClick={() => setLoginMode(false)}
              className="text-md cursor-pointer dark:text-neutral-500 font-bold hover:translate-y-[-1px] transition-all ease-in-out"
            >
              Don't have any account?
            </p>
          ) : (
            <p
              onClick={() => setLoginMode(true)}
              className="text-md cursor-pointer dark:text-neutral-500 font-bold hover:translate-y-[-1px] transition-all ease-in-out"
            >
              Log into existing account.
            </p>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default Auth
