import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Employees from '../pages/Employees';
import Companies from '../pages/Companies';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import ProtectedRoutes from './ProtectedRoutes';
import Quotes from '../pages/Quotes';


const OtherRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
    
        <Route path="/dashboard" element={<Quotes/>} />

        <Route path="*" element={<Navigate to="/dashboard"/>} />

      </Routes>
    </BrowserRouter>
  );

};

export default OtherRoutes;