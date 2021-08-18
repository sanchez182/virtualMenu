import { Card, CardActionArea, CardContent, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CropDinIcon from '@material-ui/icons/CropDin';
import { RootState } from '../../store';
import Tables, { ITable } from '../../components/Tables';
import StartAppBarPublic from '../../components/Layout/StartAppBarPublic';
import {  withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'; 
import { getDataTables } from '../../actionsApi/tableActions';
import { setTableList } from '../../store/actions/tableSeleted';
import { ITableModel } from '../../store/actions/actionsInterfaces/ITableActions';

const TableScreen = () => {
    //tableList 
    const { t } = useTranslation();
     const { tableList }: ITableModel = useSelector((state: RootState) => state.dataTables);
    const dispatch = useDispatch()

    useEffect(() => {  
        async function fetchData() {
            getDataTables().then((tables:ITable[]) => {
                debugger
                dispatch(setTableList({
                    selectedTable: {_id : "" , type : "", selected: false, tableNumber : 0},
                    tableList: tables
                }))
            })
          }
          fetchData();
      }, [dispatch]);

    const { language } = useSelector((state: RootState) => state.lang);

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
                    tableList.length > 0 && tableList.map((table: ITable) => {
                        return <Tables table = {table} key={table.tableNumber}/>
                    })
                }
        </Grid>

    );
}

export default React.memo(withRouter(TableScreen));