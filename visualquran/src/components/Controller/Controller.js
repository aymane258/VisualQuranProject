import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Grid from '@material-ui/core/Grid';
import Modal from '../UI/Modal/Modal'
import Gallery from '../Gallery/Gallery'

import Dialog from '../UI/Dialog/Dialog'
import CheckBox from '../UI/CheckBox/CheckBox'
import TextField from '../UI/TextField/TextField'
import Select from '../Select/Select'
import * as SelectTypes from './SelectTypes'
import Recitations from '../Gallery/Recitations'



const useStyles = makeStyles(theme => ({

  card: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
  },
  cover: {
    width: 200,
  },
  controls: {
    justifyContent: 'center',
    padding: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    color: 'white',
    height: 48,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',

  },
  playIcon: {
    height: 38,
    color: 'white',
    width: 38,
  },
  checkBox: {
    display: 'flex',
    alignItems: 'center',
  },
  justifyContentCenter: {
    justifyContent: 'center',
  },
  root: {
    flexGrow: 1,
  },
}));

export default function MediaControlCard(props) {

  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <div className={classes.details}>
        <div className={classes.root}>
          <CardContent >

            <Grid container spacing={3}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                    Chapter
                </Typography>
                <Select defaultValue={props.currentSettings.currentChapterId} list={props.selectData.chapters} changed={props.settings} type={SelectTypes.CHAPTER}></Select>
              </Grid>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  Recitators
                </Typography>
          <Dialog  title="Reciters" name={"Select A Reciter" }> <Recitations list={props.selectData.recitations} changed={props.settings} /></Dialog>
              </Grid>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  Translations
                </Typography>
                <Select defaultValue={props.currentSettings.currentTranslationId} list={props.selectData.translations} changed={props.settings} type={SelectTypes.TRANSLATION}></Select>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <TextField></TextField>
              </Grid>
              <Grid item xs={4}>
                <TextField></TextField>
              </Grid>
              <Grid item xs={4}>
                <CheckBox currentCheck={props.currentCheck}onRepeat={props.onRepeat} ></CheckBox>
              </Grid>
            </Grid>
            


          </CardContent>
          <div className={classes.controls}>

            <IconButton onClick={props.onPlay}  aria-label="play/pause">
            {props.currPlay?<PlayArrowIcon className={classes.playIcon} />:<PauseIcon className={classes.playIcon}/>}
            </IconButton>

          </div>
        </div>
      </div>
      <CardMedia
        className={classes.cover}
        image={props.imgURL}
        title="Surah Kahf"
      ><Modal><Gallery changeBackground={props.changeBackground}/></Modal></CardMedia>

    </Card>
  );
}
