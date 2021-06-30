import { Card, CardActionArea, CardContent, Grid } from '@material-ui/core';
import DeckIcon from '@material-ui/icons/Deck'; 
interface TablesType {
    numberTable: number;
    isAvailable: 'inherit' | 'primary' | 'secondary' | 'action' | 'disabled' | 'error';
    setSelectedTable: (arg0:number)=> void;
}

const Tables = ({ numberTable, isAvailable ,setSelectedTable}: TablesType) => {
 
    return ( 
                <Grid item xs={4} md={4} >
                    <Card style={{ backgroundColor: " #f1f1f196" }} >
                        <CardActionArea>
                            <CardContent
                                id={numberTable.toString()}
                                onClick={(e) => setSelectedTable(parseInt(e.currentTarget.id))}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    flexWrap: 'wrap',
                                }}>
                                <DeckIcon fontSize={"large"}
                                    color={isAvailable} />
                                <span
                                    style={{
                                        marginLeft: "16px",
                                        marginTop: "8px"
                                    }}
                                > #{numberTable}</span>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid> 
    );
}

export default Tables;
