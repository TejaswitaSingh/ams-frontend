import React, { useState } from 'react';
import {
    Box,
    Typography,
    FormGroup,
    FormControlLabel,
    Button,
    Stack,
    Checkbox
} from '@mui/material';
import { Link, useNavigate } from 'react-router';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField'
import apiService from '../../../services/apiService';

const AuthLogin = ({ title, subtitle, subtext }) =>{

    const [formData,setFormData] = useState({
        email:"",
        password:"",
        remember:true
    });

    const handleChange=(e)=>{
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            const response = await apiService.Login({
                email:formData.email,
                password:formData.password
            });
            if(response.data.status ===1){
                console.log("Login succesfull:",response.data);
                navigate("/dashboard");
            }else{
                console.log("Login failed:", response.data.msg)
            }
        } catch (error) {
            console.error('Login failed:', error);
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
        <Stack>
            <Box>
                <Typography variant="subtitle1"
                    fontWeight={600} component="label" htmlFor='email' mb="5px">Email</Typography>
                <CustomTextField id="email" name="email" variant="outlined" fullWidth value={formData.email} onChange={handleChange}/>
            </Box>
            <Box mt="25px">
                <Typography variant="subtitle1"
                    fontWeight={600} component="label" htmlFor='password' mb="5px" >Password</Typography>
                <CustomTextField id="password" name="password" type="password" variant="outlined" fullWidth value={formData.password} onChange={handleChange} />
            </Box>
            <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox name="remember" checked={formData.remember} onChange={handleChange}/>}
                        label="Remeber this Device"
                    />
                </FormGroup>
                <Typography
                    component={Link}
                    to="/auth/forgot-password"
                    fontWeight="500"
                    sx={{
                        textDecoration: 'none',
                        color: 'primary.main',
                    }}
                >
                    Forgot Password ?
                </Typography>
            </Stack>
        </Stack>
        
        <Box>
            <Button
                color="primary"
                variant="contained"
                size="large"
                fullWidth
                type="submit"
            >
                Sign In
            </Button>
        </Box>
        </Box>
        {subtitle}
    </>
);
}

export default AuthLogin;
