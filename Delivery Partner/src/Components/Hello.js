import React from 'react'
import car from './car.jpg'
import { Link } from 'react-router-dom'

const Hello = () => {
  return (
<div>
<header>
  <nav className="navbar navbar-expand-md navbar-dark bg-dark pt-2 pb-1 navbar-fixed-top">
    <div className="container">
      <div className="nav-item float-start">
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ml-auto">
            <li><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="orange" class="bi bi-justify-right" viewBox="0 0 16 18">
  <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-4-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
</svg></li>&nbsp;&nbsp;
            <li> <h5 className="text-light">AUTONOMOUS ROVER &nbsp;&nbsp;&nbsp;</h5></li>
          </ul>
        </div>
      </div>
      <div className="nav-item float-end">
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav">
            <li><h5><Link to="/" className="nav-item nav-link btn btn-dark">Home</Link></h5></li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <li><h5><Link to="/home" className="nav-item nav-link btn btn-dark">Login</Link></h5></li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {/* <li><h5><Link to="/signup" className="nav-item nav-link btn btn-dark">Sign up</Link></h5></li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
          </ul>
        </div>
      </div>
    </div>
  </nav>
</header>
<div className="container">
  <br /><br />
  <br /><br /><br />
  <div className="row px-3 ">
    <div className="col-sm-3 overlay">
      <div className="card">
        <img className="card-img-overlay rounded " style={{backgroundColor: 'rgba(245, 245, 245, 0.3)'}} src={car} alt="Crypto Explorer" width="375px" height="300px" />
      </div>
    </div>
  </div>
</div>
<div className='overlay'>
<div className="centered"><br /><font face="Times New Roman" size={5} color="white">This is a Web based Application that gives us  the access to control the <br/>Autonomous Land Rover . Through this web application, Rover can Deliver <br/> the package to the given particular Location. <br/><br/>This Application helps the user in providing the different features like Face <br/> Recognition , Coordinates of different Locations to deliver the packages , Obstacles detection and many more.</font></div>
</div>
</div>
  )
}

export default Hello
