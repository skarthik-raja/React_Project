import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Card, Button } from 'react-bootstrap';
import './Doctors.css';

const Doctors = () => {
  const api_url = 'https://localhost:7175/api/Doctor';

  const [doctors, setDoctors] = useState([]);
  const [newDoctor, setNewDoctor] = useState({
    doctor_Name: '',
    specialization: '',
    doctor_Email: '',
    doctor_PhNo: '',
    password: '',
    imageData: '',
  });

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get(api_url);
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDoctor((prevDoctor) => ({
      ...prevDoctor,
      [name]: value,
    }));
  };
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setNewDoctor((prevDoctor) => ({
      ...prevDoctor,
      imageData: file,
    }));
  };
  

  const handleAddDoctor = async (e) => {
    e.preventDefault();
    try {
      await axios.post(api_url, newDoctor, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setNewDoctor({
        doctor_Name: '',
        specialization: '',
        doctor_Email: '',
        doctor_PhNo: '',
        password: '',
        imageData: '',
      });
      fetchDoctors();
      toast.success('Doctor successfully added');
    } catch (error) {
      console.error('Error adding new doctor:', error);
    }
  };

  const handleDeleteDoctor = async (id) => {
    try {
      await axios.delete(`${api_url}/${id}`);
      fetchDoctors();
      toast.success('Doctor successfully deleted');
    } catch (error) {
      console.error('Error deleting doctor:', error);
    }
  };

  const handleUpdateDoctor = async (id, updatedDoctor) => {
    try {
      await axios.put(`${api_url}/${id}`, updatedDoctor, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      fetchDoctors();
      toast.success('Doctor successfully updated');
    } catch (error) {
      console.error('Error updating doctor:', error);
    }
  };

  return (
    <div>
    <center>
      <h2>Doctors</h2>
      <form onSubmit={handleAddDoctor} className="form-container">
        <div className="form-group">
          <label htmlFor="doctor_Name">Name:</label>
          <input
            type="text"
            name="doctor_Name"
            value={newDoctor.doctor_Name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="specialization">Specialization:</label>
          <input
            type="text"
            name="specialization"
            value={newDoctor.specialization}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="doctor_Email">Email:</label>
          <input
            type="email"
            name="doctor_Email"
            value={newDoctor.doctor_Email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="doctor_PhNo">Contact No:</label>
          <input
            type="tel"
            name="doctor_PhNo"
            value={newDoctor.doctor_PhNo}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            value={newDoctor.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
  <label htmlFor="imageData">Image Data:</label>
  <input
    type="file"
    name="imageData"
    onChange={handleFileInputChange}
    required
  />
</div>
        <button type="submit">Add Doctor</button>
      </form>
    </center>
  

      <h3>Doctor List</h3>
      <div className="card-grid">
        {doctors.map((doctor) => (
          <Card key={doctor.id} className="doctor-card">
            <Card.Body>
              <div>
                <h4>{doctor.doctor_Name}</h4>
                <p>Specialization: {doctor.specialization}</p>
                <p>Email: {doctor.doctor_Email}</p>
                <p>Phone Number: {doctor.doctor_PhNo}</p>
              </div>
              {/* Add more doctor details as needed */}
              <Button variant="danger" onClick={() => handleDeleteDoctor(doctor.id)}>
                Delete
              </Button>
              <Button variant="secondary" onClick={() => handleUpdateDoctor(doctor.id, doctor)}>
                Edit
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>

      <ToastContainer />
    </div>
  );
};

export default Doctors;
