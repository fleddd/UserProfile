import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Link } from 'react-router-dom';
import useGetUsers from "../hooks/useGetUsers";
import { useEffect, useState, useCallback } from "react";
import { deleteDoc, doc,  } from "firebase/firestore";
import {db} from '../firebase-config'
import { motion } from 'framer-motion';
import {Image}  from '../components';
import {toast } from 'react-toastify';
import ButtonGrid from '../components/ButtonGrid';

const List = () => {
    const {getUsers, users, isLoading,setUsers} = useGetUsers()
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [deleteDialog, setDeleteDialog] = useState(false)
    useEffect(() => {
        getUsers()
    }, [])
    const toggleDeleteAttribute = useCallback((id) => {
        if(!id) return
        setUsers(prevUsers => prevUsers.map(user =>
            user.id === id ? { ...user, confirmedDelete: !user.confirmedDelete } : user
        ));
    }, []);
    const handleDelete = useCallback(async (id) => {
        if(!id) return
        const userDoc = doc(db, "users", id);
        try {
            await deleteDoc(userDoc);
            setUsers(currentUsers => currentUsers.filter(user => user.id !== id));
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    }, []);
    function CustomNoRowsOverlay() {
        return (
          <div className='w-full h-full flex items-center justify-center flex-col gap-3 text-3xl'>
            <Image.DefaultLogoIcon size={125}/>
            <h2 className='opacity-70'>There is no users...</h2>
          </div>
        );
      }
    const columns = [
        {field: 'id', headerName: 'ID', hide: true, width: 200},
        {
            field: 'image',
            headerName: "Avatar",
            width: 70,
            renderCell: (params)=>{  
                return (
                  <div className='h-full flex items-center justify-center'>
                    {params.row.image ? <Image.Avatar src={params.row.image} /> : <Image.DefaultLogoIcon/>}
                  </div>
                )
              }
            

        },
        {field: 'firstName', headerName: 'First name', width: 90},
        {field: 'lastName', headerName: 'Last name', width: 90},
        {field: 'date', headerName: 'Date', width: 100},
        {field: 'role', headerName: 'Role', width: 80},
        {field: 'action', headerName: 'Actions', width: 100, renderCell: (params) => {
            return params.row.confirmedDelete ?
            <div className='flex items-center h-full gap-4'>
                    <div onClick={()=> toggleDeleteAttribute(params.row.id)} className='hover:scale-90 transition-all ease-in-out' >
                       <Image.CurveLeftArrow/>
                    </div>
                    <div onClick={() => {
                        handleDelete(params.row.id).then(() => {
                            toggleDeleteAttribute(params.row.id)
                            toast.success('User was successfuly deleted!', {
                                position: 'top-center'
                            })
                        }).catch((errors) => {
                            toast.warn('Something went wrong...', {
                                position: 'top-center'
                            })
                            throw new Error(errors)
                        })
                    }} className='hover:scale-90 transition-all ease-in-out'>
                        <Image.DeleteIcon width={30} height={30}/>
                    </div>
                </div>
            
            :
                <div className='flex items-center h-full gap-4'>
                    <div className='hover:scale-90 transition-all ease-in-out'>
                    

                        <Link to={`/list/${params.id}`}>
                            <Image.EditIcon width={30} height={30}/>
                        </Link>
                    </div>
                    <div onClick={() => toggleDeleteAttribute(params.row.id)} className='hover:scale-90 transition-all ease-in-out'>
                        <Image.DeleteIcon width={30} height={30}/>
                    </div>
                </div>
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
        }}
        className='w-[100%]'
        >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                    <div style={{ height: isSmallScreen ? 200 : 400, width: '100%' }}>
                        <DataGrid
                                sx={{
                                    alignItems: 'center',
                                    gap: 5,
                                    '--DataGrid-overlayHeight': '500px',
                                    minHeight: '700px'

                                }}
                                autoHeight
                                pagination
                                initialState={{
                                    pagination: {
                                        paginationModel: {
                                            pageSize: 10
                                        },
                                    }
                                }}
                                pageSizeOptions={[10]}
                                slots={{
                                    toolbar: GridToolbar,
                                    noRowsOverlay: CustomNoRowsOverlay,
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
                    </div>
                    </Grid>
                </Grid>





        
        
        </motion.main>
    );
}
 
export default List;