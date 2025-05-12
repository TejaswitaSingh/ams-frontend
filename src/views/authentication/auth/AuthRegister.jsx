import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router';
import apiService from '../../../services/apiService';

import CustomTextField from '../../../components/forms/theme-elements/CustomTextField'

import { Stack } from '@mui/system';
import { LineAxisOutlined } from '@mui/icons-material';

const AuthRegister = ({ title, subtitle, subtext }) =>{

    const [formData,setFormData]=useState({
        firstName:"",
        lastName:"",
        email:"",
        password:""
    });

    const handleChange=(e)=>{
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            const response = await apiService.Register(formData);
            console.log('Registration successful:', response.data);
        }catch (error) {
        console.error('Registration failed:', error);
        }
    }
};
    (
    <>
        {title ? (
            <Typography fontWeight="700" variant="h2" mb={1}>
                {title}
            </Typography>
        ) : null}

        {subtext}

        <Box component="form" onSubmit={handleSubmit}>
            <Stack mb={3}>
                <Typography variant="subtitle1"
                    fontWeight={600} component="label" htmlFor='name' mb="5px">First Name</Typography>
                <CustomTextField id="name" name="firstName" variant="outlined" fullWidth value={formData.firstName} onchange={handleChange} required/>

                <Typography variant="subtitle1"
                    fontWeight={600} component="label" htmlFor='name' mb="5px">Last Name</Typography>
                <CustomTextField id="name" name="lastName" variant="outlined" fullWidth value={formData.lastName} onchange={handleChange}/>

                <Typography variant="subtitle1"
                    fontWeight={600} component="label" htmlFor='email' mb="5px" mt="25px">Email Address</Typography>
                <CustomTextField id="email" name="email" variant="outlined" fullWidth value={formData.email} onchange={handleChange} />

                <Typography variant="subtitle1"
                    fontWeight={600} component="label" htmlFor='password' mb="5px" mt="25px">Password</Typography>
                <CustomTextField id="password" name="password" variant="outlined" fullWidth value={formData.password} onchange={handleChange} />
            </Stack>
            <Button type="submit" color="primary" variant="contained" size="large" fullWidth component={Link} to="/auth/login">
                Sign Up
            </Button>
        </Box>
        {subtitle}
    </>
);

export default AuthRegister;
