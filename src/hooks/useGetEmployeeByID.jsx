import { useQuery } from "@tanstack/react-query"
import fetchUserByID from "../services/api"
import useAuth from "./useAuth"
import { useParams } from "react-router-dom"

const useGetEmployeeByID = () => {
  const { currentUser, uid } = useAuth()
  const { id } = useParams()

  const {
    data,
    isLoading,
    isError: isUserError,
    error,
    isSuccess,
  } = useQuery({
    queryKey: ["employeeByID", [uid, id]],
    queryFn: () => fetchUserByID(uid, id),
  })
  const employee = data?.data

  return { employee, isUserError, isLoading, error, isSuccess }
}

export default useGetEmployeeByID
