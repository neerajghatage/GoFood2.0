import React from 'react';
import { Link } from 'react-router-dom';
import logoImage from '../Images/Gemini_Generated_Image_4tc2ov4tc2ov4tc2.jpeg';
const Landing = () => {
  return (
    <div className="container-fluid text-center" style={{ backgroundColor: '#3D9970', minHeight: '100vh', paddingTop: '50px' }}>
      {/* Logo */}
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
        <img src={logoImage} alt="EatHub Logo" className="img-fluid" style={{ width: '250px', borderRadius: '50%', boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.2)' }} />
        </div>
      </div>

      {/* Catchy line */}
      <div className="row justify-content-center mt-3">
        <div className="col-md-8">
          <h1 className="display-4 text-white">Discover the Flavors of Life!</h1>
          <p className="lead text-white">Order delicious meals online from the comfort of your home.</p>
        </div>
      </div>

      {/* User/Admin Options */}
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <Link to="/user" className="btn btn-outline-light btn-lg me-3">
            User
          </Link>
          <Link to="/admin" className="btn btn-outline-light btn-lg">
            Admin
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
