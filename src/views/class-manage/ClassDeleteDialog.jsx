import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

const ClassDeleteDialog = ({ open, handleClose, handleConfirm, classToDelete }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Delete Class</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to delete{' '}
          <strong>{classToDelete?.className} - {classToDelete?.section}</strong>?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined">Cancel</Button>
        <Button onClick={handleConfirm} variant="contained" color="error">Delete</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ClassDeleteDialog;
