import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Wordpress from "./pages/Wordpress";
import Joomla from "./pages/Joomla";

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <h1>My website</h1>
      </div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/wordpress" element={<Wordpress />} />
        <Route exact path="/joomla" element={<Joomla />} />
      </Routes>
    </BrowserRouter>
  );
}
