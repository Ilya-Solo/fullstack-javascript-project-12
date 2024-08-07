// src/AppRouter.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import PrivateRoute from "./components/PrivateRoute";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<PrivateRoute element={<Home />} />} />
        <Route path="login" element={<Login />} />
        {/* <Route path="/contact" component={Contact} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
