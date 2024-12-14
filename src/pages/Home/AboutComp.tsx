import React from "react";
import "./aboutComp.css";
const AboutComp = () => {
  return (
    <div className="about-comp-section">
      <div className="about-right-section">
        <img className="about-comp-img" src="images/about-comp.png" />
        <img className="review-widg" src="images/review-widg.png" />
      </div>
      <div className="about-left-section">
        <h5 className="py-4">WHAT THEY SAY</h5>
        <h2 className="my-5">What Our Customers Say About Us</h2>
        <p>
          “Let's eat is the best. Besides the many and delicious meals, the
          service is also very good, especially in the very fast delivey. I
          highly recommend Let's eat to you”.
        </p>
      </div>
    </div>
  );
};

export default AboutComp;
