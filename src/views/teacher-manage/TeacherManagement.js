import React, { useState, useEffect } from 'react';
import {
  Typography, Box, Table, TableBody, TableCell, TableHead, TableRow,
  Chip, Button, IconButton, TableFooter, TablePagination
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import DashboardCard from '../../components/shared/DashboardCard';
import apiService from '../../services/apiService';
import TeacherCreateDialog from './TeacherCreateDialog';
import TeacherUpdateDialog from './TeacherUpdateDialog';
import TeacherDeleteDialog from './TeacherDeleteDialog';

const TeacherManagement = () => {
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    username: "",
    profilePicture: "",
    userType: "teacher",
    isEmailVerified: false,
    password: "",
    classes:[],
    status: true
  });
  const [selectedTeacherId, setSelectedTeacherId] = useState(null);
  const [teacherToDelete, setTeacherToDelete] = useState(null);
  
  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleDeleteClick = (teacher) => {
    setTeacherToDelete(teacher);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await apiService.deleteTeacher(teacherToDelete._id);
      if (response.data.status === 1) {
        fetchTeachers(page, rowsPerPage);
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
    setTeacherToDelete(null);
  };

  const fetchTeachers = async (page = 0, limit = 10) => {
    try {
      setLoading(true);
      const response = await apiService.getTeachers(page + 1, rowsPerPage, {
        status: 'active',
        userType: 'teacher'
      });
      
      if (response.data && response.data.status === 1) {
        setTeachers(response.data.data);
        setTotalCount(response.data.pagination.total);
      } else {
        throw new Error(response.data?.message || 'Failed to fetch teachers');
      }
    } catch (error) {
      console.error('Error fetching teachers:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers(page, rowsPerPage);
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

  const handleCreateTeacher = async (e) => {
    e.preventDefault();
    try {
      const response = await apiService.createTeacher(formData)
      if (response.data.status === 1) {
        fetchTeachers(0, rowsPerPage);
        resetForm();
        setOpenCreateDialog(false);
      } else {
        console.log(response.data);
      }
    } catch (err) {
      console.error(err);
      console.log('An error occurred while creating teacher.');
    }
  };

  const handleEditClick = (teacher) => {
    setSelectedTeacherId(teacher._id);
    setFormData({
      firstName: teacher.firstName,
      lastName: teacher.lastName,
      phoneNumber: teacher.phoneNumber,
      email: teacher.email,
      username: teacher.username,
      profilePicture: teacher.profilePicture,
      userType: teacher.userType,
      isEmailVerified: teacher.isEmailVerified,
      password: "",
      classes:teacher.classes || [],
      status: teacher.status
    });
    setOpenUpdateDialog(true);
  };

  const handleUpdateTeacher = async (e) => {
    e.preventDefault();
    try {
      const response = await apiService.updateTeacher(selectedTeacherId, formData);
      if (response.data.status === 1) {
        fetchTeachers(page, rowsPerPage);
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
      username: "",
      profilePicture: "",
      userType: "teacher",
      isEmailVerified: false,
      password: "",
      classes:[],
      status: true
    });
    setSelectedTeacherId(null);
  };

  return (
    <DashboardCard
      title="Teacher Management"
      action={
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpenCreateDialog(true)}
        >
          Add Teacher
        </Button>
      }
    >
      <TeacherCreateDialog
        open={openCreateDialog}
        handleClose={() => setOpenCreateDialog(false)}
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleCreateTeacher}
      />

      <TeacherUpdateDialog
        open={openUpdateDialog}
        handleClose={() => {
          setOpenUpdateDialog(false);
          resetForm();
        }}
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleUpdateTeacher}
      />

      <TeacherDeleteDialog
        open={openDeleteDialog}
        handleClose={handleCancelDelete}
        handleConfirm={handleConfirmDelete}
        teacherToDelete={teacherToDelete}
      />

      <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
        <Table sx={{ whiteSpace: 'nowrap', mt: 2 }}>
          <TableHead>
            <TableRow>
              <TableCell><Typography fontWeight={600}>#</Typography></TableCell>
              <TableCell><Typography fontWeight={600}>Name</Typography></TableCell>
              <TableCell><Typography fontWeight={600}>Email</Typography></TableCell>
              <TableCell><Typography fontWeight={600}>Phone</Typography></TableCell>
              <TableCell><Typography fontWeight={600}>Subjects</Typography></TableCell>
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
            ) : teachers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Typography>No teachers found</Typography>
                </TableCell>
              </TableRow>
            ) : (
              teachers.map((teacher, index) => (
                <TableRow key={teacher._id}>
                  <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell>{teacher.firstName} {teacher.lastName}</TableCell>
                  <TableCell>{teacher.email}</TableCell>
                  <TableCell>{teacher.phoneNumber}</TableCell>
                  <TableCell>
                    {teacher.subjects?.slice(0, 2).map((subject, i) => (
                      <Chip 
                        key={i} 
                        label={subject} 
                        size="small" 
                        sx={{ mr: 0.5, mb: 0.5 }} 
                      />
                    ))}
                    {teacher.subjects?.length > 2 && (
                      <Chip 
                        label={`+${teacher.subjects.length - 2}`} 
                        size="small" 
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={teacher.status ? 'Active' : 'Inactive'}
                      sx={{
                        backgroundColor: teacher.status ? '#4caf50' : '#f44336',
                        color: '#fff'
                      }}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEditClick(teacher)}><Edit /></IconButton>
                    <IconButton onClick={() => handleDeleteClick(teacher)} color="error"><Delete /></IconButton>
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

export default TeacherManagement;
