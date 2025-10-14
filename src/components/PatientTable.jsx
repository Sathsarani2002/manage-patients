import React from "react";
import "../styles/patient-table.css";

export default function PatientTable({ data }) {
  return (
    <div className="table-wrapper">
      {/* horizontal scroll container */}
      <div className="table-scroll">
        <table className="patient-table">
          <thead>
            <tr>
              <th>Patient ID</th>
              <th>Full Name</th>
              <th>Email Address</th>
              <th>Age</th>
              <th>Address</th>
              <th>Contact Number</th>
              <th>Blood Group</th>
              <th>Username</th>
              <th>chronic condition</th>
              <th>Allergies</th>
              {/* Add more columns if needed */}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={10} style={{ textAlign: "center", padding: "32px 0" }}>
                  No patients found
                </td>
              </tr>
            ) : (
              data.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.fullname}</td>
                  <td>{p.email}</td>
                  <td>{p.age}</td>
                  <td>{p.address}</td>
                  <td>{p.contact}</td>
                  <td>{p.blood}</td>
                  <td>{p.username}</td>
                  <td>{p.chronic}</td>
                  <td>{p.allergies}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
