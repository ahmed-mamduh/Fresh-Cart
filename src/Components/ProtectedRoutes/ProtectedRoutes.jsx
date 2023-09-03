import React from 'react'
import styles from "./ProtectedRoutes.module.css";
import { Navigate } from 'react-router-dom';

export default function ProtectedRoutes(props) {
  

  // console.log(props);
  if(localStorage.getItem('userToken')){
    return props.children.type
  }else{
    return <Navigate to='/login' />

  }
}
