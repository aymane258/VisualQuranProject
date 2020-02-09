import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';

import './gallery.css'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    border: '1px solid',
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
  },

  gridList: {
    width: 400,
    height: 500,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

export default function TitlebarGridList(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
        <GridListTile key="Recitation" cols={2} style={{ height: 'auto' }}>
        </GridListTile>
        {props.list.map(recitor => (
          <GridListTile  onClick={()=> props.changed(recitor.id,"RECITATION")}key={recitor.id}>
            <img src={recitor.imgURL} alt={recitor.reciter_name_eng} />
            <GridListTileBar
              title={recitor.reciter_name_eng}
              subtitle= {recitor.style}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}