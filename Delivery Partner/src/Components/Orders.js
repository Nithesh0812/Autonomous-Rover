import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar'
import "./mystyle.css"
import OwnerOrders from './OwnerOrders';
const Orders = () => {
    return (
        <div>
            <header>
                <Navbar expand="lg" variant="light" bg="dark" fixed='top'>
                    <Container>
                        <Navbar.Brand style={{ color: 'white', marginLeft: 80, height:'45px' }}>Autonomous Rover</Navbar.Brand>
                    </Container>
                </Navbar>
            </header>
            
            <div class="sidenav">

                <Link to="/home" style={{ color: 'white', fontFamily: 'Arial', textDecoration: 'none' }}>HOME</Link><br></br>
                <Link to="/orders" style={{ color: 'white', fontFamily: 'Arial', textDecoration: 'none' }}>ORDERS</Link><br></br>
            </div>
            <br></br>
            <div class="main">
                <OwnerOrders />
            </div>
        </div>
    )
}
export default Orders;