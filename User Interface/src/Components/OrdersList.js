import { useState, useEffect } from "react";
import { collection, query, where, getDocs, doc } from "firebase/firestore";
import { db, auth } from "./Firebase";
import { Table} from "react-bootstrap";


export default function OrdersList() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            const userDocRef = doc(db, "users", user.uid);
            const ordersCollectionRef = collection(userDocRef, "orders");
            const q = query(ordersCollectionRef);

            const getOrders = async () => {
                const querySnapshot = await getDocs(q);
                const data = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setOrders(data);
            };

            getOrders();
        }
    }, []);

    return (
        <div style={{ padding: "10%" }}>
            <Table striped bordered hover size="sm" style={{ backgroundColor: "rgb(230, 230, 230)", border: "solid black" }}>
                <thead>
                    <tr>
                        <th style={{ width: "20%", textAlign: "center" }}>Product</th>
                        <th style={{ width: "20%", textAlign: "center" }}>Quantity</th> 
                        <th style={{ width: "20%", textAlign: "center" }}>Location</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id}>
                            {/* <td style={{ width: "20%", textAlign: "center" }}>{order.userId}</td> */}
                            <td style={{ width: "20%", textAlign: "center" }}>{order.product}</td>
                            <td style={{ width: "20%", textAlign: "center" }}>{order.quantity}</td>
                            <td style={{ width: "20%", textAlign: "center" }}>{order.location}</td>

                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

