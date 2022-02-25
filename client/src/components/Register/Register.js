import React, { useState } from "react";
import axios from "axios";
import { Link, BrowserRouter as Router } from "react-router-dom";
import "./Register.css";

import { showToastSuccess, showToastError } from "../../utils/toast";

function validateName(name) {
  if(name === "") return false;
  return true;
}

function validateEmail(email) {
  if( /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))  return true;
  return false;
}

function validatePassword(password) {
  let hasUpperCase = false;
  let hasLowerCase = false;
  let hasNumeric = false;
  let hasSpecial = false;

  for (let i = 0; i < password.length; i++) {
      if (password[i] >= 'a' && password[i] <= 'z')    hasUpperCase = true;
      else if (password[i] >= 'A' && password[i] <= 'Z')    hasLowerCase = true;
      else if (password[i] >= '0' && password[i] <= '9')    hasNumeric = true;
      else    hasSpecial = true;
  }

  if(hasUpperCase && hasLowerCase && hasNumeric && hasSpecial) {
      return true;
  }
  else {
      return false;
  }
}

function Register() {

  const [nameReg, setNameReg] = useState("");
  const [emailReg, setEmailReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

  // To make a register HTTP Request
  const register = async () => {
    console.log("going to post");

    // if(!validateName(nameReg))  return showToastError(`Please Fill up the Name`);
    if(!validateEmail(emailReg))  return showToastError(`Wrong Email format`);
    if(passwordReg.length < 10)   return showToastError(`Password length must be atleast 10`);
    if(!validatePassword(passwordReg))  return showToastError(`
      Password must have atleast
      1 Upper Case
      1 Lower Case
      1 Numeric Case
      1 Special Case`
    );




    const headers = {
      "Content-Type": "application/json",
      charset: "UTF-8",
    };

    const res = await axios({
      method: "POST",
      data: {
        name: nameReg,
        email: emailReg,
        password: passwordReg,
      },
      headers: { headers },
      withCredentials: true,
      url: "/user/signup",
    });

    console.log("after await res ", res);

    if(res.data.success) {

      showToastSuccess("You are logged in");
      // showToastError("not a gn");

      window.localStorage.setItem("userId", res.data.id);
      window.localStorage.setItem("JWT", res.data.token);

      // redirect to /
      window.location.href = '/';
    }
    else {
      showToastError(res.data.error);
      // console.log("errror while regis", res.data.error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(nameReg, emailReg, passwordReg);
  };



  return (
    <div className="card">
      <div className="center">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="txt_field">
            <input
              type="text"
              required
              onChange={(e) => {
                setNameReg(e.target.value);
              }}
            />
            <span></span>
            <label>Name</label>
          </div>

          <div className="txt_field">
            <input
              type="email"
              required
              onChange={(e) => {
                setEmailReg(e.target.value);
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
                setPasswordReg(e.target.value);
              }}
            />
            <span></span>
            <label>Password</label>
          </div>
         
          <input type="submit" value="Register" onClick={register} />
          <div className="signup_link">
            Already a member?
            <Link to="/login">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
