import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Grid
} from '@mui/material';

const ClassUpdateDialog = ({ open, handleClose, formData, handleChange, handleSubmit }) => {
  const isFormValid = formData.className && formData.section; // Ensure className and section are provided

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Update Class</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="className"
                label="Class Name"
                value={formData.className}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="section"
                label="Section"
                value={formData.section}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="classTeacher"
                label="Class Teacher ID"
                value={formData.classTeacher || ''}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">Cancel</Button>
          <Button type="submit" variant="contained" disabled={!isFormValid}>Update</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ClassUpdateDialog;
