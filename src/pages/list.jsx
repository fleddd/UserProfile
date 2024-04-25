

import { collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import {db} from './../firebase-config'
import { useEffect, useState, useCallback } from "react";
import { useForm } from 'react-hook-form';
import Button from "../components/button";
import useGetUsers from "../hooks/useGetUsers";

function List() {
    const {setUsers, getUsers, users, isLoading} = useGetUsers()
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


    useEffect(() => {
        getUsers()
    }, [])
   
    
    const handleDelete = useCallback(async (id) => {
        const userDoc = doc(db, "users", id);
        try {
            await deleteDoc(userDoc);
            setUsers(currentUsers => currentUsers.filter(user => user.id !== id));
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    }, []);
    console.log(users);
    async function onSubmitSave(data, item){
        const id = item.target.id
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
        <main className='flex justify-center items-center'>
            {isLoading ? 
                <div className="text-4xl text-center">
                    Loading...
                </div>  :
            
                <div className={`${isExpanded ? "flex justify-center items-center" : " grid xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"}`}>          
                    {users.map((user, index) => {
                        return (
                            <>
                                    {isExpanded ?
                                        <div key={users[index]?.id} className={`${!user.isExpanded && "hidden"} border-2 border-blue-800 max-w-[400px] flex flex-col justify-between text-black text-xl rounded-2xl p-5 shadow-md shadow-blue-400`}>
                                                    <form id={user.id} className="flex flex-col gap-5 " action="POST" onSubmit={handleSubmit(onSubmitSave)}>
                                                        <div className="max-w-[300px]  max-h-[300px] m-auto">
                                                            <img src={user?.image} width={150} height={150} className="rounded-md max-h-[300px]" alt="NO IMAGE" />

                                                        </div>
                                                        <div>
                                                            <div>
                                                                <p className="text-blue-800 font-bold text-base">First name:</p>
                                                                <input disabled={!user.toggled} type="text" {...register(`firstName-${user.id}`)} defaultValue={user?.data.firstName} className="p-1 border-2 border-blue-800 rounded-md text-2x bg-transparent text-black placeholder:text-white focus:outline-none focus:focus:border-yellow-500 transition-all ease-in-out" maxLength={25} />

                                                                <p className="text-blue-800 font-bold text-base">Middle name:</p>
                                                                <input disabled={!user.toggled} type="text"  {...register(`middleName-${user.id}`)} defaultValue={user?.data.middleName} className="p-1 border-2 border-blue-800 rounded-md text-2x bg-transparent text-black placeholder:text-white focus:outline-none focus:focus:border-yellow-500 transition-all ease-in-out" maxLength={25} />

                                                                <p className="text-blue-800 font-bold text-base">Last name:</p>
                                                                <input disabled={!user.toggled} type="text"  {...register(`lastName-${user.id}`)} defaultValue={user?.data.lastName} className="p-1 border-2 border-blue-800 rounded-md text-2x bg-transparent text-black placeholder:text-white focus:outline-none mb-5 focus:focus:border-yellow-500 transition-all ease-in-out" maxLength={25} />
                                                                
                                                            
                                                                <p className="text-blue-800 font-bold text-base">Birth date:</p>             
                                                                <input disabled={!user.toggled} max={'2006-12-31'} {...register(`date-${user.id}`)} defaultValue={user?.data.date} type="date"  className="text-2xl bg-transparent border-2 border-blue-800 rounded-md text-center focus:focus:border-yellow-500 transition-all ease-in-out"/>
                                                                
                                                                <p className="text-blue-800 font-bold text-base">Role:</p>
                                                                <select  disabled={!user.toggled} defaultValue={user?.data.role} {...register(`role-${user.id}`)} className="focus:outline-none border-2 border-blue-800  w-[300px] px-2 py-2 rounded-md overflow-hidden bg-transparent focus:border-yellow-500 transition-all ease-in-out">
                                                                    <option value="manager" className="text-black">Manager</option>
                                                                    <option value="C-Level" className="text-black">C-Level</option>
                                                                    <option value="Worker" className="text-black">Worker</option>
                                                                    <option value="Staff" className="text-black">Staff</option>
                                                                </select>
                                                            </div>
                                                            <div>
                                                                <p className="text-blue-800 font-bold text-base">Description:</p> 
                                                                <textarea  disabled={!user.toggled} maxLength={1024} defaultValue={user?.data.desc} {...register(`desc-${user.id}`) }  className="text-2xl max-w-[400px] min-h-[150px] max-h-[300px] resize-none p-2 border-2 border-blue-800 rounded-md  bg-transparent focus:outline-none focus:border-yellow-500 transition-all ease-in-out" />
                                                            </div>
                                                        </div>
                                                        <div className="flex items-start justify-center gap-3 text-center">
                                                        
                                                            
                                                                <div className="flex gap-3">
                                                                    {user.toggled && !user.confirmedDelete ? <input type="submit" className="bg-green-600 px-4 py-2 rounded-2xl hover:scale-95 transition-all ease cursor-pointer text-white" value={'Save'}/> : <Button className="px-4 py-2 bg-blue-600 rounded-2xl hover:scale-95 transition-all ease" onClick={() => toggleAttribute(user.id, "toggled")} text='Edit'/>}
                                                                    {user.toggled && !user.confirmedDelete && <Button styles={'bg-red-700'} onClick={() => {
                                                                    toggleAttribute(user.id, "toggled")
                                                                }} text={'Close'}/>}    
                                                                </div>
                                                        
                                                            <div className="flex gap-3 flex-wrap">
                                                            
                                                                
                                                                
                                                                
                                                                <Button text={'Hide details'} onClick={() => {
                                                                    toggleAttribute(user.id, 'isExpanded')
                                                                    setIsExpanded(false)
                                                                }}/>
                                                            </div>
                                                        
                                                        
                                                            
                                                        </div>
                                                    </form>
                                            
                                        </div>
                                        :   
                                        <div key={users[index]?.id} className="border-2 border-blue-800 max-w-[400px] flex flex-col justify-between text-black text-xl rounded-2xl p-5 shadow-md shadow-blue-400">
                                                    <div className="flex flex-col gap-5 ">
                                                        <div>
                                                            <div>
                                                                <p className="text-blue-800 font-bold text-base">Name:</p>
                                                                <p className="px-3 py-[2px] text-center break-words  text-2xl bg-transparent border-2 border-blue-800 rounded-md ">{user?.data?.firstName + " " + user?.data?.middleName + " " + user?.data?.lastName}</p>
                                                            
                                                                <p className="text-blue-800 font-bold text-base">Birth date:</p>             
                                                                <p className="px-3 py-[2px] text-center break-words  text-2xl bg-transparent border-2 border-blue-800 rounded-md">{user?.data?.date}</p>
                                                                
                                                                <p className="text-blue-800 font-bold text-base">Role:</p>
                                                                <p className="px-3 py-[2px] text-center break-words  text-2xl bg-transparent border-2 border-blue-800 rounded-md">{user?.data.role}</p>
                                                            </div>
                                                           
                                                        </div>
                                                        <div className="flex items-center justify-center gap-3 text-center">
                                                               <Button text={'Show details'} onClick={() => {
                                                                toggleAttribute(user.id, 'isExpanded')
                                                                setIsExpanded(true)
                                                               }}/>
                                                               <Button styles="px-4 py-2 bg-blue-600 rounded-2xl hover:scale-95 transition-all ease" onClick={() => toggleAttribute(user.id, 'confirmedDelete')} text={user.confirmedDelete ? 'Back' : 'Delete' }/>
                                                                
                                                                {user.confirmedDelete && <Button styles={'bg-red-700 text-white'} text={'Are you sure?'} onClick={() => handleDelete(user.id , users[index].data)}/>
                                                                }                                   
                                                        </div>
                                                    </div>
                                            
                                        </div>
                                    }
                            </>
                        )
                    })}
                </div>
            }
        </main>
    );
}

export default List;