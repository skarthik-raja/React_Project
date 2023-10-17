import React, { useState } from 'react';
import { useRoutes, Link } from 'react-router-dom';
import axios from 'axios';
import './DoctorLogin.css';

const DoctorLogin = () => {
  const api_url = 'https://localhost:7175/api/Token';

  const [doctor_Name, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Create a payload object with the user input
    const payload = {
      doctor_Name,
      password,
    };

    console.log(payload);

    axios
      .post(api_url, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log('New item added:', response.data);
        // Perform any necessary actions after successful POST request
      })
      .catch((error) => {
        console.error('Error adding new item:', error);
        // Perform any necessary actions for error handling
      });
  };

  const routes = useRoutes([
    {
      path: '/',
      element: (
        <div>
          { <img
            src="https://techcrunch.com/wp-content/uploads/2020/09/GettyImages-1211152561.jpg?w=713"
            alt="Background"
            className="image"
            style={{ marginTop: '7%', marginLeft: '10%', width: '50%' }}
          /> }
          <div className="container">
            <div className="form login">
              <header>Doctor Login</header>
              <form>
                <input
                  type="text"
                  value={doctor_Name}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  required
                  placeholder="Enter your email"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                />
                <Link to="/">Forgot password?</Link>
                <input
                  type="button"
                  className="button"
                  onClick={handleFormSubmit}
                  value="Login"
                />
              </form>
              <div className="signup">
                <span className="signup">
                  Don't have an account? <label htmlFor="check">Signup</label>
                </span>
              </div>
            </div>
            <div className="form registration">{/* Add your registration form here */}</div>
          </div>
        </div>
      ),
    },
  ]);

  return routes;
};

export default DoctorLogin;
