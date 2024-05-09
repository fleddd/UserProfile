import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import { Grid } from "@mui/material"

import { motion } from "framer-motion"
import { Image } from "../components"
import LoadingSpinner from "../components/loadingSpinner"
import useFirestore from "../hooks/useFirestore"
import GridActions from "../components/gridActions"

const List = () => {
  const { users, isLoading } = useFirestore()

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
      renderCell: (params) => <GridActions id={params.row.id} />,
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
