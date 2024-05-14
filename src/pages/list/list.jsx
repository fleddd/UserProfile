import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import { Grid, createTheme, ThemeProvider } from "@mui/material"
import { motion } from "framer-motion"

import useFirestore from "../../hooks/useFirestore"
import useTheme from "../../hooks/useTheme"

import { Image } from "../../components"
import { LoadingSpinner } from "../../components"

import GridActions from "./gridActions"

const List = () => {
  const { users, isLoading } = useFirestore()
  const { darkMode } = useTheme()

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
  const theme = createTheme({
    components: {
      MuiDataGrid: {
        styleOverrides: {
          root: {
            "--DataGrid-containerBackground": `${darkMode ? "rgb(38, 38, 38)" : "white"}`, // Change the background color here
          },
        },
      },
    },
  })
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
      className="w-[100%] h-full"
    >
      <ThemeProvider theme={theme}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div style={{ height: "100%", width: "100%" }}>
              <DataGrid
                sx={{
                  alignItems: "center",
                  gap: 5,
                  "--DataGrid-overlayHeight": "400px",
                  minHeight: "700px",
                  border: "none",
                  color: `${darkMode ? "white" : "black"}`,
                  "& .css-c63i49-MuiInputBase-input-MuiInput-input": {
                    color: `${darkMode ? "white" : "black"}`,
                  },
                  "& .MuiSvgIcon-root": {
                    fill: `${darkMode ? "white" : "black"}`, // Change the color of the search icon
                  },
                  "& .css-levciy-MuiTablePagination-displayedRows": {
                    color: `${darkMode ? "white" : "black"}`,
                  },
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
      </ThemeProvider>
    </motion.main>
  )
}

export default List
