import React, { useEffect, useState } from 'react';
import { Form, Formik, useFormik } from 'formik';
import { Button, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export function Registerpage() {

  const [data,setData]=useState('')

  useEffect(()=>{
    async function getdata(){
      const response=await axios.get('http://localhost:8000/users/get')
      setData(response.data)
    }
    getdata()
  },[data])

  const navigate=useNavigate()

  const initialValues={
    email:'',
    password:'',
    confirmpassword:''
  }

  const onSubmit=(values)=>{
   
        async function create(){
          try {
            await axios.post('http://localhost:8000/register/signup',{
              user:{...values}
            })
          } catch (error) {
            console.log(error)
          }
        }
        create()
        navigate('/login')

    }
  
  const validate=(values)=>{
    let errors={}
    const filtereddata=data.filter(x=>{
      return x.email==values.email
    })
    if(filtereddata!='')errors.email="User already exists"
    if(!values.email)errors.email='required*'
    if(!values.password)errors.password='required*'
    if(!values.confirmpassword)errors.confirmpassword='required*'
    if(values.password!=values.confirmpassword)errors.confirmpassword="password didn't matched"
    return errors;
  }

  const formik=useFormik({
    initialValues,
    onSubmit,
    validate
  })

  return (
    <div>
      <div className="container-fluid registercont">
        <Formik>
          <Form onSubmit={formik.handleSubmit} className='form'  >
              <div className="welcome">Welcome ..!</div>
              <div className="inpbox">
              <TextField className='textinp' type={'email'} label='Enter Email' value={formik.values.email} name={'email'} onChange={formik.handleChange} onBlur={formik.handleBlur} fullWidth  ></TextField>
                <div >{formik.errors.email && formik.touched.email?<div className="error">{formik.errors.email}</div>:null}</div>
              </div>
              <div className="inpbox">
                <TextField className='textinp' variant="outlined" type={'password'} label={'Enter Password'} value={formik.values.password} name='password' onChange={formik.handleChange} onBlur={formik.handleBlur} fullWidth></TextField>
                <div>{formik.errors.password && formik.touched.password?<div className="error">{formik.errors.password}</div>:null}</div>
              </div>
              <div className="inpbox">
                <TextField className='textinp' variant="outlined" type={'password'} label={'Confirm Password'} value={formik.values.confirmpassword} name='confirmpassword' onChange={formik.handleChange} onBlur={formik.handleBlur} fullWidth></TextField>
                <div>{formik.errors.confirmpassword && formik.touched.confirmpassword?<div className="error">{formik.errors.confirmpassword}</div>:null}</div>
              </div>
              <Button variant='contained' type='submit' className="loginbtn">Register</Button>
              <div>Already have an account? <Link to={'/login'}>Login</Link></div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
