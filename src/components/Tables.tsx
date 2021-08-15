import { Card, CardActionArea, CardContent, Grid } from '@material-ui/core';
import DeckIcon from '@material-ui/icons/Deck'; 
import { useDispatch } from 'react-redux';
import { setTableSeleted } from '../store/actions/tableSeleted';


export interface ITable {
    selected: boolean,
    tableNumber: number,
    type: string
    _id: string
}

interface TablesType {
    table: ITable; 
    setSelectedTable: (arg0:ITable)=> void;
}

const Tables = ({ table ,setSelectedTable}: TablesType) => {
    const dispatch = useDispatch()
    return ( 
                <Grid item xs={4} md={4} >
                    <Card style={{ backgroundColor: " #f1f1f196" }} >
                        <CardActionArea>
                            <CardContent
                                id={table._id}
                                onClick={(e) => dispatch(setTableSeleted(table))}
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
                </Grid> 
    );
}

export default Tables;
