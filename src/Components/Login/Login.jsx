import React, { useState } from "react";
import styles from "./Login.module.css";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login({saveUser}) {
  const [isLoading, setIsLoading] = useState(false);
  const [errMessage, setErrMessage] = useState(null);
  let navigate = useNavigate();



  async function login(values) {
    // console.log("bte7", values);
    setIsLoading(true);
    setErrMessage(null);
    let { data } = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .catch((err) => {
        console.log(err);
        setIsLoading(false);

        setErrMessage(err.response.data.message);
      });
    console.log(data);

    if (data.message == "success") {
      setIsLoading(false);
      localStorage.setItem("userToken", data.token);
      saveUser()
      navigate("/home");
    }
  }

  let mySchema = Yup.object({
    email: Yup.string().email("invalid email").required("Email is required"),
    password: Yup.string()
      .matches(/^[A-Z][a-z0-9]{3,8}$/, "invalid password")
      .required("Password is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: mySchema,

    onSubmit: (values) => login(values),
  });

  return (
    <>
      <div className='container my-5 '>
        <h3 className='w-75 mx-auto my-5'>Login : </h3>
        {errMessage ? (
          <div className=' alert alert-danger'>{errMessage}</div>
        ) : (
          ""
        )}

        <form className='w-75 mx-auto' onSubmit={formik.handleSubmit}>
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

          {isLoading ? (
            <button className='btn bg-main text-white mb-5'>
              <i className='fa fa-spin fa-spinner'></i>
            </button>
          ) : (
            <button type='submit' className='btn bg-main text-white mb-5'>
              Login
            </button>
          )}
        </form>
      </div>
    </>
  );
}
