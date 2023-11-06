import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { auth } from './Firebase';
import "./mystyle.css"
const HomePage = (presentUser) => {
    const [data, setData] = useState({
        email: "",
        item: "",
        slat: null,
        slng: null,
        dlat: null,
        dlng: null,
    })
    return (
        <div>
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark pt-3 pb-2 navbar-fixed-top">
                    <div className="container">
                        <div className="nav-item float-start">
                            <div className="collapse navbar-collapse">
                                <ul className="navbar-nav ml-auto">
                                    <li> <h5 className="text-light">AUTONOMOUS ROVER &nbsp;&nbsp;&nbsp;<small>(Owner Interface)</small></h5></li>
                                    <li> <h5 className="text-light">{presentUser.email}</h5></li>
                                </ul>
                            </div>
                        </div>
                        <div className="nav-item float-end">
                            <div className="collapse navbar-collapse">
                                <ul className="navbar-nav ml-auto px-3">
                                    <li><button className='btn btn-outline-light' onClick={() => auth.signOut()}>LogOut</button></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>

            <div class="sidenav">

                <Link to="/home" style={{ color: 'white', fontFamily: 'Arial', textDecoration: 'none' }}>HOME</Link><br></br>
                <Link to="/orders" style={{ color: 'white', fontFamily: 'Arial', textDecoration: 'none' }}>ORDERS</Link><br></br>
            </div>
            <br></br>
            <div class="main">
                <h1>OWNER INTERFACE</h1>
            </div>

        </div>
    )
}
export default HomePage;