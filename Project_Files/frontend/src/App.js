import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import OwnerHome from "./modules/user/owner/OwnerHome";
import AddProperty from "./modules/user/owner/AddProperty";

import Home from "./modules/common/Home";
import Login from "./modules/common/Login";
import Register from "./modules/common/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/owner" element={<OwnerHome />} />
        <Route path="/add-property" element={<AddProperty />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
