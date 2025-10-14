import React, { useState, useMemo } from "react";
import { FiSearch } from "react-icons/fi";
import PatientTable from "../components/PatientTable";
import "../styles/manage-patients.css";
import Navbar from "../components/Header";   
import Footer from "../components/Footer";   

export default function ManagePatients() {
  const initialPatients = [
    { id: "P0001", fullname: "Lindsey Stroud", email: "lindsey.stroud@gmail.com", age: 29, address: "Detail", contact: "077-1234567", blood: "A+", username: "lindsey", chronic: "None", allergies: "None" },
    { id: "P0002", fullname: "Sarah Brown", email: "sarah.brown@gmail.com", age: 34, address: "Detail", contact: "077-2345678", blood: "B+", username: "sarah", chronic: "Asthma", allergies: "Pollen" },
    { id: "P0003", fullname: "Micheal Owen", email: "michael.owen@gmail.com", age: 42, address: "Detail", contact: "077-3456789", blood: "O+", username: "michael", chronic: "Diabetes", allergies: "None" },
    { id: "P0004", fullname: "Mary Jane", email: "mary.jane@gmail.com", age: 27, address: "Detail", contact: "077-4567890", blood: "AB+", username: "mary", chronic: "None", allergies: "Peanuts" },
    { id: "P0005", fullname: "Peter Dodle", email: "peter.doodle@gmail.com", age: 50, address: "Detail", contact: "077-5678901", blood: "A-", username: "peter", chronic: "Hypertension", allergies: "None" },
  ];

  const [patients] = useState(initialPatients);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 5;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return patients;
    return patients.filter(
      (p) =>
        p.fullname.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q) ||
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

          {/* SEARCH BAR BELOW TITLE */}
          <div className="search-area">
            <div className="search-input">
              <FiSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search by name or ID"
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
            <button onClick={() => goToPage(page + 1)} disabled={page === totalPages}>
              &rarr;
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
