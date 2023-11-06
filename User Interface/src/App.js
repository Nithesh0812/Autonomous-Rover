import React,{useEffect,useState} from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"
import Signup from './Components/Signup' 
import Hello from './Components/Hello'
import Login from './Components/Login'
import HomePage from './Components/HomePage'
import CreateLocations from './Components/CreateLocations'
import { auth } from './Components/Firebase'
import Cart from './Components/Cart'

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
        <Route  path='/signup' element={<Signup/>}/>
        <Route  path='/login' element={<Login/>}/>
        <Route  path='/createLocations' element={<CreateLocations/>}/>
        <Route  path='/cart' element={<Cart/>}/>
        <Route path='/home' element={presentUser ? (<HomePage presentUser={presentUser}/>) : <Login/> }/>
        </Routes>
      </Router>
    </div>
  )
}

export default App