import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button
} from "@mui/material";

const StudentDeleteDialog = ({
  open,
  handleClose,
  handleConfirm,
  studentToDelete
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Confirm Student Deletion</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to delete student {studentToDelete?.firstName} {studentToDelete?.lastName}?
        </Typography>
        <Typography variant="body2" mt={1}>
          Email: {studentToDelete?.email}
        </Typography>
        <Typography variant="body2" mt={1}>
          Username: {studentToDelete?.username || "N/A"}
        </Typography>
        <Typography variant="body2" color="error" mt={2}>
          Warning: This will permanently remove the student's account and all associated data.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={handleConfirm}
          color="error"
          variant="contained"
        >
          Delete Student
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StudentDeleteDialog;
