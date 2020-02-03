import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import tileData from './tileData';

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
    width: 500,
    height: 450,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

export default function TitlebarGridList(props) {
  const classes = useStyles();
const disclaimer= (<div><p>► We don't own any of these wallpapers. The credits go to the respective owners.</p>
<p>► Fair Use:Copyright Disclaimer Under Section 107 of the Copyright Act 1976</p>
<p>► If you are the author and would like it removed contact us</p>
</div>)
  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
  <ListSubheader component="div">{disclaimer}</ListSubheader>
        </GridListTile>
        {tileData.map(tile => (
          <GridListTile  onClick={()=> props.changeBackground(tile.videoURL,tile.img)}key={tile.img}>
            <img    src={tile.img} alt={tile.title} />
            <GridListTileBar
              title={tile.title}
              subtitle={<span>by: {tile.author}</span>}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}