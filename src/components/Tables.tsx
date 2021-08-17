import { Card, CardActionArea, CardContent, Grid, TextField } from '@material-ui/core';
import DeckIcon from '@material-ui/icons/Deck';
import { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SocketContext } from '../context/SocketContext';
import { RootState } from '../store';
import { setSocketClientMaster } from '../store/actions/socketClientAction';
import { setTableSeleted } from '../store/actions/tableSeleted';
import DialogComponent from './DialogComponent';


export interface ITable {
    selected: boolean,
    tableNumber: number,
    type: string
    _id: string
}

interface TablesType {
    table: ITable;
    setSelectedTable: (arg0: ITable) => void;
}

const Tables = ({ table, setSelectedTable }: TablesType) => {
    const [openDialog, setOpenDialog] = useState(false)
    const [idMaster, setIdMaster] = useState("")
    const { socket } = useContext(SocketContext);
    const { _id } = useSelector((state: RootState) => state.restaurantData);

    const dispatch = useDispatch()

    const checkIfClientIdIsMaster = (table: ITable) => {
        debugger
        if (table.selected) {
            setOpenDialog(true)
        } else {
            socket?.emit('selected-table', {
                _id: table._id, // mesa seleccionada
                idRestaurant: _id,
                isSelected: true
            });
            dispatch(setTableSeleted(table))
        }
    }

    const setReducers=()=>{
        dispatch(setSocketClientMaster(idMaster))
        dispatch(setTableSeleted(table))
    }
    return (
        <Grid item xs={4} md={4} >
            <Card style={{ backgroundColor: " #f1f1f196" }} >
                <CardActionArea>
                    <CardContent
                        id={table._id}
                        onClick={(e) => checkIfClientIdIsMaster(table)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                        }}>
                        <DeckIcon fontSize={"large"}
                            color={table.selected ? "error" : "primary"} />
                        <span
                            style={{
                                marginLeft: "16px",
                                marginTop: "8px"
                            }}
                        > #{table.tableNumber}</span>
                    </CardContent>
                </CardActionArea>
            </Card>

            <DialogComponent
                open={openDialog}
                setOpenMenu={(open) => setOpenDialog(open)}
                dialogContentText="Ingrese código dado al usuario que selecciono la mesa en la que se encuentran para ingresar al menú"
                title="Código de orden"
                children={<TextField
                    fullWidth
                    type="text"
                    value={idMaster}
                    onChange={(e) => setIdMaster(e.target.value)} />}
                actionButton={()=>setReducers()}
                textActionButton="Ingresar"
            />
        </Grid>
    );
}

export default Tables;
