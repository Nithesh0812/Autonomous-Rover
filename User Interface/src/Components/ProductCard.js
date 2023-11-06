import React, { useState } from "react";
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCardTitle,
} from "mdb-react-ui-kit";
import './ProductCard.css';
import a4 from '../images/a4.jpg';
import stapler from '../images/stp.jpg';
import marker from '../images/marker.jpg';
import { db } from "./Firebase";
// import {  collection, addDoc } from "firebase/firestore";
// import { getAuth} from "firebase/auth";
import { collection, addDoc, where, query, getDocs, updateDoc, doc, increment } from "firebase/firestore";
import { getAuth} from "firebase/auth";
import firebase from 'firebase/compat/app';



const products = [
    { id: 1, name: 'A4 sheets', image: a4, desc: '50 sheets' },
    { id: 2, name: 'Stapler', image: stapler, desc: 'with pins' },
    { id: 3, name: 'Marker pen', image: marker, desc: 'black' }
];


function ProductForm({ id, name, image, desc, quantities, setQuantities }) {
    const quantity = quantities[id];
    const handleAdd = () => {
        setQuantities({ ...quantities, [id]: quantity + 1 });
    };

    const handleSubtract = () => {
        if (quantity > 0) {
            setQuantities({ ...quantities, [id]: quantity - 1 });
        }
    };

    // const handleAddToCart = () => {
    //     console.log(`Added ${quantity} ${name} to cart`);
      
    //     // Add the product and its quantity to Firebase
    //     addDoc(collection(db, "cart"), {
    //       product: name,
    //       quantity: quantity
    //     })
    //     .then((docRef) => {
    //       console.log("Document written with ID: ", docRef.id);
    //     })
    //     .catch((error) => {
    //       console.error("Error adding document: ", error);
    //     });
    //   };

    const handleAddToCart = () => {
        console.log(`Added ${quantity} ${name} to cart`);
      
        const user = getAuth().currentUser;
      
        // Check if the user already has a cart item for this product
        const q = query(collection(db, "cart"), where("userId", "==", user.uid), where("product", "==", name));
        getDocs(q)
          .then((querySnapshot) => {
            if (!querySnapshot.empty) {
              // Update the existing document
              const cartDocRef = doc(db, "cart", querySnapshot.docs[0].id);
              updateDoc(cartDocRef, {
                quantity: increment(quantity)
              })
              .then(() => {
                console.log("Document updated");
              })
              .catch((error) => {
                console.error("Error updating document: ", error);
              });
            } else {
              // Add a new document
              addDoc(collection(db, "cart"), {
                userId: user.uid,
                product: name,
                quantity: quantity
              })
              .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
              })
              .catch((error) => {
                console.error("Error adding document: ", error);
              });
            }
          })
          .catch((error) => {
            console.error("Error getting documents: ", error);
          });
      };
      


    return (
        <MDBContainer fluid className="my-5">
            <MDBRow>
                <MDBCol md="4" className="mb-4 mb-lg-0" style={{ height: '250px', width: '460px' }} >
                    <MDBCard className="text-black" style={{ padding: "25px" }}>
                        <MDBCardImage src={image} alt='a4 size sheets' style={{ height: '250px', width: '344px' }} />
                        <MDBCardBody style={{ height: '250px', width: '350px' }} >
                            <div className="text-center mt-1">
                                <MDBCardTitle className="h4">{name}</MDBCardTitle>
                            </div>
                            <div className="text-center">
                                <div
                                    className="p-3 mx-n3 mb-4"
                                    style={{ backgroundColor: "#eff1f2" }}
                                >
                                    <h5 className="mb-0">{desc}</h5>
                                </div>
                            </div>

                            <div className="text-center mt-1">
                                <button type="button" class="btn btn-primary" onClick={handleSubtract}>-</button>
                                <span> &nbsp;{quantity} &nbsp;</span>
                                <button type="button" class="btn btn-primary" onClick={handleAdd}>+</button>

                                <button type="button" class="btn btn-primary flex-fill ms-2" onClick={handleAddToCart}>Add to Cart</button>

                            </div>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default function Products() {
    const [quantities, setQuantities] = useState({
        1: 0,
        2: 0,
        3: 0,
    });
    ;
    return (
        <MDBContainer fluid className="my-5">
            <MDBRow>
                {products.map((product) => (
                    <MDBCol md="4" className="mb-8 mb-lg-0">
                        <ProductForm
                            key={product.id}
                            {...product}
                            quantities={quantities}
                            setQuantities={setQuantities}
                        />
                    </MDBCol>
                ))}
            </MDBRow>
        </MDBContainer>
    );
}
