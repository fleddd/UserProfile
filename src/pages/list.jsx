import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import { Grid } from "@mui/material"

import { useNavigate } from "react-router-dom"

import { motion } from "framer-motion"
import { Image } from "../components"
import { toast } from "react-toastify"
import LoadingSpinner from "../components/loadingSpinner"
import useFirestore from "../hooks/useFirestore"
import { getAllUsers } from "../services/api"
import { useState } from "react"

const List = () => {
  const { users, isLoading, deleteUserMutation, isFetched } = useFirestore()
  const navigate = useNavigate()
  const [deleteDialog, setDeleteDialog] = useState(false)

  const CustomNoRowsOverlay = () => {
    return (
      <div className="w-full h-full flex items-center justify-center flex-col gap-3 text-3xl">
        <Image.DefaultLogoIcon size={125} />
        <h2 className="opacity-70">There is no users...</h2>
      </div>
    )
  }
  const columns = [
    { field: "id", headerName: "ID", hide: true, width: 200 },
    {
      field: "image",
      headerName: "Avatar",
      width: 70,
      renderCell: (params) => {
        return (
          <div className="h-full flex items-center justify-center">
            {params.row.image ? (
              <Image.Avatar src={params.row.image} />
            ) : (
              <Image.DefaultLogoIcon />
            )}
          </div>
        )
      },
    },
    { field: "firstName", headerName: "First name", width: 90 },
    { field: "lastName", headerName: "Last name", width: 90 },
    { field: "date", headerName: "Date", width: 100 },
    { field: "role", headerName: "Role", width: 80 },
    {
      field: "action",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="flex items-center h-full gap-4">
            <div
              onClick={() => navigate(`/list/${params.id}`)}
              className="hover:scale-90 transition-all ease-in-out"
            >
              <Image.View width={30} height={30} />
            </div>
            <div
              onClick={() => {
                deleteUserMutation
                  .mutateAsync({ id: params.row.id })
                  .then(() => {
                    toast.success("User was successfuly deleted!", {
                      position: "top-center",
                    })
                  })
                  .catch((errors) => {
                    toast.warn(`Something went wrong... ${errors}`, {
                      position: "top-center",
                    })
                    console.error(errors)
                  })
              }}
              className="hover:scale-90 transition-all ease-in-out"
            >
              <Image.DeleteIcon width={30} height={30} />
            </div>
          </div>
        )
      },
    },
  ]

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <motion.main
      initial={{
        opacity: 0,
        y: -10,
      }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.7,
        },
      }}
      className="w-[100%]"
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              sx={{
                alignItems: "center",
                gap: 5,
                "--DataGrid-overlayHeight": "500px",
                minHeight: "700px",
              }}
              autoHeight
              pagination
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
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
                  quickFilterProps: { debounceMs: 500 },
                },
              }}
              rows={users}
              columns={columns}
            />
          </div>
        </Grid>
      </Grid>
    </motion.main>
  )
}

export default List
