import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router';
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
    const navigate = useNavigate();

    const handleChange=(e)=>{
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            const response = await apiService.Register(formData);
            console.log('Registration successful:', response.data);
            navigate('/auth/login')
        }catch (error) {
        console.error('Registration failed:', error);
        }
    }

    return (
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
                <CustomTextField id="firstName" name="firstName" variant="outlined" fullWidth value={formData.firstName} onChange={handleChange} required/>

                <Typography variant="subtitle1"
                    fontWeight={600} component="label" htmlFor='name' mb="5px">Last Name</Typography>
                <CustomTextField id="lastName" name="lastName" variant="outlined" fullWidth value={formData.lastName} onChange={handleChange}/>

                <Typography variant="subtitle1"
                    fontWeight={600} component="label" htmlFor='email' mb="5px" mt="25px">Email Address</Typography>
                <CustomTextField id="email" name="email" variant="outlined" fullWidth value={formData.email} onChange={handleChange} />

                <Typography variant="subtitle1"
                    fontWeight={600} component="label" htmlFor='password' mb="5px" mt="25px">Password</Typography>
                <CustomTextField id="password" name="password" variant="outlined" fullWidth value={formData.password} onChange={handleChange} />
            </Stack>
            <Button type="submit" color="primary" variant="contained" size="large" fullWidth>
                Sign Up
            </Button>
        </Box>
        {subtitle}
    </>
);
};

export default AuthRegister;
