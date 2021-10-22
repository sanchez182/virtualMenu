import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CardItemMenu from '../../components/CardItemMenu';
import { Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { setMenuItems } from '../../store/actions/menuItemsActions';
import { RootState } from '../../store';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%'
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  }),
);
interface MenuItem {
  item: any;
  itemType: "food" | "drink";
  itemName: string;
  renderButtons:boolean;
}

export const  MenuItems = ({ item,itemType,itemName,renderButtons }: MenuItem)=> {
  const classes = useStyles();
  const quantity = item.quantity ? item.quantity : 0
  const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.menuItemReducer);



  const addPlate = (cant: number) => {
    const newValue = cant + quantity;
    let indexPlate = items[itemType].findIndex((x: any) => x._id === item._id )
    items[itemType][indexPlate].quantity = newValue;
    
    if(newValue >= 0){
      dispatch(setMenuItems(items));
    } 
  }

  const color = item.quantity > 0 ? { backgroundColor: "lightgreen", marginTop: "4px" } : { marginTop: "4px" }
  
  return (
    <div className={classes.root}>
      <Accordion style={color} >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Grid container>
            <Grid item xs={12} md={12} >
              <Typography className={classes.heading}>{itemName}
              </Typography>
              <Typography variant="body2" color="textSecondary" >
                { item.description.substring(0,20)}</Typography>

            </Grid>
            {item.quantity > 0 && <Grid item xs={3}>
              <span>Cant: {quantity}</span>
            </Grid>}

          </Grid>
        </AccordionSummary>

        <AccordionDetails style={{    display: "block"}}>
          <CardItemMenu renderButtons={renderButtons} addItem={addPlate} quantity={quantity} image={item.urlImage}
           itemName={item[itemName]} description={item.description} />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
export default MenuItems;