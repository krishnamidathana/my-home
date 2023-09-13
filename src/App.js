import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Addbills from "./pages/Addbills";
import Addestimate from "./pages/Addestimate";
import Navbar from "./components/Navbar";

import Viewbills from "./pages/Viewbills";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<Viewbills />} />
          <Route path="/dashboard" element={<Viewbills />} />
          <Route path="/addbills" element={<Addbills />} />

          <Route path="/addestimate" element={<Addestimate />} />
          <Route element={<Viewbills />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
