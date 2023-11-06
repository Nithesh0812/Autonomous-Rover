import { db } from "../Components/Firebase";

import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const locationRef = collection(db, "locations");
class LocationDataService {
  addLocation = (newLocation) => {
    return addDoc(locationRef, newLocation);
  };

  updateLocation = (id, updatedLocation) => {
    const LocationDoc = doc(db, "locations", id);
    return updateDoc(LocationDoc, updatedLocation);
  };

  deleteLocation = (id) => {
    const locationDoc = doc(db, "locations", id);
    return deleteDoc(locationDoc);
  };

  getAllLocation = () => {
    return getDocs(locationRef);
  };

  getLocation = (id) => {
    const locationDoc = doc(db, "locations", id);
    return getDoc(locationDoc);
  };
}

export default new LocationDataService();