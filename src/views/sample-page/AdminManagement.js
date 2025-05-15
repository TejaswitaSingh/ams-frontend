import React, { useState } from 'react';
import {
    Typography, Box,
    Table, TableBody, TableCell, TableHead, TableRow,
    Chip, Button, IconButton
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import DashboardCard from '../../components/shared/DashboardCard';

const initialAdmins = [
    {
        id: "1",
        name: "Admin One",
        role: "Super Admin",
        status: "Active",
        statusColor: "success.main",
        email: "admin1@example.com"
    },
    {
        id: "2",
        name: "Admin Two",
        role: "Moderator",
        status: "Inactive",
        statusColor: "error.main",
        email: "admin2@example.com"
    },
];

const AdminManagement = () => {
    const [admins, setAdmins] = useState(initialAdmins);

    const handleAddAdmin = () => {
        alert("Add admin modal logic here");
    };

    const handleEdit = (id) => {
        alert(`Edit logic for admin ID: ${id}`);
    };

    const handleDelete = (id) => {
        const confirm = window.confirm("Are you sure you want to delete this admin?");
        if (confirm) {
            setAdmins(admins.filter(admin => admin.id !== id));
        }
    };

    return (
        <DashboardCard
            title="Admin Management"
            action={
                <Button variant="contained" startIcon={<Add />} onClick={handleAddAdmin}>
                    Add Admin
                </Button>
            }
        >
            <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
                <Table aria-label="admin table" sx={{ whiteSpace: 'nowrap', mt: 2 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell><Typography variant="subtitle2" fontWeight={600}>ID</Typography></TableCell>
                            <TableCell><Typography variant="subtitle2" fontWeight={600}>Name</Typography></TableCell>
                            <TableCell><Typography variant="subtitle2" fontWeight={600}>Email</Typography></TableCell>
                            <TableCell><Typography variant="subtitle2" fontWeight={600}>Role</Typography></TableCell>
                            <TableCell><Typography variant="subtitle2" fontWeight={600}>Status</Typography></TableCell>
                            <TableCell><Typography variant="subtitle2" fontWeight={600}>Actions</Typography></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {admins.map((admin) => (
                            <TableRow key={admin.id}>
                                <TableCell>{admin.id}</TableCell>
                                <TableCell>{admin.name}</TableCell>
                                <TableCell>{admin.email}</TableCell>
                                <TableCell>{admin.role}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={admin.status}
                                        sx={{ backgroundColor: admin.statusColor, color: '#fff' }}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleEdit(admin.id)}><Edit /></IconButton>
                                    <IconButton onClick={() => handleDelete(admin.id)}><Delete /></IconButton>
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
