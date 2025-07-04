import React, { useState, useEffect } from 'react';
import {
  Typography, Box, Table, TableBody, TableCell, TableHead, TableRow,
  Chip, Button, IconButton, TableFooter, TablePagination
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import DashboardCard from '../../components/shared/DashboardCard';
import apiService from '../../services/apiService';
import AdminCreateDialog from './AdminCreateDialog';
import AdminUpdateDialog from './AdminUpdateDialog';
import AdminDeleteDialog from './AdminDeleteDialog';

const AdminManagement = () => {
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    username: "",
    profilePicture: "",
    userType: "admin",
    isEmailVerified: false,
    password: "",
    status: true
  });
  const [selectedAdminId, setSelectedAdminId] = useState(null);
  const [adminToDelete, setAdminToDelete] = useState(null);
  
  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleDeleteClick = (admin) => {
    setAdminToDelete(admin);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await apiService.deleteAdmin(adminToDelete._id);
      if (response.data.status === 1) {
        // After deletion, we need to refetch data to keep pagination in sync
        fetchAdmins(page, rowsPerPage);
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
    setAdminToDelete(null);
  };

  const fetchAdmins = async (page = 0, limit = 10) => {
    try {
      setLoading(true);
      const response = await apiService.getAdmins(page + 1, rowsPerPage, {
        userType: 'admin'
      });
      
      if (response.data && response.data.status === 1) {
        setAdmins(response.data.data);
        setTotalCount(response.data.pagination.total);
      } else {
        throw new Error(response.data?.message || 'Failed to fetch admins');
      }
    } catch (error) {
      console.error('Error fetching admins:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins(page, rowsPerPage);
  }, [page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when changing page size
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    try {
      const response = await apiService.createAdmin(formData)
      if (response.data.status === 1) {
        // After creation, refetch the first page to show the new admin
        fetchAdmins(0, rowsPerPage);
        setFormData({
          firstName: "",
          lastName: "",
          phoneNumber: "",
          email: "",
          username: "",
          profilePicture: "",
          userType: "admin",
          isEmailVerified: false,
          password: "",
          status: true
        });
        setOpenCreateDialog(false);
      } else {
        console.log(response.data);
      }
    } catch (err) {
      console.error(err);
      console.log('An error occurred while creating admin.');
    }
  };

  const handleEditClick = (admin) => {
    setSelectedAdminId(admin._id);
    setFormData({
      firstName: admin.firstName,
      lastName: admin.lastName,
      phoneNumber: admin.phoneNumber,
      email: admin.email,
      username: admin.username,
      profilePicture: admin.profilePicture,
      userType: admin.userType,
      isEmailVerified: admin.isEmailVerified,
      password: "", // Don't pre-fill password
      status: admin.status
    });
    setOpenUpdateDialog(true);
  };

  const handleUpdateAdmin = async (e) => {
    e.preventDefault();
    try {
      const response = await apiService.updateAdmin(selectedAdminId, formData);
      if (response.data.status === 1) {
        // After update, refetch current page to reflect changes
        fetchAdmins(page, rowsPerPage);
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
      userType: "admin",
      isEmailVerified: false,
      password: "",
      status: true
    });
    setSelectedAdminId(null);
  };

  return (
    <DashboardCard
      title="Admin Management"
      action={
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpenCreateDialog(true)}
        >
          Add Admin
        </Button>
      }
    >
      <AdminCreateDialog
        open={openCreateDialog}
        handleClose={() => setOpenCreateDialog(false)}
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleCreateAdmin}
      />

      <AdminUpdateDialog
        open={openUpdateDialog}
        handleClose={() => {
          setOpenUpdateDialog(false);
          resetForm();
        }}
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleUpdateAdmin}
      />

      <AdminDeleteDialog
        open={openDeleteDialog}
        handleClose={handleCancelDelete}
        handleConfirm={handleConfirmDelete}
        adminToDelete={adminToDelete}
      />

      <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
        <Table sx={{ whiteSpace: 'nowrap', mt: 2 }}>
          <TableHead>
            <TableRow>
              <TableCell><Typography fontWeight={600}>#</Typography></TableCell>
              <TableCell><Typography fontWeight={600}>Name</Typography></TableCell>
              <TableCell><Typography fontWeight={600}>Email</Typography></TableCell>
              <TableCell><Typography fontWeight={600}>Phone</Typography></TableCell>
              <TableCell><Typography fontWeight={600}>Role</Typography></TableCell>
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
            ) : admins.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Typography>No admins found</Typography>
                </TableCell>
              </TableRow>
            ) : (
              admins.map((admin, index) => (
                <TableRow key={admin._id}>
                  <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell>{admin.firstName} {admin.lastName}</TableCell>
                  <TableCell>{admin.email}</TableCell>
                  <TableCell>{admin.phoneNumber}</TableCell>
                  <TableCell>
                    <Chip
                      label={admin.userType}
                      sx={{
                        backgroundColor:
                          admin.userType === 'superadmin' ? '#9c27b0' :
                            admin.userType === 'admin' ? '#2196f3' :
                              admin.userType === 'moderator' ? '#ff9800' :
                                '#607d8b',
                        color: '#fff'
                      }}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={admin.status ? 'Active' : 'Inactive'}
                      sx={{
                        backgroundColor: admin.status ? '#4caf50' : '#f44336',
                        color: '#fff'
                      }}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEditClick(admin)}><Edit /></IconButton>
                    <IconButton onClick={() => handleDeleteClick(admin)} color="error"><Delete /></IconButton>
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

export default AdminManagement;