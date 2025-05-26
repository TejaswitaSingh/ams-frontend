import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button
} from "@mui/material";

const TeacherDeleteDialog = ({ 
  open, 
  handleClose, 
  handleConfirm,
  teacherToDelete 
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Confirm Teacher Deletion</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to delete teacher {teacherToDelete?.firstName} {teacherToDelete?.lastName}?
        </Typography>
        <Typography variant="body2" mt={1}>
          Subjects: {teacherToDelete?.subjects?.join(", ") || "No subjects assigned"}
        </Typography>
        <Typography variant="body2" color="error" mt={2}>
          Warning: This will permanently remove the teacher's account and all associated data.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button 
          onClick={handleConfirm} 
          color="error"
          variant="contained"
        >
          Delete Teacher
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TeacherDeleteDialog;