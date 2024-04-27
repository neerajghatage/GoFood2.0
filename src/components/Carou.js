import React from 'react'
import { Link } from 'react-router-dom'

export default function Carou() {
    return (
        <div>
            <div>
                <div id="carouselExampleControls" className="carousel slide xyz" data-ride="carousel">
                    <div className="carousel-inner" id='car'>
                        <div className="carousel-caption" style={{zIndex:'1'}}>
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                            <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button>
                            </form>

                        </div>
                        <div className="carousel-item active">
                            <img className="d-block w-100" src="https://source.unsplash.com/random/300×300/?burger" style={{filter:"brightness(30%)"}} alt="First slide"/>
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100" src="https://source.unsplash.com/random/300×300/?pizza" style={{filter:"brightness(30%)"}} alt="Second slide"/>
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100" src="https://source.unsplash.com/random/300×300/?pastry" style={{filter:"brightness(30%)"}} alt="Third slide"/>
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
        </div>
    )
}
