import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
// import { logout } from '../../store/authSlice';
import { useDispatch, useSelector } from 'react-redux';

const UserProfile = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const pathname =
    typeof location.pathname === 'string' ? location.pathname : '';
  const isLoginRoute = pathname.match(/^\/login$/);

  if (isLoginRoute) {
    return null;
  }

  return (
    <div className='relative hover:bg-primary-dark text-white p-2 rounded-lg transition duration-700 ease-in-out'>
      <button
        className='flex items-center text-sm leading-5 font-medium  transition duration-150 ease-in-out'
        onClick={() => setMenuOpen(!isMenuOpen)}>
        <img
          className='w-8 h-8 rounded-full'
          src={user.avatar}
          alt='User Avatar'
        />
        <span className='ml-3'>{user.name}</span>
      </button>
      {isMenuOpen && (
        <div className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg'>
          <div className='py-1 rounded-md bg-white shadow-xs w-full'>
            <button
              //   onClick={logout}
              className='block w-full px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out'>
              Profile
            </button>
          </div>
          <div className='py-1 rounded-md bg-white shadow-xs'>
            <button
              //   onClick={logout}
              className='block  w-full px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out'>
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
