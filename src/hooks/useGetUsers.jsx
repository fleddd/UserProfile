import { useState, useCallback } from 'react';
import { collection, getDocs} from "firebase/firestore";
import {db} from './../firebase-config'

function useGetUsers() {

    const [users, setUsers] = useState([])
    const usersCollectionRef = collection(db, "users")
    const [isLoading, setIsLoading] = useState(false)

    const getUsers = useCallback(async () => {
        setIsLoading(true)
        const data = await getDocs(usersCollectionRef);
        setUsers(data.docs.map(doc => ({ ...doc.data(), id: doc.id, toggled: false, confirmedDelete: false, isExpanded: false })));
        setIsLoading(false)
    }, [usersCollectionRef]);

    return {setUsers, getUsers, users, isLoading};
}

export default useGetUsers;