import React from "react";
import { Link } from "react-router-dom";

export default function Joomla() {
  return (
    <div>
      <h2>Joomla</h2>
      <Link to="/">Home</Link>
      <Link to="/wordpress">Wordpress</Link>
    </div>
  );
}
