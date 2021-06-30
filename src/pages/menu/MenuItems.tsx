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
}

export const  MenuItems = ({ item,itemType,itemName }: MenuItem)=> {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.menuItemReducer);
  const addPlate = (cant: number) => {
    const newValue = cant + item.cant;
    let indexPlate = items[itemType].findIndex((x: any) => x.id === item.id )
    items[itemType][indexPlate].cant = newValue;
    newValue >= 0 && dispatch(setMenuItems(items));
  }

  const color = item.cant > 0 ? { backgroundColor: "lightgreen", marginTop: "4px" } : { marginTop: "4px" }
  return (
    <div className={classes.root}>
      <Accordion style={color}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Grid container>
            <Grid item xs={9}>
              <Typography className={classes.heading}>{itemName}
              </Typography>
              <Typography variant="body2" color="textSecondary" >
                {item.shortDescription}</Typography>

            </Grid>
            {item.cant > 0 && <Grid item xs={3}>
              <span>Cant: {item.cant}</span>
            </Grid>}

          </Grid>
        </AccordionSummary>
        <AccordionDetails style={{    display: "block"}}>
          <CardItemMenu addItem={addPlate} cant={item.cant} image={item.image}
           itemName={item[itemName]} description={item.description} />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
export default MenuItems;