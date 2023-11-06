import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc, setDoc } from "firebase/firestore";
import { db, auth } from "./Firebase";
import { Table, Button, DropdownButton, Dropdown } from "react-bootstrap";
import { writeBatch } from "firebase/firestore";

export default function ProductTable() {
    const [cart, setCart] = useState([]);
    const [products, setProducts] = useState([]);
    const [locations, setLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState("");

    const fetchData = async () => {
        const querySnapshot = await getDocs(collection(db, "cart"));
        const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setProducts(data);
    };

    useEffect(() => {
        const fetchLocations = async () => {
            const querySnapshot = await getDocs(collection(db, "locations"));
            const data = querySnapshot.docs.map((doc) => doc.data().location);
            setLocations(data);
        };
        fetchLocations();
        fetchData();
    }, []);

    const handleRefresh = () => {
        fetchData();
    };

    const handleQuantityChange = async (productIndex, newQuantity) => {
        const product = products[productIndex];
        const productRef = doc(db, "cart", product.id);
        await updateDoc(productRef, { quantity: newQuantity });
        const updatedProducts = [...products];
        updatedProducts[productIndex] = { ...product, quantity: newQuantity };
        setProducts(updatedProducts);
    };
    
    const handleOrderNow = async () => {
        const user = auth.currentUser;
        if (user) {
            const userDocRef = doc(db, "users", user.email);
            const ordersCollectionRef = collection(userDocRef, "orders");
            const batch = writeBatch(db);
            products.forEach((product) => {
                const docRef = doc(ordersCollectionRef, product.id);
                batch.set(docRef, {
                    product: product.product,
                    quantity: product.quantity,
                    location: selectedLocation,
                });
            });
            await batch.commit();
            alert("Order placed successfully!");
        } else {
            alert("Please login to place an order.");
        }
        handleEmptyCart();
    };
    

    const handleEmptyCart = async () => {
        const cartRef = collection(db, "cart");
        const cartSnapshot = await getDocs(cartRef);
        const batch = writeBatch(db);
        cartSnapshot.forEach((doc) => {
            batch.delete(doc.ref);
        });
        await batch.commit();
        console.log("Cart emptied successfully!");
    };



    return (
        <div style={{ padding: "10%" }}>
            <Button variant="primary" onClick={handleRefresh} style={{ float: "right" }}>
                Refresh
            </Button>
            <br></br>
            <wbr></wbr>
            <center>
                <h1>CART</h1>
                <strong>Cart Items</strong>
            </center>
            {products.length > 0 ? (
                <Table striped bordered hover size="sm" style={{ backgroundColor: "rgb(230, 230, 230)", border: "solid black" }}>
                    <thead>
                        <tr>
                            <th style={{ width: "20%", textAlign: "center" }}>User ID</th>
                            <th style={{ width: "20%", textAlign: "center" }}>Product Name</th>
                            <th style={{ width: "20%", textAlign: "center" }}>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={index}>
                                <td style={{ width: "20%", textAlign: "center" }}>{product.userId}</td>
                                <td style={{ width: "20%", textAlign: "center" }}>{product.product}</td>
                                <td style={{ width: "20%", textAlign: "center" }}>
                                    <div style={{ display: "flex", justifyContent: "center" }}>
                                        <Button variant="outline-primary" size="sm" onClick={() => handleQuantityChange(index, product.quantity - 1)}>-</Button>
                                        <span style={{ margin: "0 10px" }}>{product.quantity}</span>
                                        <Button variant="outline-primary" size="sm" onClick={() => handleQuantityChange(index, product.quantity + 1)}>+</Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <p>EMPTY CART...</p>
            )}

            <div>
                <span style={{ marginRight: '10px' }}>LOCATIONS</span>
                <DropdownButton id="dropdown-basic-button" title={selectedLocation || "Select Location"}>
                    {locations.map((location, index) => (
                        <Dropdown.Item key={index} onClick={() => setSelectedLocation(location)}>
                            {location}
                        </Dropdown.Item>
                    ))}
                </DropdownButton>
                <div style={{ marginTop: "10px" }}>
                    <strong>Selected Location:</strong> {selectedLocation ? selectedLocation : "None"}
                </div>
            </div>

            <Button variant="success" onClick={handleOrderNow} style={{ marginTop: "20px" }}>
                Order Now
            </Button>

            <Button variant="primary" onClick={handleEmptyCart} style={{ float: "right" }}>
                Clear Cart
            </Button>
        </div>
    );
}
