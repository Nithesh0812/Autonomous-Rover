import { useState, useEffect } from "react";
import { collectionGroup, getDocs } from "firebase/firestore";
import { db } from "./Firebase";
import { Table } from "react-bootstrap";
import "./mystyle.css"
import LocationDataService from "../services/location.services";


const OwnerOrders = () => {
  const [orders, setOrders] = useState([]);





  const socket = new WebSocket("wss://9kht1zgyig.execute-api.us-east-1.amazonaws.com/production");

  useEffect(() => {
    socket.onopen = function (event) {
      console.log("websocket open");
    };
  }, []);

  const unlock = () => {
    socket.send('{"action":"sendmessage","message":"unlock"}');
    console.log("Unlocked");
  }

  const start = (selectedLocation) => {
    const data = '{"action":"sendmessage","message":"' + selectedLocation.coordinateLong + ',' + selectedLocation.coordinateLat + ',' + 'start"}';
    socket.send(data)
    console.log("Started")
    alert('Delivery has started!')
  };


  const rtl = () => {
    socket.send('{"action":"sendmessage","message":"rtl"}')
    console.log("abort and rtl")
  }

  const recognise = () => {
    socket.send('{"action":"sendmessage","message":"recognise"}')
    console.log("recognising and unlocking")
  }
  const [location, setLocation] = useState([]);
  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    const data = await LocationDataService.getAllLocation();
    console.log(data.docs);
    setLocation(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };






  useEffect(() => {
    const fetchOrders = async () => {
      const ordersCollectionRef = collectionGroup(db, "orders");
      const querySnapshot = await getDocs(ordersCollectionRef);
      const ordersData = [];

      querySnapshot.forEach((doc) => {
        const order = doc.data();
        const userId = doc.ref.parent.parent.id;
        order.userId = userId;
        ordersData.push(order);
      });

      const groupedOrders = {};

      ordersData.forEach((order) => {
        if (!groupedOrders[order.userId]) {
          groupedOrders[order.userId] = [];
        }
        groupedOrders[order.userId].push(order);
      });

      setOrders(groupedOrders);
    };

    fetchOrders();
  }, []);

  return (
    <div style={{ padding: "10%" }}>
      {Object.keys(orders).map((userId) => (
        <div key={userId}>
          <h2>User {userId}'s Orders</h2>
          <Table striped bordered hover size="sm" style={{ backgroundColor: "rgb(230, 230, 230)", border: "solid black" }}>
            <thead>
              <tr>
                <th style={{ width: "20%", textAlign: "center" }}>Product</th>
                <th style={{ width: "20%", textAlign: "center" }}>Quantity</th>
                <th style={{ width: "20%", textAlign: "center" }}>Location</th>
              </tr>
            </thead>
            <tbody>
              {orders[userId].map((order, index) => (
                <tr key={index}>
                  <td style={{ width: "20%", textAlign: "center" }}>{order.product}</td>
                  <td style={{ width: "20%", textAlign: "center" }}>{order.quantity}</td>
                  <td style={{ width: "20%", textAlign: "center" }}>{order.location}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <br></br>
          <div style={{ margin: '0px' }}>
            <button className='btn btn-primary' onClick={() => unlock()}>Unlock</button>
            <br />
            <br />
            {/* <select onChange={(e) => {
              const selectedLocation = location.find((doc) => doc.location === e.target.value);
              document.getElementById("latitude").value = selectedLocation.coordinateLat;
              document.getElementById("longitude").value = selectedLocation.coordinateLong;
            }}>
              {location.map((doc, index) => (
                <option key={doc.location}>{doc.location}</option>
              ))}
            </select> */}

            <select
              onChange={(e) => {
                const selectedLocation = location.find((doc) => doc.location === e.target.value);
                document.getElementById("latitude").value = selectedLocation.coordinateLat;
                document.getElementById("longitude").value = selectedLocation.coordinateLong;
              }}
            >
              <option value="" disabled selected>
                Select Location
              </option>
              {location.map((doc, index) => (
                <option key={doc.location}>{doc.location}</option>
              ))}
            </select>


            <br></br><br></br>
            <input type="number" placeholder="longitude" name="longitude" id="longitude"></input>
            <br />
            <br />
            <input type="number" placeholder="latitude" name="latitude" id="latitude"></input>


            <br /><br />
            <button className='btn btn-primary' onClick={() => {
              const selectedLocation = location.find((doc) => doc.location === document.querySelector('select').value);
              if (!selectedLocation) {
                prompt('Please select a valid location');
              } else {
                start(selectedLocation);
              }
            }}>Start</button>


            <br />
            <br />
            <button className='btn btn-primary' onClick={() => rtl()}>Abort and return to launch</button>
            <br /><br />
            <button className='btn btn-primary' onClick={() => recognise()}>Recognise</button>
          </div>
          <br></br>
          <hr></hr>
        </div>
      ))}
    </div>

  );
};

export default OwnerOrders;
