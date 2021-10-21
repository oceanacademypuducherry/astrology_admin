import React, { useState, useEffect } from "react";
import App from "./App";
import "./login.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ReCAPTCHA from "react-google-recaptcha";

export default function Login() {
  const [login, setLogin] = React.useState(false);
  const [admin, setAdmin] = React.useState({
    username: "",
    password: "",
  });
  const [recaptcha, setRecaptcha] = React.useState(null);
  const gettingValue = JSON.parse(localStorage.getItem("MJADM"));
  useEffect(() => {
    console.log(gettingValue);
    if (gettingValue !== null) {
      setLogin(true);
    }
  }, [login]);
  const user = "astro";
  const pass = "astro@123";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdmin({ ...admin, [name]: value });
    // console.log(name, "%%%%%%%%%%%%%%%%", value);
  };

  const submiting = () => {
    if (admin.username === user && admin.password === pass) {
      if (recaptcha !== null && recaptcha !== "click" ) {
        setRecaptcha(null);
        localStorage.setItem("MJADM", JSON.stringify(admin));
        setLogin(true);  
      } else {
        setRecaptcha("click");
      }
    } else {
      alert("INVALID CREDENTIALS");
      setRecaptcha(null);
    }
  };


  function onChange(value) {
    console.log("Captcha value:", value);
    setRecaptcha(value);1
  
  }

  return login ? (
    <App />
  ) : (
    <div className="login-div">
      <div className="fields">
      <h2 style={{color: "black"}}>Makarajothi Admin</h2>
        <TextField
          label="Username"
          name="username"
          onChange={handleChange}
          style={{ width: "70%" }}
        />
        <TextField
          type="password"
          label="Password"
          name="password"
          onChange={handleChange}
          style={{ width: "70%" }}
        />
     
        <Button
          variant="contained"
          color="primary"
          onClick={submiting}
          style={{ width: "70%" }}
        >
          Submit
        </Button>

           <ReCAPTCHA
            className = {recaptcha === "click" ? "recaptcha" : ""}
            sitekey="6LfcGuUcAAAAAEJOjIYpNgsPNIKnIfyw7fng5rYV"
            onChange={onChange} /> 


      </div>
    </div>
  );
}
