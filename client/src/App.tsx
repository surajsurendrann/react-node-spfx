import React from "react";

import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AddUser from "./pages/AddUser";
import Profile from "./pages/Profile";
import Documents from "./pages/Documents";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/adduser" element={<AddUser />} />
      <Route path="/profile/:userId" element={<Profile />} />
      <Route path="/profile/documents/:userId" element={<Documents />} />
    </Routes>
  );
}

export default App;
