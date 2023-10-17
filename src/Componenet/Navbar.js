import React from 'react';
import { NavLink } from 'react-router-dom';
import logoImage from './logo1.png';
import SvgComponent from './SvgComponent';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="left-corner-image">
        <img src={logoImage} alt="logo1" />
      </div>
      <div className="navbar-right">
        <ul className="navbar-nav center-items">
          <li className="nav-item">
            <NavLink to="/doctor" activeClassName="active">Doctors</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/patients" activeClassName="active">Patients</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/reports" activeClassName="active">Diagnosis</NavLink>
          </li>
        </ul>
        <div className="top-right-svg">
          <SvgComponent />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
