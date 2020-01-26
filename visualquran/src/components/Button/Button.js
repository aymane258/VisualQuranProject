import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import PhotoIcon from '@material-ui/icons/Photo';



const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(7)
      
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const  Button =(props) =>{
  const classes = useStyles();

  return (
    <div onClick={props.clicked}  className={classes.root}>
     
      <Fab color="secondary" aria-label="edit">
      <PhotoIcon />
      </Fab>
    </div>
  );
}

export default Button
