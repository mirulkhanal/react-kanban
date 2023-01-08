import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { IoLogoXing } from 'react-icons/io5';
import UserProfile from './UserProfile';
import { useEffect } from 'react';
import { getUser } from '../../store/slices/authSlice';
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const pathname =
    typeof location.pathname === 'string' ? location.pathname : '';
  const isLoginRoute = pathname.match(/^\/login$/);

  if (isLoginRoute) {
    return <Outlet />;
  }
  return (
    <>
      <nav className='bg-test-dark-matte py-4 px-4 flex justify-between items-center sm:flex-row flex-col '>
        <div className='flex-shrink-0 bg-primary-dark_sub p-2'>
          <IoLogoXing className='text-4xl p-0 m-0 text-white ' />
        </div>
        <div className='hidden sm:block sm:ml-6'>
          <div className='text-xl text-white font-bold'>Kanbans</div>
        </div>
        <div className='flex sm:hidden'>
          <button
            className='px-3 py-2 rounded-lg text-white hover:bg-primary-dark_sub'
            onClick={() => setOpen(!open)}>
            <svg className='h-6 w-6 fill-current' viewBox='0 0 24 24'>
              <path
                d='M4 6h16M4 12h16M4 18h16'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </button>
        </div>
        <div className='hidden sm:flex sm:items-center sm:gap-4'>
          <Link
            className='px-3 py-2 rounded-lg text-white hover:bg-primary-dark_sub transition duration-700 ease-in-out'
            to='/'>
            Home
          </Link>
          {/* TODO: check if user exists */}
          {/* <p>Oops</p> */}
          {user ? (
            <UserProfile />
          ) : (
            <Link
              className='px-3 py-2 rounded-lg text-white hover:primary-dark_sub'
              to='/login'>
              Login
            </Link>
          )}
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
