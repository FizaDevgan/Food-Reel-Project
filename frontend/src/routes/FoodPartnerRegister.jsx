import React from "react"
import { Link, useNavigate } from "react-router-dom"
import "../styles/vars.css"
import "./food-partner-register.css"
import axios from "axios"



const FoodPartnerRegister = () => {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.business.value;
    const email= e.target.contact.value;
    const password = e.target.password.value;
   
      const response = await axios.post("http://localhost:3000/api/auth/food-partner/register", { name, email, password }, 
        { withCredentials: true });
      console.log(response.data);
      navigate('/create-food');
  
  };
  return (
    <div className="container-center">
      <main className="card">
        <div className="brand">
          <div className="logo" />
          <div>
            <div className="title">Partner signup</div>
            <div className="small">for food partners</div>
          </div>
        </div>

        <form className="auth-form" aria-label="partner-register-form"  onSubmit={handleSubmit}>
          <div className="form-group" >
            <label htmlFor="business">Business name</label>
            <input id="business" name="business" type="text" placeholder="Bistro Co." />
          </div>

          <div className="form-group">
            <label htmlFor="contact">Contact email</label>
            <input id="contact" name="contact" type="email" placeholder="owner@bistro.co" />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" placeholder="••••••••" />
          </div>

          <button type="submit" className="btn">Create partner account</button>

          <div className="muted">We'll review your application before activation.</div>

          <div className="link-row" style={{marginTop:12}}>
            <Link to="/food-partner/login" className="switch-link">Already a partner? Sign in</Link>
            <Link to="/user/register" className="switch-link">Register as user</Link>
          </div>
        </form>
      </main>
    </div>
  )
}

export default FoodPartnerRegister
