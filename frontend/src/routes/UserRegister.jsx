
import React from "react"
import { Link, useNavigate } from "react-router-dom"
import "../styles/vars.css"
import "./user-register.css"
import axios from "axios"


const UserRegister = () => {
    const navigate=useNavigate()
    const handleSubmit = async(e) => {
        e.preventDefault();
        const fullName = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
      const response = await axios.post("http://localhost:3000/api/auth/user/register", { fullName, email, password },
        {withCredentials:true}
      )
      console.log(response.data);
      navigate('/Home1');
    }

  return (
    <div className="container-center">
      <main className="card">
        <div className="brand">
          <div className="logo" />
          <div>
            <div className="title">Create account</div>
            <div className="small">for users</div>
          </div>
        </div>

        <form className="auth-form" aria-label="user-register-form"   onSubmit={handleSubmit} >
          <div className="form-group">
            <label htmlFor="name">Full name</label>
            <input id="name" name="name" type="text" placeholder="Jane Doe" />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" placeholder="jane@example.com" />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" placeholder="••••••••" />
          </div>

          <button type="submit" className="btn"  >Create account</button>

          <div className="muted">By creating an account you agree to our terms.</div>

          <div className="link-row" style={{marginTop:12}}>
            <Link to="/user/login" className="switch-link">Already registered? Sign in</Link>
            <Link to="/food-partner/register" className="switch-link">Register as partner</Link>
          </div>
        </form>
      </main>
    </div>
  )
}

export default UserRegister


