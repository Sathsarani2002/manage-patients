import React from "react";
import ManagePatients from "./pages/ManagePatients";

export default function App() {
  return (
    <div className="app">
      {/* The user asked: no header and footer */}
      <ManagePatients />
    </div>
  );
}
