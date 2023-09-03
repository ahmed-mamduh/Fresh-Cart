import React from 'react'
import styles from "./NotFount.module.css";
import error from "../../assets/images/error.svg"

export default function NotFount() {
  return (
    <>
      <div className='container'>
        <div className='mx-50 mx-auto my-5'>
          <img src={error} alt='' className='w-100'/>
        </div>
      </div>
    </>
  );
}
