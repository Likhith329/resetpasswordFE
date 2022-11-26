import { Button, TextField } from "@mui/material";
import { Form,Formik, useFormik, } from "formik";
import { Link, useNavigate} from "react-router-dom";

export function Loginpage() {

  const navigate=useNavigate()

  const initialValues={
    email:'',
    password:''
  }

  const onSubmit=(values)=>{
   console.log(values)
  }

  const validate=(values)=>{
    let errors={}
    if(!values.email)errors.email='required*'
    if(!values.password){errors.password='required*'}
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
                <div>{formik.errors.password && formik.touched.password?<div>{formik.errors.password}</div>:null}</div>
              </div>
              <Button variant='contained' type='submit' className="loginbtn">Login</Button>
              <div><Link to={'/forgotpassword'}>forgot password?</Link></div>
              <div>Don't have an account? <Link to={'/resetpasswordfe'}>Sign up</Link></div>
           
          </Form>
        </Formik>
      </div>
    </div>
  );
}