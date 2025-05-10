import * as React from "react";
import './App.css';
import Login1 from './screens/Login1.js';
import Login2 from "./screens/Login2.js";
import Sign from './screens/Sign.js';
import '../Frontend/node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import Signup from "./screens/Signup.js";
import AllOrders from "./screens/AllOrders.js";
import FormFoodItem from "./components/FormFoodItem.js";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { CartProvider } from "./components/ContextReducer.js";
import MyOrder from "./screens/MyOrder.js";
import Landing from "./screens/Landing.js";
import NotFound from "./screens/NotFound.js";
import SignAdmin from "./screens/SignAdmin.js";
import AddDish from "./screens/AddDish.js";
function App() {
  return (
    <CartProvider>
    <Router>
      <div>
        <Routes>
        <Route exact path="/" element={<Landing/>}/>
          <Route exact path="/user" element={<Sign/>}/>
          <Route exact path="/admin" element={<SignAdmin/>}/>
          <Route exact path="/loginuser" element={<Login1/>}/> 
          <Route exact path="/loginadmin" element={<Login2/>}/> 
          <Route exact path="/createuser" element={<Signup/>}/> 
          <Route exact path="/myOrder" element={<MyOrder/>}/> 
          
          <Route exact path="/allorder" element={<AllOrders/>}/>  
          <Route exact path="/formfooditem" element={<AddDish/>}/>
        // give me route for page not found

        <Route path="*" element={<NotFound/>} />


        </Routes>
      </div>
    </Router>
    </CartProvider>
    
  );
}

export default App;