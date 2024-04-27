import React, { useState, useEffect } from 'react'
import Navbar from '../components/AdminNavbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import Carou from '../components/Carou'
import { useFetcher } from 'react-router-dom'
import AdminNavbar from '../components/AdminNavbar'


export default function SignAdmin() {
  const [search,setsearch]=useState('');
  const [foodCat, setFoodCat] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    });
    response = await response.json();
    setFoodItems(response[0]);
    setFoodCat(response[1]);
    // console.log(response[0],response[1]);
  }
  useEffect(() => {
    loadData()
  }, [])
  return (
    <div>
      <div>
        <AdminNavbar />
      </div>
      <div>
      <div id="carouselExampleControls" className="carousel slide xyz" data-ride="carousel">
                    <div className="carousel-inner" id='car'>
                        <div className="carousel-caption" style={{zIndex:'1'}}>
                        <div className="d-flex justify-content-center">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setsearch(e.target.value)}} />
                            {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
                            </div>

                        </div>
                        <div className="carousel-item active">
                            <img className="d-block w-100" src="https://source.unsplash.com/random/300×300/?burger" style={{filter:"brightness(30%)", objectFit:"fill"}} alt="First slide"/>
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100" src="https://source.unsplash.com/random/300×300/?pizza" style={{filter:"brightness(30%)", objectFit:"fill"}} alt="Second slide"/>
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100" src="https://source.unsplash.com/random/300×300/?pastry" style={{filter:"brightness(30%)", objectFit:"fill"}} alt="Third slide"/>
                        </div>
                    </div>
                    <button className="carousel-control-prev" data-bs-target="#carouselExampleControls" type="button" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only"></span>
                    </button>
                    <button className="carousel-control-next" data-bs-target="#carouselExampleControls" type="button" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only"></span>
                    </button>
                </div>
      </div>
      <div className='container'>
        {
          foodCat.length !== 0
            ? foodCat.map((data) => {
              return (<div className='row mb-3'><div key={data._id} className='fs-3 m-3'>{data.CategoryName}
              </div>
              <hr/>
              {foodItems.length !== 0 ? foodItems.filter((item)=> (item.CategoryName===data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase())))
              .map(filterItems=>{
                return(
                  <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                    <Card foodItem={filterItems}
                    options={filterItems.options[0]}></Card></div>
                )
              }) : "no such data found"}
              </div>)
              })  : ""
        } 
      </div>
      <div>
        <Footer />
      </div>
    </div>
  )
}