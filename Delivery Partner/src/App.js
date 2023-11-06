import React,{useEffect,useState} from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"
import Hello from './Components/Hello'
import Login from './Components/Login'
import HomePage from './Components/HomePage'
import { auth } from './Components/Firebase'
import Orders from './Components/Orders'
const App = () => {
  const [presentUser,setPresentUser]=useState(null);
  useEffect(()=>{
    auth.onAuthStateChanged(user=>{
      if(user){
      setPresentUser({
        uid:user.uid,
        email:user.email
      })
    }
    else{
        setPresentUser(null);
    }
  })
  },[])
  return (
    <div>
      <Router>
        <Routes>
        <Route path='/' element={<Hello/>}/>
        <Route  path='/login' element={<Login/>}/>
        <Route path='/home' element={presentUser ? (<HomePage presentUser={presentUser}/>) : <Login/> }/>
        <Route  path='/orders' element={<Orders />}/>
        </Routes>
      </Router>
    </div>
  )
}
export default App