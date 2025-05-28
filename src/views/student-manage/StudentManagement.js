import React, { useState, useEffect } from 'react';
import {
  Typography, Box, Table, TableBody, TableCell, TableHead, TableRow,
  Chip, Button, IconButton, TableFooter, TablePagination
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import DashboardCard from '../../components/shared/DashboardCard';
import apiService from '../../services/apiService';
import StudentCreateDialog from './StudentCreateDialog';
import StudentDeleteDialog from './StudentDeleteDialog';
import StudentUpdateDialog from './StudentUpdateDialog';


const StudentManagement = () => {
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    profilePicture: "",
    userType: "student",
    isEmailVerified: false,
    password: "",
    status: "pending",
    enrollmentDate: new Date()
  });
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [studentToDelete, setStudentToDelete] = useState(null);
  
  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleDeleteClick = (student) => {
    setStudentToDelete(student);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await apiService.deleteStudent(studentToDelete._id);
      if (response.data.status === 1) {
        fetchStudents(page, rowsPerPage);
        setOpenDeleteDialog(false);
      } else {
        console.log(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancelDelete = () => {
    setOpenDeleteDialog(false);
    setStudentToDelete(null);
  };

  const fetchStudents = async (page = 0, limit = 10) => {
    try {
      setLoading(true);
      const response = await apiService.getStudents(page + 1, rowsPerPage, {
        userType: 'student'
      });
      
      if (response.data && response.data.status === 1) {
        setStudents(response.data.data);
        setTotalCount(response.data.pagination.total);
      } else {
        throw new Error(response.data?.message || 'Failed to fetch students');
      }
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents(page, rowsPerPage);
  }, [page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleCreateStudent = async (e) => {
    e.preventDefault();
    try {
      const response = await apiService.createStudent(formData)
      if (response.data.status === 1) {
        fetchStudents(0, rowsPerPage);
        resetForm();
        setOpenCreateDialog(false);
      } else {
        console.log(response.data);
      }
    } catch (err) {
      console.error(err);
      console.log('An error occurred while creating student.');
    }
  };

  const handleEditClick = (student) => {
    setSelectedStudentId(student._id);
    setFormData({
      firstName: student.firstName,
      lastName: student.lastName,
      phoneNumber: student.phoneNumber,
      email: student.email,
      profilePicture: student.profilePicture,
      userType: student.userType,
      isEmailVerified: student.isEmailVerified,
      password: "",
      status: student.status,
      enrollmentDate: student.enrollmentDate
    });
    setOpenUpdateDialog(true);
  };

  const handleUpdateStudent = async (e) => {
    e.preventDefault();
    try {
      const response = await apiService.updateStudent(selectedStudentId, formData);
      if (response.data.status === 1) {
        fetchStudents(page, rowsPerPage);
        resetForm();
        setOpenUpdateDialog(false);
      } else {
        console.log(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      profilePicture: "",
      userType: "student",
      isEmailVerified: false,
      password: "",
      status: "pending",
      enrollmentDate: new Date()
    });
    setSelectedStudentId(null);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const statusColor = (status) => {
    switch(status) {
      case 'active': return '#4caf50';
      case 'inactive': return '#f44336';
      case 'pending': return '#ff9800';
      default: return '#9e9e9e';
    }
  };

  return (
    <DashboardCard
      title="Student Management"
      action={
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpenCreateDialog(true)}
        >
          Add Student
        </Button>
      }
    >
      <StudentCreateDialog
        open={openCreateDialog}
        handleClose={() => setOpenCreateDialog(false)}
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleCreateStudent}
      />

      <StudentUpdateDialog
        open={openUpdateDialog}
        handleClose={() => {
          setOpenUpdateDialog(false);
          resetForm();
        }}
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleUpdateStudent}
      />

      <StudentDeleteDialog
        open={openDeleteDialog}
        handleClose={handleCancelDelete}
        handleConfirm={handleConfirmDelete}
        studentToDelete={studentToDelete}
      />

      <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
        <Table sx={{ whiteSpace: 'nowrap', mt: 2 }}>
          <TableHead>
            <TableRow>
              <TableCell><Typography fontWeight={600}>#</Typography></TableCell>
              <TableCell><Typography fontWeight={600}>Name</Typography></TableCell>
              <TableCell><Typography fontWeight={600}>Email</Typography></TableCell>
              <TableCell><Typography fontWeight={600}>Phone</Typography></TableCell>
              <TableCell><Typography fontWeight={600}>Enrollment Date</Typography></TableCell>
              <TableCell><Typography fontWeight={600}>Status</Typography></TableCell>
              <TableCell><Typography fontWeight={600}>Actions</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Typography>Loading...</Typography>
                </TableCell>
              </TableRow>
            ) : students.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Typography>No students found</Typography>
                </TableCell>
              </TableRow>
            ) : (
              students.map((student, index) => (
                <TableRow key={student._id}>
                  <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell>{student.firstName} {student.lastName}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.phoneNumber}</TableCell>
                  <TableCell>{formatDate(student.enrollmentDate)}</TableCell>
                  <TableCell>
                    <Chip
                      label={student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                      sx={{
                        backgroundColor: statusColor(student.status),
                        color: '#fff'
                      }}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEditClick(student)}><Edit /></IconButton>
                    <IconButton onClick={() => handleDeleteClick(student)} color="error"><Delete /></IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                colSpan={7}
                count={totalCount}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </Box>
    </DashboardCard>
  );
};

export default StudentManagement;