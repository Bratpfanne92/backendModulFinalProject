import React from "react";
import "./NewsLetter.css";

const NewsLetter = () => {
  return (
    <div className="newsletter">
      <h1>Get Exclusive Offers on your Email</h1>
      <p>Subscrube to our newsletter and styay updated</p>
      <div>
        <input type="email" placeholder="Enter your email" />
        <button>Subscribe</button>
      </div>
    </div>
  );
};

export default NewsLetter;
