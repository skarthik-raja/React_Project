import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './DoctorCard.css';


export default function DoctorCard() {
  const [doctors, setDoctors] = useState([]);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('https://localhost:7114/api/Doctor/ApprovedDoctors');
      if (!response.data) {
        throw new Error('Failed to fetch doctors');
      }
      setDoctors(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const convertToImage = (imageData) => {
    const base64Image = `data:image/jpeg;base64,${imageData}`;
    return <img src={base64Image} alt="Doctor" className="docimg" />;
  };

  const handleUpdate = async (doctor) => {
    try {
      const formData = new FormData();
      formData.append('Doctor_Id', doctor.doctor_Id);
      formData.append('Doctor_Name', doctor.updatedName || doctor.doctor_Name);
      formData.append('Specialization', doctor.updatedSpecialization || doctor.specialization);
      formData.append('Doctor_Email', doctor.updatedEmail || doctor.doctor_Email);
      formData.append('Doctor_PhNo', doctor.updatedPhone || doctor.doctor_PhNo);
      // Add more fields as per your requirements

      await axios.put(`https://localhost:7114/api/Doctor/${doctor.doctor_Id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      fetchDoctors();
    } catch (error) {
      console.error('Error updating doctor:', error);
    }
  };

  const handleDelete = async (doctorId) => {
    try {
      await axios.delete(`https://localhost:7114/api/Doctor/${doctorId}`);
      fetchDoctors();
    } catch (error) {
      console.error('Error deleting doctor:', error);
    }
  };

  const handleNameChange = (event, doctorId) => {
    const updatedDoctors = doctors.map((doctor) =>
      doctor.doctor_Id === doctorId ? { ...doctor, updatedName: event.target.value } : doctor
    );
    setDoctors(updatedDoctors);
  };

  const handleSpecializationChange = (event, doctorId) => {
    const updatedDoctors = doctors.map((doctor) =>
      doctor.doctor_Id === doctorId ? { ...doctor, updatedSpecialization: event.target.value } : doctor
    );
    setDoctors(updatedDoctors);
  };

  const handleEmailChange = (event, doctorId) => {
    const updatedDoctors = doctors.map((doctor) =>
      doctor.doctor_Id === doctorId ? { ...doctor, updatedEmail: event.target.value } : doctor
    );
    setDoctors(updatedDoctors);
  };

  const handlePhoneChange = (event, doctorId) => {
    const updatedDoctors = doctors.map((doctor) =>
      doctor.doctor_Id === doctorId ? { ...doctor, updatedPhone: event.target.value } : doctor
    );
    setDoctors(updatedDoctors);
  };

  return (
    <div>
   
      <div className="cont">
        {doctors.map((doctor) => (
          <div key={doctor.doctor_Id} className="doctor-card">
            <div className="doc-image">
              {doctor.imageData && convertToImage(doctor.imageData)}
            </div>
            {editMode ? (
              <div className="doc-details">
                <h2>
                  <input
                    type="text"
                    value={doctor.updatedName || doctor.doctor_Name}
                    onChange={(event) => handleNameChange(event, doctor.doctor_Id)}
                  />
                </h2>
                <p>
                  <input
                    type="text"
                    value={doctor.updatedSpecialization || doctor.specialization}
                    onChange={(event) => handleSpecializationChange(event, doctor.doctor_Id)}
                  />
                </p>
                <p>
                  <input
                    type="text"
                    value={doctor.updatedEmail || doctor.doctor_Email}
                    onChange={(event) => handleEmailChange(event, doctor.doctor_Id)}
                  />
                </p>
                <p>
                  <input
                    type="text"
                    value={doctor.updatedPhone || doctor.doctor_PhNo}
                    onChange={(event) => handlePhoneChange(event, doctor.doctor_Id)}
                  />
                </p>
                {/* Add more doctor fields here */}
                <div className="button-container">
                  <button onClick={() => handleUpdate(doctor)}>Save</button>
                  <button onClick={() => handleDelete(doctor.doctor_Id)}>Delete</button>
                </div>
              </div>
            ) : (
              <div className="doc-details">
                <h2>{doctor.doctor_Name}</h2>
                <p>{doctor.specialization}</p>
                <p>{doctor.doctor_Email}</p>
                <p>{doctor.doctor_PhNo}</p>
                {/* Render other doctor details */}
                <div className="button-container">
                  <button onClick={() => setEditMode(true)}>Update</button>
                  <button onClick={() => handleDelete(doctor.doctor_Id)}>Delete</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}