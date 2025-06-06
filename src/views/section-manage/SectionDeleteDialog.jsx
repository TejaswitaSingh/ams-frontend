import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Typography, Button
} from '@mui/material';

const SectionDeleteDialog = ({ open, handleClose, handleConfirm, sectionToDelete }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Delete Section</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to delete section "{sectionToDelete?.sectionName}"?
          This action cannot be undone.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleConfirm} variant="contained" color="error">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SectionDeleteDialog;