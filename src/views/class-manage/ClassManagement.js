import React, { useEffect, useState } from 'react';
import {
  Typography, Box, Table, TableBody, TableCell, TableHead, TableRow,
  Button, IconButton, TableFooter, TablePagination, Chip,
  Menu, MenuItem
} from '@mui/material';
import { Add, MoreVert, Edit, Delete, List } from '@mui/icons-material';
import DashboardCard from '../../components/shared/DashboardCard';
import apiService from '../../services/apiService';
import ClassCreateDialog from './ClassCreateDialog';
import ClassUpdateDialog from './ClassUpdateDialog';
import ClassDeleteDialog from './ClassDeleteDialog';
import { useNavigate } from 'react-router-dom';

const ClassManagement = () => {
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const [formData, setFormData] = useState({
    className: ''
  });
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [classToDelete, setClassToDelete] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchClasses = async () => {
    setLoading(true);
    try {
      const res = await apiService.getClasses(page + 1, rowsPerPage);
      if (res.data.status === 1) {
        setClasses(res.data.data);
        setTotalCount(res.data.pagination.total);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, [page, rowsPerPage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await apiService.createClass({ className: formData.className });
      if (res.data.status === 1) {
        fetchClasses();
        setFormData({ className: '' });
        setOpenCreate(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await apiService.updateClass(selectedClassId, { className: formData.className });
      if (res.data.status === 1) {
        fetchClasses();
        setFormData({ className: '' });
        setOpenUpdate(false);
        setSelectedClassId(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await apiService.deleteClass(classToDelete._id);
      if (res.data.status === 1) {
        fetchClasses();
        setOpenDelete(false);
        setClassToDelete(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleMenuOpen = (event, cls) => {
    setAnchorEl(event.currentTarget);
    setSelectedClass(cls);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedClass(null);
  };

  const handleEditClick = () => {
    if (selectedClass) {
      setSelectedClassId(selectedClass._id);
      setFormData({ className: selectedClass.className });
      setOpenUpdate(true);
    }
    handleMenuClose();
  };

  const handleDeleteClick = () => {
    if (selectedClass) {
      setClassToDelete(selectedClass);
      setOpenDelete(true);
    }
    handleMenuClose();
  };

  const handleSectionsClick = () => {
    if (selectedClass) {
      navigate(`/section-management`,{ state: { class: selectedClass } });
    }
    handleMenuClose();
  };

  return (
    <DashboardCard
      title="Class Management"
      action={
        <Button startIcon={<Add />} variant="contained" onClick={() => setOpenCreate(true)}>
          Add Class
        </Button>
      }
    >
      {/* Create Dialog */}
      <ClassCreateDialog
        open={openCreate}
        handleClose={() => setOpenCreate(false)}
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleCreate}
      />

      {/* Update Dialog */}
      <ClassUpdateDialog
        open={openUpdate}
        handleClose={() => {
          setOpenUpdate(false);
          setSelectedClassId(null);
        }}
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleUpdate}
      />

      {/* Delete Dialog */}
      <ClassDeleteDialog
        open={openDelete}
        handleClose={() => {
          setOpenDelete(false);
          setClassToDelete(null);
        }}
        handleConfirm={handleDelete}
        classToDelete={classToDelete}
      />

      <Box sx={{ overflow: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>S.No.</TableCell>
              <TableCell>Class Name</TableCell>
              <TableCell>Class Code</TableCell>
              <TableCell>No. of Students</TableCell>
              <TableCell>No. of Teachers</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center">Loading...</TableCell>
              </TableRow>
            ) : classes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">No classes found</TableCell>
              </TableRow>
            ) : (
              classes.map((cls, i) => (
                <TableRow key={cls._id}>
                  <TableCell>{page * rowsPerPage + i + 1}</TableCell>
                  <TableCell>{cls.className}</TableCell>
                  <TableCell>
                    <Chip label={cls.classCode} variant="outlined" />
                  </TableCell>
                  <TableCell>{cls.studentCount || 0}</TableCell>
                  <TableCell>{cls.teacherCount || 0}</TableCell>
                  <TableCell>
                    <IconButton onClick={(e) => handleMenuOpen(e, cls)}>
                      <MoreVert />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                count={totalCount}
                page={page}
                rowsPerPage={rowsPerPage}
                onPageChange={(e, newPage) => setPage(newPage)}
                onRowsPerPageChange={(e) => {
                  setRowsPerPage(parseInt(e.target.value, 10));
                  setPage(0);
                }}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </Box>

      {/* Actions Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEditClick}>
          <Edit fontSize="small" sx={{ mr: 1 }} /> Edit
        </MenuItem>
        <MenuItem onClick={handleDeleteClick}>
          <Delete fontSize="small" sx={{ mr: 1 }} /> Delete
        </MenuItem>
        <MenuItem onClick={handleSectionsClick}>
          <List fontSize="small" sx={{ mr: 1 }} /> Sections
        </MenuItem>
      </Menu>
    </DashboardCard>
  );
};

export default ClassManagement;
