import React from "react";
import { Link } from "react-router-dom";

export default function Wordpress() {
  return (
    <div>
      <h2>Wordpress</h2>
      <Link to="/">Home</Link>
      <Link to="/joomla">Joomla</Link>
    </div>
  );
}
