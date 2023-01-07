import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './Pages/Home';
import Login from './Pages/Login';
import ProtectedRoute from './routes/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path='/' element={<Navbar />}>
          <Route index element={<Home />} />
        </Route>
      </Route>
      <Route path='/login' element={<Login />} />
    </Routes>
  );
}

export default App;
