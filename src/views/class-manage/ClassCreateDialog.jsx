import React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Grid,
  TextField
} from "@mui/material";

const ClassCreateDialog = ({
  open,
  handleClose,
  handleSubmit,
  formData,
  handleChange,
}) => {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create New Class</DialogTitle>
      <DialogContent>
        <Box mt={2}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Class Name"
                name="className"
                value={formData.className}
                onChange={handleChange}
                placeholder="e.g. Class 10"
                inputProps={{
                  pattern: "[A-Za-z0-9 ]+",
                  title: "Alphanumeric characters and spaces only",
                }}
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!formData.className}
        >
          Create Class
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ClassCreateDialog;
