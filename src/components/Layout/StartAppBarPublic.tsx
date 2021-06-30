import { Toolbar, AppBar, Typography, Grid, List } from '@material-ui/core';
import SpecialDialLenguage from '../SpecialDialLenguage';
import { useSelector } from 'react-redux'; 
import { RootState } from '../../store';

const StartAppBarPublic = () => {
const { name } = useSelector((state: RootState) => state.restaurantData);

    return (
        <AppBar elevation={0} position='fixed' className={`appBar`}>
            <Toolbar>
                <Grid container>
                    <Grid item xs={8} md={6} className="column-logo">

                        <Typography variant='h6' noWrap>
                                {name}
                        </Typography>
                    </Grid>
                    <Grid item xs={4} md={6} className="column-info">
                        <List className="menu">
                            <SpecialDialLenguage />
                        </List>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default StartAppBarPublic;