import { useEffect, useState } from "react";
import useGetUsers from "../hooks/useGetUsers";
import Button from "../components/button";
const Dashboard = () => {

    const {setUsers, getUsers, users, isLoading} = useGetUsers()
    useEffect(() => {
        getUsers()
    }, [])
    const workers = users.reduce((total, currentUsers) => currentUsers.data.role === 'Worker' ? total + 1 : total, 0)
    const managers = users.reduce((total, currentUsers) => currentUsers.data.role === 'Manager' ? total + 1 : total, 0)
    const ceo = users.reduce((total, currentUsers) => currentUsers.data.role === 'C-Level' ? total + 1 : total, 0)
    const staffs = users.reduce((total, currentUsers) => currentUsers.data.role === 'Staff' ? total + 1 : total, 0)
    return (
        <>
            {isLoading ? 
                <div className="text-4xl text-center">
                    Loading...
                </div>
                    :
                <main className="flex  flex-col h-full items-center justify-center">
                    <div className="text-center grid xs:grid-cols-1 lg:grid-cols-2 items-center gap-10">
                        <div className="w-[400px] h-[150px] border-2 border-blue-500 bg-blue-400 rounded-xl text-white">
                            <div className="flex gap-3 justify-center items-center h-full">
                                <div className="flex gap-3">
                                    <p className="text-4xl">Total users: {users.length}</p>
                                </div>

                            </div>
                        </div>
                        <div className="w-[400px] h-[150px] border-2 border-yellow-500 bg-yellow-400 rounded-xl text-white">
                            <div className="flex gap-3 justify-center items-center h-full">
                                
                                <div className={'grid grid-cols-2 items-start gap-10 text-3xl'}>
                                    <span className="text-xl">Workers: {workers}</span>
                                    <span className="text-xl">Managers: {managers}</span>
                                    <span className="text-xl">C-Levels: {ceo}</span>
                                    <span className="text-xl">Staff: {staffs}</span>
                                </div>
                                

                            </div>
                        </div>
                        <div className="w-[400px] h-[150px] border-2 border-green-500 bg-green-400 rounded-xl text-white">
                            <div className="flex gap-3 justify-center items-center h-full">
                                <div className="flex gap-3">
                                    <p className="text-4xl">Total users: {users.length}</p>
                                </div>

                            </div>
                        </div>
                        <div className="w-[400px] h-[150px] border-2 border-purple-500 bg-purple-400 rounded-xl text-white">
                            <div className="flex gap-3 justify-center items-center h-full">
                                <div className="flex gap-3">
                                    <p className="text-4xl">Total users: {users.length}</p>
                                </div>

                            </div>
                        </div>
                        
                    </div>
                            
                                
                                
                </main>
            }
            
        </>
    );
}
 
export default Dashboard;