import React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";

const sections = ["A", "B", "C", "D", "E", "F", "G", "H"]; // Expanded sections list

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
            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Section</InputLabel>
                <Select
                  name="section"
                  value={formData.section}
                  onChange={handleChange}
                  label="Section"
                >
                  {sections.map((sec) => (
                    <MenuItem key={sec} value={sec}>
                      Section {sec}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Teacher and Student Headings */}
            <Grid item xs={12}>
              <Typography variant="h6" color="textSecondary" mt={2}>
                Class Teacher (Data will be connected later)
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" color="textSecondary" mt={2}>
                Students (Data will be connected later)
              </Typography>
            </Grid>
          </Grid>

          {formData.className && formData.section && (
            <Box mt={2}>
              <Typography variant="caption" color="textSecondary">
                Class Code will be automatically generated as:{" "}
                <strong>
                  c-{formData.className.toLowerCase().match(/\d+/)?.[0] ||
                    formData.className.toLowerCase().replace(/\s+/g, "-")}
                  -{formData.section.toLowerCase()}
                </strong>
              </Typography>
            </Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!formData.className || !formData.section}
        >
          Create Class
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ClassCreateDialog;
