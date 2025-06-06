import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Typography
} from '@mui/material';

const ClassUpdateDialog = ({
  open,
  handleClose,
  formData,
  handleChange,
  handleSubmit
}) => {
  const isFormValid = formData.className;

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Update Class</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="className"
                label="Class Name"
                value={formData.className}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="classTeacher"
                label="Class Teacher ID (optional)"
                value={formData.classTeacher || ''}
                onChange={handleChange}
              />
            </Grid>

            {formData.className && (
              <Grid item xs={12}>
                <Typography variant="caption" color="textSecondary">
                  Class Code will be regenerated automatically as:{' '}
                  <strong>
                    c-{formData.className.toLowerCase().match(/\d+/)?.[0] ||
                      formData.className.toLowerCase().replace(/\s+/g, '')}
                  </strong>
                </Typography>
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={!isFormValid}>
            Update
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ClassUpdateDialog;
