import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: "95%",
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);

interface ISelectItem {
  idItem: number | null;
  setItemValue: (arg0: any) => void;
  items: any[];
  idItemType: string;
  itemName: string;
  placeHolder: string;
}

/* drinkDescription: "Gaseosa"
drinkName: "Cocacola"
drinkType: "Licor"
idImg: "restaurant4/twovzgveqcebhotn267u"
ingredients: []
price: 100
showInMenu: false
updatatedDate: "2021-08-04T21:33:36.312Z"
urlImage: "https://res.cloudinary.com/ddb12hbdl/image/upload/v1628112816/restaurant4/twovzgveqcebhotn267u.jpg"
__v: 0
_id: "610b077de338b8353c6ae14d" */


export default function SelectItem({ setItemValue, idItem, items, idItemType, itemName,placeHolder }: ISelectItem) {
  const classes = useStyles();
  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="demo-simple-select-helper-label">{placeHolder}</InputLabel>
      <Select
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        value={idItem}
        key={itemName}
        onChange={setItemValue}
      >
        <MenuItem value="">
          <em>Todas</em>
        </MenuItem>
        {items.map((item) => {
          return <MenuItem value={item[idItemType]}>{item[itemName]}</MenuItem>
        })}
      </Select>
    </FormControl>
  );
}
