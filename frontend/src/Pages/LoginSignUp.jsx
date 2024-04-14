import React from "react";
import "./CSS/LoginSignUp.css";
import { useState } from "react";

const LoginSignUp = () => {
  const [state, setState] = useState("Login");

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign Up" ? (
            <input type="text" placeholder="Your Name" />
          ) : (
            <></>
          )}

          <input type="email" placeholder="Your Email" />
          <input type="password" placeholder="Password" />
        </div>
        <button>Continue</button>
        {state === "Sign Up" ? (
          <p className="loginsignup-login">
            Already have an Account? <span>Login Here</span>
          </p>
        ) : (
          <p className="loginsignup-login">
            Create an Account? <span>Register Here</span>
          </p>
        )}

        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>By continuing, i agree to the terms of use & privacy</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignUp;
