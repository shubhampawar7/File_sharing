import React, { useState } from "react";
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import { Login } from "./component/Login";
import { Signup } from "./component/Signup";
import Dashboard from "./component/Dashboard";

function App() {
  
  return (
    <>
    <Router>
      <Routes>
      
      <Route exact path="/" element={<Login />} />
      <Route exact path="/dashboard" element={<Dashboard  />} />
      <Route exact path="/signup" element={<Signup />} />
      <Route exact path="/forgotpass" element={<forgotPassword />} />
      </Routes>
    </Router>
    </>

   
  );
}

export default App;
