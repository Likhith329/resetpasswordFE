import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Form, Formik, useFormik } from 'formik';
import { Button, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

export function Resetpassword() {

  //token from email
  const {email,token}=useParams()

 // token from database to compare with the token from email
  const [confirmtoken,setconfirmtoken]=useState(token)

  useEffect(()=>{
     async function gettokenfromdb(){
        const response=await axios.get('http://localhost:8000/users/get')
        const user=response.data.filter(x=>{
          return x.email==email
        })
        setconfirmtoken(user[0].token)
     }
     gettokenfromdb()
  },[])

  const [disp,setDisp]=useState('')

  const styles1={
    display:disp
  }
  const styles2={
    display:disp==''?'none':''
  }

  //formik

  const initialValues={
    newpassword:'',
    confirmnewpassword:''
  }

  const onSubmit=(values)=>{
   
        async function create(){
          try {
            await axios.put('http://localhost:8000/users/update',{
              user:{
                email:email,
                password:values.newpassword
              }
            })
            setDisp('none')
          } catch (error) {
            console.log(error)
          }
        }
        create()
    }
   
  const validate=(values)=>{
    let errors={}
    if(!values.newpassword)errors.newpassword='required*'
    if(!values.confirmnewpassword)errors.confirmnewpassword='required*'
    if(values.newpassword!=values.confirmnewpassword)errors.confirmnewpassword="password didn't matched"
    return errors;
  }

  const formik=useFormik({
    initialValues,
    onSubmit,
    validate
  })
console.log(token)
console.log(confirmtoken)
  return (
    <div>
      {token!=confirmtoken?<div className="text-center resmsg" >Invalid token</div>:
      <div className="container-fluid registercont" style={styles1}>
        <Formik>
          <Form onSubmit={formik.handleSubmit} className='form'  >
              <div className="welcome">Welcome ..!</div>

              <div className="inpbox">
                <TextField className='textinp' variant="outlined" type={'password'} label={'Enter New Password'} value={formik.values.newpassword} name='newpassword' onChange={formik.handleChange} onBlur={formik.handleBlur} fullWidth></TextField>
                <div>{formik.errors.newpassword && formik.touched.newpassword?<div className="error">{formik.errors.newpassword}</div>:null}</div>
              </div>
              <div className="inpbox">
                <TextField className='textinp' variant="outlined" type={'password'} label={'Confirm New Password'} value={formik.values.confirmnewpassword} name='confirmnewpassword' onChange={formik.handleChange} onBlur={formik.handleBlur} fullWidth></TextField>
                <div>{formik.errors.confirmnewpassword && formik.touched.confirmnewpassword?<div className="error">{formik.errors.confirmnewpassword}</div>:null}</div>
              </div>
              <Button variant='contained' type='submit' className="loginbtn">Reset</Button>
              <div>Already have an account? <Link to={'/login'}>Login</Link></div>
          </Form>
        </Formik>
      </div>
        }
        <h2 className="text-center resmsg" style={styles2}>Your password has been set successfully!</h2>
    </div>
  );
}
