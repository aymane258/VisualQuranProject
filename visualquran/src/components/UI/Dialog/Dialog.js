import React, { Children } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div >
      <Button key={props.name} variant="outlined" color="primary" onClick={handleClickOpen}>
      {props.name}
      </Button>
      <Dialog  open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
  <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
        <DialogContent onClick={handleClose}>
          {props.children}
        </DialogContent>
      </Dialog>
    </div>
  );
}
