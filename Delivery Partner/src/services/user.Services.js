import { db } from "../Components/Firebase";

import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";

const UserCollectionRef = collection(db,"Users")
class UserData{
    addUser = (newUser) => {
        return addDoc(UserCollectionRef,newUser);
    };
    updateUser = (id, updatedUser) => {
        const userDoc = doc(db,"Users",id);
        return updateDoc(userDoc,updateDoc);
    };
    deleteUser = (id) => {
        const userDoc = doc(db,"Users",id);
        return deleteDoc(userDoc);
    };
    getAllUsers = () => {
        return getDocs(UserCollectionRef);
    };
    getUser = (id) => {
        const userDoc = doc(db,"Users",id);
        return getDoc(userDoc)
    };
}
export default new UserData();
