import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { Fab, Tooltip } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9,
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  }),
);

interface ICardItemMenu {
  addItem: (arg0:number)=> void;
  cant: number;
  description: string;
  itemName: string;
  image: string;
}

const CardItemMenu =({ addItem, cant,description,itemName,image }: ICardItemMenu) =>{
  const classes = useStyles();

  return (
    <Card>
      <CardHeader
        title={itemName}
      />

      <CardMedia className={classes.media}
        image={require( `../../src/assets/img/${image}`).default}
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing style={{justifyContent: "flex-end"}}>
        <strong  style={{marginRight: "8px"}}> {cant}</strong>
        <Tooltip title="Agregar plato" aria-label="Add">
        <Fab size="small" color="primary" onClick={()=>addItem(1)} aria-label="add">
          <AddIcon /> 
        </Fab> 
        </Tooltip>
        <Tooltip title="Quitar plato" aria-label="remove">
        <Fab size="small" color="secondary"  style={{marginLeft: "6px"}} onClick={()=>addItem(-1)} aria-label="add">
        <RemoveIcon />
        </Fab> 
        </Tooltip>
      </CardActions>
    </Card>
  );
}
export default CardItemMenu;