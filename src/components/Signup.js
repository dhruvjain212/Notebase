import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';


const Signup = () => {
    const [credentials, setCredentials] = useState({name:"", email: "", password: "", cpassword: "" });
    const navigate = useNavigate();
    

  const handleSubmit = async (e) => {
    e.preventDefault();
    const{name, email, password}= credentials;
    const response = await fetch("http://localhost:5000/api/auth/createUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
      name, email, password
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
        //save the auth-token and redirect
        localStorage.setItem("token", json.authtoken);
        navigate('/home');
    } 
    else {
      alert("Invalid Credentials");
    }
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            aria-describedby="emailHelp"
            placeholder="Enter name"
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter name"
            onChange={onChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="password"
            placeholder="Password"
            onChange={onChange}
          minLength={5}
          required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cpassword">Confirm Password</label>
          <input
            type="password"
            onChange={onChange}
            name="cpassword"
            className="form-control"
            id="cpassword"
            placeholder="Password"
            minLength={5}
            required
          />
        </div>
       
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      
    </div>
  );
};

export default Signup;
