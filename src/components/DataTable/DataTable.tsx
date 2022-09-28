import React, { useState } from 'react';
import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import { useGetData } from '../../custom-hooks';
import { serverCalls } from '../../api';
import { Button,Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle } from '@mui/material';
import { MarvelForm } from '../../components/MarvelForm';
import { getAuth } from 'firebase/auth';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'name',
      headerName: 'Marvel Name',
      width: 90,
      editable: true,
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 150,
      editable: true,
    },
    {
      field: 'comics_appeared_in',
      headerName: 'Comics Appeared in',
      type: 'number',
      width: 90,
      editable: true,
    },
    {
      field: 'super_power',
      headerName: 'Power',
      width: 200,
      editable: true,
    },
];

interface gridData{
    data:{
      id?:string;
    }
}

export const DataTable = () => {
    const auth = getAuth()
    let { marvelData, getData } = useGetData()
    let [open, setOpen] = useState(false);
    let [gridData, setData] = useState<GridSelectionModel>([])

    let handleOpen = () => {
        setOpen(true)
    }
    
    let handleClose = () => {
        setOpen(false)
    }
    
    let deleteData = () => {
        serverCalls.delete(`${gridData[0]}`)
        getData()
    }
    
    console.log(gridData)
    if (auth.currentUser) {
    return (
        <div style={{ height: 400, width: '100%' }}>
            <h2>Marvel Inventory</h2>
            <DataGrid
                rows={marvelData}
                columns={columns}
                pageSize={9}
                rowsPerPageOptions={[9]}
                checkboxSelection
                onSelectionModelChange = {(newSelectionModel) => {setData(newSelectionModel);}}
                {...marvelData}
            />
            <Button onClick={handleOpen}>Update</Button>
            <Button variant="contained" color="secondary" onClick={deleteData}>Delete</Button>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Update A Character</DialogTitle>
                <DialogContent>
                    <DialogContentText>Marvel id: {gridData[0]}</DialogContentText>
                    <MarvelForm id={`${gridData[0]}`}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick = {handleClose} color="success">Cancel</Button>
                    <Button onClick={handleClose} color = "success">Done</Button> 
                </DialogActions>
            </Dialog>
        </div>
    )} else {
        return (
            <div>
                <h1>Please Sign In to View Your Marvel Data</h1>
           </div> 
        )};
}