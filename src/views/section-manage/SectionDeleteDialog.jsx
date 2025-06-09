import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Typography, Button, Box
} from '@mui/material';

const SectionDeleteDialog = ({ open, handleClose, handleConfirm, sectionToDelete }) => {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Delete Section</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 1 }}>
          <Typography>
            Are you sure you want to delete the section{' '}
            <strong>"{sectionToDelete?.sectionName}"</strong>? <br />
            This action cannot be undone.
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary" variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleConfirm} variant="contained" color="error">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SectionDeleteDialog;
