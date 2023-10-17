import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import Patients from './Componenet/Patients';
import Navbar from './Componenet/Navbar';
import Reports from './Componenet/Reports';
import Doctors from './Componenet/Doctors';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './Componenet/HomePage';
import DoctorLogin from './Componenet/DoctorLogin';
import Card from './Componenet/Card';


const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/doctors' element={<Doctors/>}/>
        <Route path="/doctor" element={<Card />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/doctorlogin" element={<DoctorLogin />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
};

export default App;
