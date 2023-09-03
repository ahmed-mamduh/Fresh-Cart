import React from "react";
import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.svg";

export default function NavBar({ userData, logOut }) {
  return (
    <>
      <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
        <div className='container'>
          <img src={logo} alt='' className='text-white' />
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            {userData && (
              <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                <li className='nav-item'>
                  <Link className='nav-link ' to='home'>
                    Home
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link ' to='products'>
                    Products
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link ' to='cart'>
                    Cart
                  </Link>
                </li>
              </ul>
            )}

            <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
              <li className='mx-2'>
                <i className='fa-brands fa-facebook-f text-white'></i>
              </li>
              <li className='mx-2'>
                <i className='fa-brands fa-twitter text-white'></i>
              </li>
              <li className='mx-2'>
                <i className='fa-brands fa-instagram text-white'></i>
              </li>
            </ul>
            <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
              {userData ? (
                <li className='nav-item'>
                  <span className='nav-link cursor-pointer ' onClick={logOut}>
                    Logout
                  </span>
                </li>
              ) : (
                <>
                  {" "}
                  <li className='nav-item'>
                    <Link className='nav-link ' to='login'>
                      Login
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link className='nav-link ' to='register'>
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
