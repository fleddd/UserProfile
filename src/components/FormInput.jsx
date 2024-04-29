import { useForm } from "react-hook-form";

const FormInput = ({defaultValue, type, disabled, plcText, props, max}) => {
    const {
        formState: {errors}
    } = useForm({})

    return (
        <>
                <input placeholder={plcText} max={max} type={type} {...props} disabled={disabled} defaultValue={defaultValue} className={`order-2 ${errors.firstName ? "border-red-500" : "border-blue-800"} w-[300px] px-2 py-2 mb-2 border-2 border-blue-800 rounded-md text-2x bg-transparent text-black placeholder:text-gray-400 focus:outline-none focus:focus:border-yellow-500 transition-all ease-in-out`} />
        </>
    );
}
 
export default FormInput;