import React, { useEffect, useState } from 'react';
import {
  Typography, Box, Table, TableBody, TableCell, TableHead, TableRow,
  Button, IconButton, TableFooter, TablePagination, Chip,
  Menu, MenuItem, Select, FormControl, InputLabel, Grid
} from '@mui/material';
import { Add, MoreVert, Delete, Edit } from '@mui/icons-material';
import DashboardCard from '../../components/shared/DashboardCard';
import apiService from '../../services/apiService';
import SectionCreateDialog from './SectionCreateDialog';
import SectionDeleteDialog from './SectionDeleteDialog';
import { useLocation } from 'react-router';

const SectionManagement = () => {
  const location = useLocation();
  const classFromState = location.state?.class || null;
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(classFromState?._id || '');
  const [sections, setSections] = useState([]);
  const [formData, setFormData] = useState({ sectionName: '', classId: '' });
  const [sectionToDelete, setSectionToDelete] = useState(null);
  const [openCreate, setOpenCreate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchClasses = async () => {
    try {
      const res = await apiService.getClasses(1, 100);
      if (res.data.status === 1) setClasses(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchSections = async () => {
    if (!selectedClass) return;
    setLoading(true);
    try {
      const res = await apiService.getSections(selectedClass, page + 1, rowsPerPage);
      if (res.data.status === 1) {
        setSections(res.data.data);
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
    if (classFromState) setSelectedClass(classFromState._id);
  }, []);

  useEffect(() => {
    if (selectedClass) fetchSections();
    else setSections([]);
  }, [selectedClass, page, rowsPerPage]);

  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
    setPage(0);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await apiService.createSection({ ...formData, classId: selectedClass });
      if (res.data.status === 1) {
        fetchSections();
        setFormData({ sectionName: '', classId: '' });
        setOpenCreate(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await apiService.deleteSection(sectionToDelete._id);
      if (res.data.status === 1) {
        fetchSections();
        setOpenDelete(false);
        setSectionToDelete(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleMenuOpen = (event, section) => {
    setAnchorEl(event.currentTarget);
    setSelectedSection(section);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedSection(null);
  };

  const handleDeleteClick = () => {
    if (selectedSection) {
      setSectionToDelete(selectedSection);
      setOpenDelete(true);
    }
    handleMenuClose();
  };

  const handleEditClick = () => {
    if (selectedSection) {
      setFormData({ sectionName: selectedSection.sectionName, classId: selectedClass });
      setOpenCreate(true);
    }
    handleMenuClose();
  };

  const generateSectionCode = (className, sectionName) => {
    if (!className || !sectionName) return '';
    const classNumber = className.match(/\d+/)?.[0] || '';
    const sectionLetter = sectionName.charAt(0).toLowerCase();
    return `c-${classNumber}-${sectionLetter}`;
  };

  return (
    <DashboardCard title="Section Management">
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel id="class-select-label">Select Class</InputLabel>
            <Select
              labelId="class-select-label"
              value={selectedClass}
              label="Select Class"
              onChange={handleClassChange}
            >
              {classes.map((cls) => (
                <MenuItem key={cls._id} value={cls._id}>
                  {cls.className}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            startIcon={<Add />}
            variant="contained"
            onClick={() => {
              if (!selectedClass) {
                alert('Please select a class first');
                return;
              }
              setFormData({ sectionName: '', classId: selectedClass });
              setOpenCreate(true);
            }}
            disabled={!selectedClass}
          >
            Add Section
          </Button>
        </Grid>
      </Grid>

      <SectionCreateDialog
        open={openCreate}
        handleClose={() => setOpenCreate(false)}
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleCreate}
      />

      <SectionDeleteDialog
        open={openDelete}
        handleClose={() => {
          setOpenDelete(false);
          setSectionToDelete(null);
        }}
        handleConfirm={handleDelete}
        sectionToDelete={sectionToDelete}
      />

      <Box sx={{ overflow: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>S.No.</TableCell>
              <TableCell>Section Name</TableCell>
              <TableCell>Section Code</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!selectedClass ? (
              <TableRow>
                <TableCell colSpan={4} align="center">Please select a class to view sections</TableCell>
              </TableRow>
            ) : loading ? (
              <TableRow>
                <TableCell colSpan={4} align="center">Loading...</TableCell>
              </TableRow>
            ) : sections.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">No sections found for this class</TableCell>
              </TableRow>
            ) : (
              sections.map((section, i) => {
                const classObj = classes.find((c) => c._id === selectedClass);
                const sectionCode = generateSectionCode(classObj?.className, section.sectionName);
                return (
                  <TableRow key={section._id}>
                    <TableCell>{page * rowsPerPage + i + 1}</TableCell>
                    <TableCell>{section.sectionName}</TableCell>
                    <TableCell>
                      <Chip label={sectionCode} variant="outlined" />
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={(e) => handleMenuOpen(e, section)}>
                        <MoreVert />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })
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
      </Menu>
    </DashboardCard>
  );
};

export default SectionManagement;
