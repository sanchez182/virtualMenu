import { Card, CardActionArea, CardContent, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import CropDinIcon from '@material-ui/icons/CropDin';
import { RootState } from '../../store';
import Tables from '../../components/Tables';
import StartAppBarPublic from '../../components/Layout/StartAppBarPublic';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next'

interface TablesScreen extends RouteComponentProps<any> {
    setSelectedTable: (arg0: number) => void;
}

const TableScreen = ({ setSelectedTable }: TablesScreen) => {
    //tableList 
    const { t } = useTranslation();
    const { language } = useSelector((state: RootState) => state.lang);
    const { tableList } = useSelector((state: RootState) => state.restaurantData);


    return (
        <Grid container className={"imgFond"}>
            <StartAppBarPublic />
            <Grid container style={{ marginTop: "48px" }}>
                <Grid item xs={6} md={6} >
                    <Card style={{ backgroundColor: "rgb(128 63 63 / 47%)" }}>
                        <CardActionArea>
                            <CardContent>
                                <Typography variant="body2"
                                    color="textSecondary" component="p"
                                    align="center">
                                    <CropDinIcon color="error" /><br/>
                                   {t("busy", language)}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs={6} md={6} >
                    <Card style={{ backgroundColor: "rgb(128 63 63 / 47%)" }}>
                        <CardActionArea>
                            <CardContent>
                                <Typography variant="body2" color="textSecondary" component="p"
                                    align="center">
                                        <CropDinIcon color="primary" /> <br/>
                                        {t("available", language)}</Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            </Grid>


    
                {
                    tableList.map((table: any) => {
                        const isSelected = table.selected ? "error" : "primary"
                        return <Tables key={table.tableNumer} numberTable={table.tableNumber}
                            setSelectedTable={setSelectedTable}
                            isAvailable={isSelected} />
                    })
                }
        </Grid>

    );
}

export default React.memo(withRouter(TableScreen));