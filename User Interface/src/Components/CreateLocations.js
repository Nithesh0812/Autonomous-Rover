import React, { useState} from 'react';
import { Link } from 'react-router-dom'
import Map from './Map';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar'
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
                <Navbar expand="lg" variant="light" bg="dark" fixed='top'>
                    <Container>
                        <Navbar.Brand style={{ color: 'white', marginLeft: 80, height:'45px' }}>Autonomous Rover</Navbar.Brand>
                    </Container>
                </Navbar>
            </header>

            <div class="sidenav" style={{}}>
                <Link to="/home" style={{ color: 'white', fontFamily: 'Arial', textDecoration: 'none' }}>HOME</Link><br></br>
                <Link to="/createLocations" style={{ color: 'white', fontFamily: 'Arial', textDecoration: 'none' }}>LOCATIONS</Link><br></br>
                <Link to="/cart" style={{ color: 'white', fontFamily: 'Arial', textDecoration: 'none' }}>CART</Link><br></br>

            </div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div class="main">
                <Map />
            </div>
        </div>
    )
}
export default HomePage;