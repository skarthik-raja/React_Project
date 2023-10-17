import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import './RegisterForm.css';

const RegisterForm = () => {
  const [doctor, setDoctor] = useState({
    Doctor_Name: '',
    Specialization: '',
    Doctor_Email: '',
    Contact_No: '',
    Password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctor((prevDoctor) => ({
      ...prevDoctor,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('https://localhost:7267/api/Doctor', doctor)
      .then((response) => {
        toast.success('Registered successfully!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setDoctor({
          Doctor_Name: '',
          Specialization: '',
          Doctor_Email: '',
          Contact_No: '',
          Password: ''
        });
      })
      .catch((error) => {
        toast.error('Registration failed!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  return (
    <div className="form-container">
      <ToastContainer />
      <h2>Registration Form</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="Doctor_Name">
          <Form.Label>Doctor Name</Form.Label>
          <Form.Control
            type="text"
            name="Doctor_Name"
            value={doctor.Doctor_Name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="Specialization">
          <Form.Label>Specialization</Form.Label>
          <Form.Control
            type="text"
            name="Specialization"
            value={doctor.Specialization}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="Doctor_Email">
          <Form.Label>Doctor Email</Form.Label>
          <Form.Control
            type="email"
            name="Doctor_Email"
            value={doctor.Doctor_Email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="Contact_No">
          <Form.Label>Contact Number</Form.Label>
          <Form.Control
            type="tel"
            name="Contact_No"
            value={doctor.Contact_No}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="Password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="Password"
            value={doctor.Password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button type="submit" variant="primary">
          Register
        </Button>
      </Form>
    </div>
  );
};

export default RegisterForm;
