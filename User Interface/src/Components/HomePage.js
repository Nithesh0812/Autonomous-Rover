import React from 'react';
import { Link } from 'react-router-dom'
import { auth } from './Firebase';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar'
import "./mystyle.css"
import Products from './ProductCard';
const HomePage = (presentUser) => {
    return (
        <div>
            <header>
                <Navbar expand="lg" variant="light" bg="dark" fixed='top'>
                    <Container>
                        <Navbar.Brand style={{ color: 'white', marginLeft: 80, height:'48px' }}>Autonomous Delivery Rover</Navbar.Brand>
                        <button className='btn btn-outline-light' onClick={() => auth.signOut()}>LogOut</button>
                    </Container>
                </Navbar>
            </header>
            

            <div class="sidenav">

                <Link to="/home" style={{ color: 'white', fontFamily: 'Arial', textDecoration: 'none' }}>HOME</Link><br></br>
                <Link to="/createLocations" style={{ color: 'white', fontFamily: 'Arial', textDecoration: 'none' }}>LOCATIONS</Link><br></br>
                <Link to="/cart" style={{ color: 'white', fontFamily: 'Arial', textDecoration: 'none' }}>CART</Link><br></br>
                {/* <Link to="/demo" style={{ color: 'white', fontFamily: 'Arial', textDecoration: 'none' }}>DEMO</Link><br></br> */}
                {/* <Link to="/demorover" style={{ color: 'white', fontFamily: 'Arial', textDecoration: 'none' }}>DELIVER</Link><br></br> */}
            </div>
            <br></br>
            <div class="main">
                <Products />    
            </div>

        </div>
    )
}
export default HomePage;