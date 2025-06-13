import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from "./pages/Auth/Login"
import Register from "./pages/Auth/Register"
import HomePage from './pages/Auth/HomePage.jsx';
import Home from "./pages/Dashboard/Home"
import Income from "./pages/Dashboard/Income"
import Expense from './pages/Dashboard/Expense'
import UserProvider from './context/user.context.jsx';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <UserProvider>
    <div >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/login" exact element={<Login />}/>
          <Route path="/register" exact element={<Register />}/>
          <Route path="/dashboard" exact element={<Home />}/>
          <Route path="/income" exact element={<Income />}/>
          <Route path="/expense" exact element={<Expense />}/>
        </Routes>
      </BrowserRouter>
    </div>

    <Toaster
    toastOptions={{
      className: "",
      style : {
        fontSize:'13px'
      }
    }} />
    </UserProvider>
  )
}

export default App



const Root = () =>{
  //check if token exist in localStorage
  const isAuthorized = !!localStorage.getItem("token");
  console.log("root hit")
  // return (
  //   <h1>Hi</h1>
  // )
  // redirect to dashboard if exist, otherwise login
  return isAuthorized ? (
    <Navigate to="/dashboard" />
    ) : (
      <Navigate to="/login" />
  )
}