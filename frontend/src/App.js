import React, { useState } from "react";
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import { Login } from "./component/Login";
import { Signup } from "./component/Signup";
import Dashboard from "./component/Dashboard";
import Profile from "./component/Profile";
import Protected from "./component/Protected";

function App() {
  const isAuthenticated = localStorage.getItem('email');
  
  return (
    <>
    <Router>
      <Routes>
      
      <Route exact path="/" element={<Login />} />
      {/* <Route exact path="/dashboard" element={<Dashboard />} /> */}
      <Route exact path="/dashboard" element={<Protected Component={Dashboard} />} />

      <Route exact path="/signup" element={<Signup />} />
      <Route exact path="/forgotpass" element={<forgotPassword />} />
      <Route exact path="/profile" element={<Profile />} />
      </Routes>
    </Router>
    </>

   
  );
}

export default App;
