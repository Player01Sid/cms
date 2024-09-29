import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h2>Welcome to my website!</h2>
      <Link to="/joomla">Joomla</Link>
      <Link to="/wordpress">Wordpress</Link>
    </div>
  );
}
