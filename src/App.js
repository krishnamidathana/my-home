import "./App.css";
import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Addbills from "./pages/Addbills";
import Addestimate from "./pages/Addestimate";
import Navbar from "./components/Navbar";

import Viewbills from "./pages/Viewbills";

function App() {
  return (
    <HashRouter>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/dashboard" element={<Viewbills />} />
          <Route path="/addbills" element={<Addbills />} />

          <Route path="/addestimate" element={<Addestimate />} />
          <Route path="*" element={<Viewbills />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
