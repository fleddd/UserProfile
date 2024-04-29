import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import defaultLogo from '../assets/images/defaultLogo.png'
import DeleteIcon from '../assets/images/delete.png'
import EditIcon from '../assets/images/edit.png'
import { Link } from 'react-router-dom';
import useGetUsers from "../hooks/useGetUsers";
import { useEffect, useState, useCallback } from "react";
import { deleteDoc, doc,  } from "firebase/firestore";
import {db} from '../firebase-config'
import { motion } from 'framer-motion';
const List = () => {
    const {getUsers, users, isLoading} = useGetUsers()
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
        getUsers()
    }, []);

    const columns = [
        {field: 'id', headerName: 'ID', width: 200},
        {
            field: 'image',
            headerName: "Avatar",
            width: 100,
            renderCell: (params)=>{
                return (
                  <div className='h-full flex items-center justify-center'>
                    <img src={params.value || defaultLogo } className='rounded-[50%] object-cover' width={40} height={40} alt='' />
                    {params.row.username}
                  </div>
                )
              }
            

        },
        {field: 'firstName', headerName: 'First name', width: 150},
        {field: 'middleName', headerName: 'Middle name', width: 150},
        {field: 'lastName', headerName: 'Last name', width: 150},
        {field: 'date', headerName: 'Date', width: 110},
        {field: 'role', headerName: 'Role', width: 110},
        {field: 'desc', headerName: 'Desc', width: 400},
        {field: 'action', headerName: 'Actions', width: 150, renderCell: (params) => {
            return (
                <div className='flex items-center h-full gap-4'>
                    <div className='hover:scale-90 transition-all ease-in-out'>
                        <Link to={`/list/${params.id}`}>
                            <img src={EditIcon} width={30} height={30} alt="123" />
                        </Link>
                    </div>
                    <div onClick={() => handleDelete(params.row.id)} className='hover:scale-90 transition-all ease-in-out'>
                        <img className='cursor-pointer' src={DeleteIcon} width={30} height={30} alt="321" />
                    </div>
                </div>
            )
        }}
      ]

    return (
        <motion.main initial={{
            opacity: 0,
            y: -10
        }}
        animate={{
            opacity:1,
            y: 0,
            transition: {
                duration: 0.7
            }
        }}>
        <DataGrid
                sx={{
                    alignItems: 'center',
                    gap: 5,
                    width: 'auto'
                }}
                className="dataGrid"
                pagination
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5
                        },
                    }
                }}
                pageSizeOptions={[5]}
                slots={{
                    toolbar: GridToolbar
                }}
                disableColumnFilter
                disableDensitySelector
                disableColumnSelector
                disableRowSelectionOnClick
                disableColumnMenu
                slotProps={{
                    toolbar: {
                        showQuickFilter: true,
                        quickFilterProps: {debounceMs: 500}
                    }
                }}
                 rows={users}
                 columns={columns}
                
                />
        
        
        </motion.main>
    );
}
 
export default List;