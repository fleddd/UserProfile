import { getAllUsers, addEmployee, editUser, deleteUser } from "../services/api"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

function useFirestore(uid) {
  const queryClient = useQueryClient()

  const editUserMutation = useMutation({
    mutationFn: editUser,
  })
  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["users"])
    },
  })
  const addEmployeeMutation = useMutation({
    mutationFn: addEmployee,
  })
  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["employees", uid],
    queryFn: () => getAllUsers(uid),
  })

  const sortUserData = () => {
    if (isSuccess)
      return data.map((item) => {
        return { ...item.data, id: item.id }
      })
  }

  const users = sortUserData()
  return {
    users,
    isError,
    isLoading,
    addEmployeeMutation,
    editUserMutation,
    deleteUserMutation,
  }
}

export default useFirestore
