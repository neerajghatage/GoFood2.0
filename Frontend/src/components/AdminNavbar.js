
// import {React, useState} from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import Badge from 'react-bootstrap/Badge'
// import Modal from '../Modal';
// import Cart from '../screens/Cart';
// import {useCart,useDispatchCart} from '../components/ContextReducer'
// export default function Navbar() {
//   const [cartView, setCartView] = useState(false)
//   let data = useCart();
//   const Navigate=useNavigate()
//   const handleLogout= ()=>{
//     localStorage.removeItem('authToken');
//     Navigate("/")
//   }
//   return (
//     <div>
//       <nav className="navbar navbar-expand-lg navbar-dark bg-success">
//         <Link className="navbar-brand fs-1 fst-italic" to="/">EatHub</Link>
//         <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
//           <ul className='navbar-nav me-auto mb-1'>
//             <li className='nav-item'><Link className="nav-item fs-5 nav-link mx-1 active" aria-current="page" to="/">Home</Link></li>

//             {(localStorage.getItem("authToken")) ?
//             <div>
//               <li className='nav-item'><Link className="nav-item fs-5 nav-link mx-1 active" aria-current="page" to="/allorder"> All Orders</Link></li>

//               <li className='nav-item'><Link className="nav-item fs-5 nav-link mx-1 active" aria-current="page" to="/formfooditem"> Add Dish</Link></li>

//                 <div className="btn bg-white text-danger mx-1 me-4" onClick={handleLogout}>Logout</div>
//               </div>
//               : ""}

             
              

//           </ul>
//           (!localStorage.getItem("authToken")) ?
//           <div className='d-flex'><Link className="btn bg-white text-success mx-1 me-3" aria-current="page" to="/loginuser">Login</Link>
            
           
//           </div> 
            
//         </div>
//       </nav>
//     </div>
//   )
// }

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart, useDispatchCart } from './ContextReducer';

export default function Navbar() {
    const [cartView, setCartView] = useState(false);
    const data = useCart();
    const dispatch = useDispatchCart();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-success">
            <Link className="navbar-brand fs-1 fst-italic" to="/">
                EatHub
            </Link>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <ul className="navbar-nav me-auto mb-1">
                    <li className="nav-item">
                        <Link className="nav-link fs-5 mx-1 active" aria-current="page" to="/admin">
                            Home
                        </Link>
                    </li>
                    {localStorage.getItem('authToken') && (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link fs-5 mx-1 active" aria-current="page" to="/allorder">
                                    All Orders
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link fs-5 mx-1 active" aria-current="page" to="/formfooditem">
                                    Add Dish
                                </Link>
                            </li>
                            <div className="btn bg-white text-danger mx-1 me-4" onClick={handleLogout}>
                                Logout
                            </div>
                        </>
                    )}
                </ul>
                {!localStorage.getItem('authToken') && (
                    <div className="d-flex">
                        <Link className="btn bg-white text-success mx-1 me-3" aria-current="page" to="/loginadmin">
                            Login
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
}
