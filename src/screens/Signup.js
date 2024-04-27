import React, { useState} from 'react'
import { Link,useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Signup() {
    const[credentials,setcredentials]=useState({name:"",email:"",password:"",geolocation:""})
    


//   // 11111111111
  let [address, setAddress] = useState("");
  let navigate = useNavigate()

  const handleClick = async (e) => {
    e.preventDefault();
    let navLocation = () => {
      return new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej);
      });
    }
    let latlong = await navLocation().then(res => {
      let latitude = res.coords.latitude;
      let longitude = res.coords.longitude;
      return [latitude, longitude]
    })
    // console.log(latlong)
    let [lat, long] = latlong
    console.log(lat, long)
    const response = await fetch("http://localhost:5000/api/getlocation", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ latlong: { lat, long } })

    });
    const { location } = await response.json()
    console.log(location);
    setAddress(location);
    setcredentials({ ...credentials, [e.target.name]: location })
  }

// //   // 11111111111

    const handleSubmit= async(e)=>{
        e.preventDefault();
        const response=await fetch("http://localhost:5000/api/createuser",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation })

        });
        const json = await response.json()
        
        if (!json.success) {
            alert("Enter Valid Credentials")
        }
        else navigate("/loginuser")
        
        
    }
    const onChange=(event)=>{
        setcredentials({...credentials,[event.target.name]:event.target.value})

    }
  return (
    <div style={{ backgroundImage: 'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', backgroundSize: 'cover',height: '100vh' }}>
    <div>
      <Navbar />
    </div>
    <div className='container'>
        <form className='w-50 m-auto mt-5 border bg-white border-success rounded' onSubmit={handleSubmit}>
            <div className="m-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange}></input>
            </div>
            <div className="m-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange}></input>
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="m-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange}></input>
            </div>
            <div className="m-3">
              <label htmlFor="address" className="form-label">Address</label>

              <fieldset>
                <input type="text" className="form-control" name='address' placeholder='"Click below for fetching address"' value={address} onChange={(e)=>setAddress(e.target.value)} aria-describedby="emailHelp" />
              </fieldset>
            </div>
            <div className="m-3">
              <button type="button" onClick={handleClick} name="geolocation" className=" btn btn-success">Click for current Location </button>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            <Link to="/loginuser" className="m-3 mx-1 btn btn-danger">Already a user</Link>
            </form>
    </div></div>
  )
}
