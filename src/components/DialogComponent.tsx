import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

interface IDialogComponent {
  open: boolean;
  setOpenMenu: (open: boolean) => void;
  actionButton: () => void;
  textActionButton: string,
  dialogContentText: string;
  title: string;
  children: JSX.Element;
}

const DialogComponent = ({ open, actionButton, textActionButton, title, dialogContentText, setOpenMenu, children }: IDialogComponent) => {
  return (
    <Dialog fullWidth onClose={() => setOpenMenu(false)} aria-labelledby="customized-dialog-title" open={open}>
      <DialogTitle id="customized-dialog-title">
        {title}
      </DialogTitle>
      <DialogContent dividers>
        <DialogContentText>
          <h3>{dialogContentText}</h3>
        </DialogContentText>
        {children}
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={ actionButton} color="primary">
          {textActionButton}
        </Button>
        <Button autoFocus onClick={() => setOpenMenu(false)} color="primary">
          Salir
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DialogComponent;
