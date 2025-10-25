import React, { useState, useEffect, useMemo } from "react";
import { FiSearch } from "react-icons/fi";
import io from "socket.io-client";
import axios from "axios";
import PatientTable from "../components/PatientTable";
import "../styles/manage-patients.css";
import Navbar from "../components/Header";
import Footer from "../components/Footer";

export default function ManagePatients() {
  const [patients, setPatients] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 5;

  // ✅ Connect to backend on load
  useEffect(() => {
    fetchPatients();

    // Setup Socket.io for real-time updates
    const socket = io("http://localhost:5000");
    socket.on("patientsUpdated", (newData) => {
      setPatients(newData);
    });

    return () => socket.disconnect();
  }, []);

  // ✅ Fetch all patients from backend
  const fetchPatients = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/patients");
      setPatients(res.data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  // ✅ Filter logic
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return patients;
    return patients.filter(
      (p) =>
        p.fullname.toLowerCase().includes(q) ||
        p.email.toLowerCase().includes(q)
    );
  }, [patients, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageData = filtered.slice((page - 1) * perPage, page * perPage);

  function goToPage(n) {
    if (n < 1 || n > totalPages) return;
    setPage(n);
  }

  return (
    <>
      <Navbar />

      <main className="manage-page-wrapper">
        <div className="manage-container">
          {/* HEADER SECTION */}
          <div className="header-row">
            <h1 className="page-title">MANAGE PATIENTS</h1>
            <button className="add-btn">Add New Patient</button>
          </div>

          <p className="page-subtitle">View Patient Details</p>

          {/* SEARCH BAR */}
          <div className="search-area">
            <div className="search-input">
              <FiSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search by name or email"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
              />
            </div>
          </div>

          {/* PATIENT TABLE */}
          <PatientTable data={pageData} />

          {/* PAGINATION */}
          <div className="pagination-row">
            <button onClick={() => goToPage(page - 1)} disabled={page === 1}>
              &larr;
            </button>
            <div className="pages">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  className={page === i + 1 ? "page active" : "page"}
                  onClick={() => goToPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button
              onClick={() => goToPage(page + 1)}
              disabled={page === totalPages}
            >
              &rarr;
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

/*
🧩 For Other Developer:
------------------------
➡ In Signup Page:
   - After creating a new user, send POST request to:
     POST http://localhost:5000/api/patients
     with body: { fullname, email, age, address, contact, blood, username, chronic, allergies }

➡ In Profile Update Page:
   - When user updates their profile, send PUT request to:
     PUT http://localhost:5000/api/patients/:id
     with updated fields.

✅ Once they do this, the table updates automatically in real-time using Socket.io.
*/
