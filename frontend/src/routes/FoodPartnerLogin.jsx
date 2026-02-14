


import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "../styles/vars.css"
import "./food-partner-login.css"
import axios from "axios"

const FoodPartnerLogin = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      console.log('logging in with', { email, password });
      const response = await axios.post(
        "http://localhost:3000/api/auth/food-partner/login",
        { email, password },
        { withCredentials: true }
      );
      console.log('login response', response.data);
      if (response.status >= 200 && response.status < 300) {
        navigate('/create-food');
      } else {
        setError(response.data?.message || 'Unexpected response');
      }
    } catch (err) {
      console.error('login error', err);
      const msg = err?.response?.data?.message || err.message || 'Login failed';
      setError(msg);
    }
  }
  return (
    <div className="container-center">
      <main className="card">
        <div className="brand">
          <div className="logo" />
          <div>
            <div className="title">Partner sign in</div>
            <div className="small">access your partner dashboard</div>
          </div>
        </div>

        <form className="auth-form" aria-label="partner-login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" placeholder="owner@bistro.co" />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" placeholder="••••••••" />
          </div>

            {error && <div className="muted" style={{color:'crimson', marginBottom:8}}>{error}</div>}
            <div className="link-row">
            <div className="small">Need help?</div>
            <button type="submit" className="btn">Sign in</button>
          </div>

          <div className="link-row" style={{marginTop:12}}>
            <Link to="/food-partner/register" className="switch-link">Create partner account</Link>
            <Link to="/user/login" className="switch-link">Sign in as user</Link>
          </div>
        </form>
      </main>
    </div>
  )
}

export default FoodPartnerLogin