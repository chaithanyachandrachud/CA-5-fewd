// AppRouter.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import RegistrationForm from "./components/registration";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navbar/>} />
      <Route path="/register" element={<RegistrationForm/>} />
    </Routes>
  );
};

export default AppRouter;
