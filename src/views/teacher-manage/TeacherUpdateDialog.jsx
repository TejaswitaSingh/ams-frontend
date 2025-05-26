import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Grid,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Chip,
  Autocomplete
} from "@mui/material";

const TeacherUpdateDialog = ({ 
  open, 
  handleClose, 
  handleSubmit, 
  formData, 
  handleChange 
}) => {
  const [subjectInput, setSubjectInput] = React.useState("");
  
  const commonSubjects = [
    "Mathematics",
    "Science",
    "English",
    "History",
    "Geography",
    "Physics",
    "Chemistry",
    "Biology",
    "Computer Science",
    "Art",
    "Music",
    "Physical Education"
  ];

  const handleAddSubject = () => {
    if (subjectInput && !formData.subjects.includes(subjectInput)) {
      handleChange({
        target: {
          name: "subjects",
          value: [...formData.subjects, subjectInput]
        }
      });
      setSubjectInput("");
    }
  };

  const handleRemoveSubject = (subjectToRemove) => {
    handleChange({
      target: {
        name: "subjects",
        value: formData.subjects.filter(subject => subject !== subjectToRemove)
      }
    });
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Update Teacher</DialogTitle>
      <DialogContent>
        <Box mt={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Profile Picture URL"
                name="profilePicture"
                value={formData.profilePicture}
                onChange={handleChange}
              />
            </Grid>

            {/* Teacher-specific fields */}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <Autocomplete
                  multiple
                  freeSolo
                  options={commonSubjects}
                  value={formData.subjects || []}
                  onChange={(event, newValue) => {
                    handleChange({
                      target: {
                        name: "subjects",
                        value: newValue
                      }
                    });
                  }}
                  inputValue={subjectInput}
                  onInputChange={(event, newInputValue) => {
                    setSubjectInput(newInputValue);
                  }}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        label={option}
                        {...getTagProps({ index })}
                        onDelete={() => handleRemoveSubject(option)}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Subjects"
                      placeholder="Add subjects teacher can teach"
                    />
                  )}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Qualifications"
                name="qualifications"
                value={formData.qualifications}
                onChange={handleChange}
                multiline
                rows={3}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Years of Experience"
                name="experience"
                type="number"
                value={formData.experience}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                multiline
                rows={4}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  label="Status"
                >
                  <MenuItem value={true}>Active</MenuItem>
                  <MenuItem value={false}>Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Email Verified</InputLabel>
                <Select
                  name="isEmailVerified"
                  value={formData.isEmailVerified}
                  onChange={handleChange}
                  label="Email Verified"
                >
                  <MenuItem value={true}>Yes</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
          Update Teacher
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TeacherUpdateDialog;