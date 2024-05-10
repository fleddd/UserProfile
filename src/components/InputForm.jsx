import { forwardRef } from "react"

const InputForm = forwardRef(
  ({ errorMessage, label, isValid, ...rest }, ref) => {
    return (
      <>
        <input
          {...rest}
          ref={ref}
          placeholder={label}
          className={`border-blue-800 dark:border-neutral-900 dark:bg-neutral-800 dark:text-white border-2 ${!!errorMessage && "border-red-500"} ${!!isValid && "border-green-500"}  w-[300px] px-2 py-2 rounded-md focus:outline-none active:outline-none transition-all ease-in-out mb-[4px]`}
        />
        <p className={`error ${!errorMessage && "hidden"}`}>{errorMessage}</p>
      </>
    )
  }
)

export default InputForm
