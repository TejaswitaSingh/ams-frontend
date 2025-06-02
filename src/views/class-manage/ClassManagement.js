import React, { useEffect, useState } from 'react';
import {
  Typography, Box, Table, TableBody, TableCell, TableHead, TableRow,
  Button, IconButton, TableFooter, TablePagination, Chip
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import DashboardCard from '../../components/shared/DashboardCard';
import apiService from '../../services/apiService';
import ClassCreateDialog from './ClassCreateDialog';
import ClassUpdateDialog from './ClassUpdateDialog';
import ClassDeleteDialog from './ClassDeleteDialog';

const ClassManagement = () => {
  const [classes, setClasses] = useState([]);
  const [formData, setFormData] = useState({ 
    className: '', 
    section: '',
    classTeacher: null
  });
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [classToDelete, setClassToDelete] = useState(null);

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
      const res = await apiService.createClass(formData);
      if (res.data.status === 1) {
        fetchClasses();
        setFormData({ className: '', section: '', classTeacher: null });
        setOpenCreate(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await apiService.updateClass(selectedClassId, formData);
      if (res.data.status === 1) {
        fetchClasses();
        setFormData({ className: '', section: '', classTeacher: null });
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

  return (
    <DashboardCard
      title="Class Management"
      action={
        <Button startIcon={<Add />} variant="contained" onClick={() => setOpenCreate(true)}>
          Add Class
        </Button>
      }
    >
      <ClassCreateDialog
        open={openCreate}
        handleClose={() => setOpenCreate(false)}
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleCreate}
      />

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
              <TableCell>#</TableCell>
              <TableCell>Class Name</TableCell>
              <TableCell>Section</TableCell>
              <TableCell>Class Code</TableCell>
              <TableCell>Students Count</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={6} align="center">Loading...</TableCell></TableRow>
            ) : classes.length === 0 ? (
              <TableRow><TableCell colSpan={6} align="center">No classes found</TableCell></TableRow>
            ) : (
              classes.map((cls, i) => (
                <TableRow key={cls._id}>
                  <TableCell>{page * rowsPerPage + i + 1}</TableCell>
                  <TableCell>{cls.className}</TableCell>
                  <TableCell>{cls.section}</TableCell>
                  <TableCell>
                    <Chip label={cls.classCode} variant="outlined" />
                  </TableCell>
                  <TableCell>{cls.students?.length || 0}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => {
                      setSelectedClassId(cls._id);
                      setFormData({ 
                        className: cls.className, 
                        section: cls.section,
                        classTeacher: cls.classTeacher
                      });
                      setOpenUpdate(true);
                    }}><Edit /></IconButton>
                    <IconButton onClick={() => {
                      setClassToDelete(cls);
                      setOpenDelete(true);
                    }} color="error"><Delete /></IconButton>
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
    </DashboardCard>
  );
};

export default ClassManagement;