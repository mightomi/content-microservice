import React, { useState } from "react";
import { Link, BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import HeaderComp from "../HeaderComp/HeaderComp";
import "./Login.css";

import { showToastSuccess, showToastError } from "../../utils/toast";


function Login(props) {

  const [emailLog, setEmailLog] = useState("");
  const [passwordLog, setPasswordLog] = useState("");

  // To make a Login HTTP Request
  const login = async () => {
    const headers = {
      "Content-Type": "application/json",
      charset: "UTF-8",
    };
    console.log("Reached login");
    const res = await axios({
      method: "POST",
      data: {
        email: emailLog,
        password: passwordLog,
      },
      headers: { headers },
      withCredentials: true,
      url: "/user/login",
    });

    console.log("res in login ", res.data);

    if(res.data.success) {
      showToastSuccess("You are logged in");
      console.log("login success user id: ", res.data.id);
      
      window.localStorage.setItem("userId", res.data.id);
      window.localStorage.setItem("JWT", res.data.token);


      // redirect to /
      window.location.href = '/';
    }
    else {
      showToastError(res.data.error);
    }
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(emailLog,passwordLog);
  };


  return (
    <div className="card">
      <HeaderComp />
      <div className="center">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="txt_field">
            <input
              type="text"
              required
              onChange={(e) => {
                setEmailLog(e.target.value);
              }}
            />
            <span></span>
            <label>Email</label>
          </div>
          <div className="txt_field">
            <input
              type="password"
              required
              onChange={(e) => {
                setPasswordLog(e.target.value);
              }}
            />
            <span></span>
            <label>Password</label>
          </div>

          <input type="submit" value="Login" onClick={login} />

          <div className="signup_link">
            Not a member?
            <Link to="/register">Signup</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
