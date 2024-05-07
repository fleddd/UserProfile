import {getAllUsers, createUser, editUser,deleteUser} from '../services/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

function useFirestore() {
    const queryClient = useQueryClient()


    const createUserMutation = useMutation({
        mutationFn: createUser
    })
    const editUserMutation = useMutation({
        mutationFn: editUser
    })
    const deleteUserMutation = useMutation({
        mutationFn: deleteUser,
        onSuccess: () => {
            queryClient.invalidateQueries(['users'])
          },
    })
    
    const {data: users, isError, isLoading} = useQuery({
        queryKey:[ 'users'],
        queryFn:  getAllUsers,
    })
    return {users, isError, isLoading, createUserMutation, editUserMutation, deleteUserMutation}
}

export default useFirestore;
