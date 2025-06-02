import React, { useState, useEffect } from "react";
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
  Autocomplete,
  CircularProgress
} from "@mui/material";

const sections = ["A", "B", "C", "D", "E", "F", "G", "H"]; // Expanded sections list

const ClassCreateDialog = ({
  open,
  handleClose,
  handleSubmit,
  formData,
  handleChange,
  teachers = [] // Assuming teachers list will be passed as prop
}) => {
  const [loadingTeachers, setLoadingTeachers] = useState(false);
  const [teacherOptions, setTeacherOptions] = useState([]);

  // Fetch teachers if not provided (you might want to fetch them in parent component instead)
  useEffect(() => {
    if (open && teachers.length === 0) {
      setLoadingTeachers(true);
      // Simulate API call to fetch teachers
      setTimeout(() => {
        setTeacherOptions([
          { _id: "1", name: "John Doe" },
          { _id: "2", name: "Jane Smith" },
          { _id: "3", name: "Robert Johnson" }
        ]);
        setLoadingTeachers(false);
      }, 1000);
    } else {
      setTeacherOptions(teachers);
    }
  }, [open, teachers]);

  const handleTeacherChange = (event, newValue) => {
    handleChange({
      target: {
        name: "classTeacher",
        value: newValue?._id || null
      }
    });
  };

  const getTeacherNameById = (id) => {
    return teacherOptions.find(teacher => teacher._id === id)?.name || '';
  };

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
                  pattern: "[A-Za-z0-9 ]+", // Basic validation
                  title: "Alphanumeric characters and spaces only"
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
            <Grid item xs={12}>
              <Autocomplete
                options={teacherOptions}
                getOptionLabel={(option) => option.name}
                value={teacherOptions.find(t => t._id === formData.classTeacher) || null}
                onChange={handleTeacherChange}
                loading={loadingTeachers}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Class Teacher"
                    placeholder="Search teacher..."
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {loadingTeachers ? <CircularProgress color="inherit" size={20} /> : null}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }}
                  />
                )}
                isOptionEqualToValue={(option, value) => option._id === value._id}
              />
            </Grid>
          </Grid>
          {formData.className && formData.section && (
            <Box mt={2}>
              <Typography variant="caption" color="textSecondary">
                Class Code will be automatically generated as:{" "}
                <strong>
                  c-{formData.className.toLowerCase().match(/\d+/)?.[0] || formData.className.toLowerCase().replace(/\s+/g, '-')}-{formData.section.toLowerCase()}
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