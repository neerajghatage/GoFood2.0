import React from 'react';
const img1 = require('../Images/Gemini_Generated_Image_nxj6oonxj6oonxj6.jpeg');
const NotFound= () => {
    return (
        <div className="d-flex align-items-center justify-content-center" style={{ height: "100vh", background: "#f8f9fa" }}>
            <div className="text-center">
                <img src={img1} alt="404 Not Found" className="img-fluid" style={{ width: '250px', borderRadius: '50%', boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.2)' }} />
                <h1 className="mb-3">Oops! Page not found.</h1>
                <p className="mb-4">We can't seem to find the page you're looking for.</p>
                <a href="/landing" className="btn btn-success">Go Home</a>
            </div>
        </div>
    );
};

export default NotFound;
