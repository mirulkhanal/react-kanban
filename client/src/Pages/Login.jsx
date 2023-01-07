import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { getUser } from '../store/slices/authSlice';
const Login = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleAuth = () => {
    window.location.href = 'http://localhost:3000/auth/google';
  };

  // Otherwise, show the login button
  return (
    <div className='flex items-center justify-center h-screen bg-[#212121]'>
      <button
        onClick={handleAuth}
        className='px-4 py-2 rounded-lg text-white font-bold hover:bg-blue-600 bg-blue-600  hover:shadow-2xl hover:scale-[99%] hover:translate-y-1 flex items-center'>
        <FaGoogle className='mr-2' size={24} />
        Sign in with Google
      </button>
    </div>
  );
};
export default Login;
