import {useParams, Link} from "react-router-dom";
import useGetUsers from "../hooks/useGetUsers";
import { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import Button from "../components/button";


import { collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import {db} from './../firebase-config'

const EditPage = () => {
    const {id} = useParams()
    const {setUsers, getUsers, users, isLoading} = useGetUsers()
   

    
    const user = users.filter((item) => item.id === id)[0];
    useEffect(() => {
        getUsers()
    }, [])
    const [isExpanded, setIsExpanded] = useState(false)
    const {
        register,
        handleSubmit,
        reset
    } = useForm({})

    const toggleAttribute = useCallback((id, attribute) => {
        setUsers(prevUsers => prevUsers.map(user =>
            user.id === id ? { ...user, [attribute]: !user[attribute] } : user
        ));
    }, []);
    async function onSubmitSave(data){
        const userDoc = doc(db, "users", id);
        const itemIndex = users.findIndex(item => item.id === id)
        try {
            for (let key in data) {
                // Splitting the key to extract the property name and id
                const parts = key.split('-');
                const keyProperty = parts[0];
                const keyId = parts[1];
            
                if (keyId === id) {  // Checking if the key includes the specific 'id'
                    users.forEach(user => {
                        if (user.id === id && data[key] !== undefined) {  // Updating only if the user matches the id and data[key] is not undefined
                            user.data[keyProperty] = data[key];
                        }
                    });
                }
            }
            
           
        } catch (error) {
            console.log(error);
        }
        
        await updateDoc(userDoc, {data: users[itemIndex].data}).then(() => {
            toggleAttribute(id, 'toggled')
          }).catch(error =>{
            console.log(error.message)
          })
    }
    return (
        
        <main className="flex items-center justify-center">
                <div key={user?.id} className={`border-2 border-blue-800 max-w-[400px] flex flex-col justify-between text-black text-xl rounded-2xl p-5 shadow-md shadow-blue-400`}>
                                                    <form className="flex flex-col gap-5 " action="POST" onSubmit={handleSubmit(onSubmitSave)}>
                                                        <div className="max-w-[300px]  max-h-[300px] m-auto">
                                                            <img src={user?.image} width={150} height={150} className="rounded-md max-h-[300px]" alt="NO IMAGE" />

                                                        </div>
                                                        <div>
                                                            <div>
                                                                <p className="text-blue-800 font-bold text-base">First name:</p>
                                                                <input disabled={!user?.toggled} type="text" {...register(`firstName-${user?.id}`)} defaultValue={user?.firstName} className="p-1 border-2 border-blue-800 rounded-md text-2x bg-transparent text-black placeholder:text-white focus:outline-none focus:focus:border-yellow-500 transition-all ease-in-out" maxLength={25} />

                                                                <p className="text-blue-800 font-bold text-base">Middle name:</p>
                                                                <input disabled={!user?.toggled} type="text"  {...register(`middleName-${user?.id}`)} defaultValue={user?.middleName} className="p-1 border-2 border-blue-800 rounded-md text-2x bg-transparent text-black placeholder:text-white focus:outline-none focus:focus:border-yellow-500 transition-all ease-in-out" maxLength={25} />

                                                                <p className="text-blue-800 font-bold text-base">Last name:</p>
                                                                <input disabled={!user?.toggled} type="text"  {...register(`lastName-${user?.id}`)} defaultValue={user?.lastName} className="p-1 border-2 border-blue-800 rounded-md text-2x bg-transparent text-black placeholder:text-white focus:outline-none mb-5 focus:focus:border-yellow-500 transition-all ease-in-out" maxLength={25} />
                                                                
                                                            
                                                                <p className="text-blue-800 font-bold text-base">Birth date:</p>             
                                                                <input disabled={!user?.toggled} max={'2006-12-31'} {...register(`date-${user?.id}`)} defaultValue={user?.date} type="date"  className="text-2xl bg-transparent border-2 border-blue-800 rounded-md text-center focus:focus:border-yellow-500 transition-all ease-in-out"/>
                                                                
                                                                <p className="text-blue-800 font-bold text-base">Role:</p>
                                                                <select  disabled={!user?.toggled} defaultValue={user?.role} {...register(`role-${user?.id}`)} className="focus:outline-none border-2 border-blue-800  w-[300px] px-2 py-2 rounded-md overflow-hidden bg-transparent focus:border-yellow-500 transition-all ease-in-out">
                                                                    <option value="manager" className="text-black">Manager</option>
                                                                    <option value="C-Level" className="text-black">C-Level</option>
                                                                    <option value="Worker" className="text-black">Worker</option>
                                                                    <option value="Staff" className="text-black">Staff</option>
                                                                </select>
                                                            </div>
                                                            <div>
                                                                <p className="text-blue-800 font-bold text-base">Description:</p> 
                                                                <textarea  disabled={!user?.toggled} maxLength={1024} defaultValue={user?.desc} {...register(`desc-${user?.id}`) }  className="text-2xl max-w-[400px] min-h-[150px] max-h-[300px] resize-none p-2 border-2 border-blue-800 rounded-md  bg-transparent focus:outline-none focus:border-yellow-500 transition-all ease-in-out" />
                                                            </div>
                                                        </div>
                                                        <div className="flex items-start justify-center gap-3 text-center">
                                                        
                                                            
                                                                <div className="flex gap-3">
                                                                    {user?.toggled && !user?.confirmedDelete ? <input type="submit" className="bg-green-600 px-4 py-2 rounded-2xl hover:scale-95 transition-all ease cursor-pointer text-white" value={'Save'}/> : <Button className="px-4 py-2 bg-blue-600 rounded-2xl hover:scale-95 transition-all ease" onClick={() => toggleAttribute(user.id, "toggled")} text='Edit'/>}
                                                                    {user?.toggled && !user?.confirmedDelete && <Button styles={'bg-red-700'} onClick={() => {
                                                                    toggleAttribute(user?.id, "toggled")
                                                                }} text={'Close'}/>}    
                                                                </div>
                                                        
                                                            <div className="flex gap-3 flex-wrap">
                                                            
                                                                
                                                                
                                                                <Link to={'/list'}>
                                                                    <Button text={'Back'} onClick={() => {
                                                                        toggleAttribute(user?.id, 'isExpanded')
                                                                    
                                                                    }}/>
                                                                </Link>
                                                            </div>
                                                        
                                                        
                                                            
                                                        </div>
                                                    </form>
                                            
                                        </div>
        
        </main>
    );
}
 
export default EditPage;