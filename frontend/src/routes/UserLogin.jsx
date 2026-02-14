
import React from "react"
import { Link, useNavigate } from "react-router-dom"
import "../styles/vars.css"
import "./user-login.css"
import axios from "axios"

const UserLogin = () => {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/user/login",
        { email, password },
        { withCredentials: true }
      );
      console.log(response.data);
      if (response.status === 200) {
        navigate('/Home1');
      } else {
        alert('Login failed')
      }
    } catch (err) {
      console.error('Login error', err)
      alert('Login error, check console for details')
    }
  };
  return (
    <div className="container-center">
      <main className="card">
        <div className="brand">
          <div className="logo" />
          <div>
            <div className="title">Welcome back</div>
            <div className="small">sign in to your user account</div>
          </div>
        </div>

        <form className="auth-form" aria-label="user-login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" placeholder="jane@example.com" />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" placeholder="••••••••" />
          </div>

          <div className="link-row">
            <div className="small">Forgot password?</div>
            <button type="submit" className="btn">Sign in</button>
          </div>

          <div className="link-row" style={{marginTop:12}}>
            <Link to="/user/register" className="switch-link">Create a user account</Link>
            <Link to="/food-partner/login" className="switch-link">Partner sign in</Link>
          </div>
        </form>
      </main>
    </div>
  )
}

export default UserLogin
