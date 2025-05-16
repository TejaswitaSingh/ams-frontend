import React, { useState, useEffect } from 'react';
import {
  Typography, Box, Table, TableBody, TableCell, TableHead, TableRow,
  Chip, Button, IconButton
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import DashboardCard from '../../components/shared/DashboardCard';
import apiService from '../../services/apiService';
import AdminCreateDialog from './AdminCreateDialog';

const AdminManagement = () => {
  const [openDialog, setOpenDialog] = useState(false);
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

  const fetchAdmins = async () => {
    try {
      const response = await apiService.getAdmins();
      if (response.data && response.data.status === 1) {
        setAdmins(response.data.data);
      }else {
        throw new Error(response.data?.message || 'Failed to fetch admins');
      }
    } catch (error) {
      console.error('Error fetching admins:', error);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

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
        setAdmins(prev => [...prev, response.data]);
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
        setOpenDialog(false);
        // fetchAdmins(); // Refresh the list
      } else {
        console.log(response.data);
      }
    } catch (err) {
      console.error(err);
      console.log('An error occurred while creating admin.');
    }
  };

  return (
    <DashboardCard
      title="Admin Management"
      action={
        <Button 
          variant="contained" 
          startIcon={<Add />} 
          onClick={() => setOpenDialog(true)}
        >
          Add Admin
        </Button>
      }
    >
      <AdminCreateDialog
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleCreateAdmin}
      />

      <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
        <Table sx={{ whiteSpace: 'nowrap', mt: 2 }}>
          <TableHead>
            <TableRow>
              <TableCell><Typography fontWeight={600}>ID</Typography></TableCell>
              <TableCell><Typography fontWeight={600}>Name</Typography></TableCell>
              <TableCell><Typography fontWeight={600}>Email</Typography></TableCell>
              <TableCell><Typography fontWeight={600}>Phone</Typography></TableCell>
              <TableCell><Typography fontWeight={600}>Role</Typography></TableCell>
              <TableCell><Typography fontWeight={600}>Status</Typography></TableCell>
              <TableCell><Typography fontWeight={600}>Actions</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {admins.map((admin, index) => (
              <TableRow key={admin._id || index}>
                <TableCell>{admin._id}</TableCell>
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
                  <IconButton><Edit /></IconButton>
                  <IconButton><Delete /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </DashboardCard>
  );
};

export default AdminManagement;