import { useState, useEffect } from "react";
import { collectionGroup, query, where, getDocs } from "firebase/firestore";
import { db } from "./Firebase";
import { Table } from "react-bootstrap";

const OwnerOrders = () => {
  const [orders, setOrders] = useState([]);

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
        </div>
      ))}
    </div>
  );
};

export default OwnerOrders;
