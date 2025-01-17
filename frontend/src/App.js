import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Auth from "./components/Auth";
import Dashboard from "./components/Dashboard";
import AuthContext from "./context/AuthContext";

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={!user ? <Auth /> : <Navigate to="/dashboard" />} />
        {/* Private Route */}
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
