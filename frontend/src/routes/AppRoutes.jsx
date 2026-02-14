import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import UserRegister from './UserRegister'
import UserLogin from './UserLogin'
import FoodPartnerRegister from './FoodPartnerRegister'
import FoodPartnerLogin from './FoodPartnerLogin'
import Home1 from '../pages/general/Home1'
import CreateFood from '../pages/food-partner/CreateFood'
import Profile from '../pages/food-partner/Profile'
import '../styles/vars.css'

const Home = () => {
  return (
    <div className="container-center">
      <main className="card" style={{textAlign:'center'}}>
        <div className="brand" style={{justifyContent:'center'}}>
          <div className="logo" />
          <div>
            <div className="title">Welcome</div>
            <div className="small">Choose an action</div>
          </div>
        </div>

        <div style={{display:'grid',gap:12,marginTop:12}}>
          <Link to="/user/register" className="btn">User  Register</Link>
          <Link to="/user/login" className="btn">User  Login</Link>
          <Link to="/food-partner/register" className="btn">Food Partner  Register</Link>
          <Link to="/food-partner/login" className="btn">Food Partner  Login</Link>
        </div>
      </main>
    </div>
  )
}

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/food-partner/register" element={<FoodPartnerRegister />} />
        <Route path="/food-partner/login" element={<FoodPartnerLogin />} />
           <Route path="/Home1" element={<Home1 />} />
             <Route path="/create-food" element={<CreateFood />} />
             <Route path="/food-partner/:id" element={<Profile />} />
      </Routes>
    </Router>
  )
}

export default AppRoutes
