import React, { useState } from "react";
import styles from "./Register.module.css";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {


  const [isLoading, setIsLoading] = useState(false);
  const [errMessage, setErrMessage] = useState(null);
  let navigate = useNavigate();

  async function register(values) {
    console.log("bte7", values);
    setIsLoading(true);
    setErrMessage(null);
    let { data } = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        
        setErrMessage(err.response.data.message);
      });
    console.log(data);

    if (data.message == "success") {
      setIsLoading(false);
      navigate("/login");
    }
  }

  let mySchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(3, "min characters is 3")
      .max(15, "Max characters is 15"),
    email: Yup.string().email("invalid email").required("Email is required"),
    password: Yup.string()
      .matches(/^[A-Z][a-z0-9]{3,8}$/, "invalid password")
      .required("Password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "RePassword must match the Password")
      .required("Password is required"),
    phone: Yup.string()
      .required("phone is required")
      .matches(/^01[0125][0-9]{8}$/, "invalid phone"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: mySchema,

    onSubmit: (values) => register(values),
  });
  console.log(formik);

  return (
    <>
      <div className='container my-5 '>
        <h3 className='w-75 mx-auto my-5'>Register : </h3>
        {errMessage ? (
          <div className=' alert alert-danger'>{errMessage}</div>
        ) : (
          ""
        )}

        <form className='w-75 mx-auto' onSubmit={formik.handleSubmit}>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            className='form-control mb-2'
            id='name'
            name='name'
            value={formik.values.name}
            onChange={formik.handleChange}
          />

          {formik.errors.name ? (
            <div className='alert alert-danger'>{formik.errors.name}</div>
          ) : (
            ""
          )}

          <label htmlFor='email'>Email </label>
          <input
            type='email'
            className='form-control mb-2'
            id='email'
            name='email'
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.email ? (
            <div className='alert alert-danger'>{formik.errors.email}</div>
          ) : (
            ""
          )}

          <label htmlFor='password'>Password </label>
          <input
            type='password'
            className='form-control mb-2'
            id='password'
            name='password'
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          {formik.errors.password && formik.touched.password ? (
            <div className='alert alert-danger'>{formik.errors.password}</div>
          ) : (
            ""
          )}
          <label htmlFor='rePassword'>RePassword</label>
          <input
            type='password'
            className='form-control mb-2'
            id='rePassword'
            name='rePassword'
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div className='alert alert-danger'>{formik.errors.rePassword}</div>
          ) : (
            ""
          )}
          <label htmlFor='phone'>Phone</label>
          <input
            type='tel'
            className='form-control mb-2'
            id='phone'
            name='phone'
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.phone && formik.touched.phone ? (
            <div className='alert alert-danger'>{formik.errors.phone}</div>
          ) : (
            ""
          )}

          {isLoading ? (
            <button className='btn bg-main text-white mb-5'>
              <i className='fa fa-spin fa-spinner'></i>
            </button>
          ) : (
            
            <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white mb-5'>
              Register
            </button>
          )}
        </form>
      </div>
    </>
  );
}
