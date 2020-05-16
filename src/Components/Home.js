import React, { useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <span className="home-page">
      <h1>Lambda Pizzaria</h1>
      <Link to="/pizza">
        <button>Order Here</button>
      </Link>
    </span>
  );
};

export default Home;
