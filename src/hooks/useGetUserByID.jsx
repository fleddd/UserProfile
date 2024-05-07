import { useQuery } from "@tanstack/react-query"
import fetchUserByID from "../services/api"

const useGetUserByID = (id) => {
  const {
    data: user,
    isLoading,
    isError: isUserError,
    error,
    isSuccess,
  } = useQuery({
    queryKey: ["userByID"],
    queryFn: () => fetchUserByID(id),
  })
  return { user, isUserError, isLoading, error, isSuccess }
}

export default useGetUserByID
