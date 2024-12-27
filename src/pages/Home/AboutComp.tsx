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
        <h2 className="my-5">"Pure, Fresh, and Straight from the Farm 🌾</h2>
        <p>
          Discover the essence of true organic living with our handpicked
          products, sourced directly from village farms where nature thrives.
          Every item is carefully selected to ensure unmatched purity,
          exceptional quality, and freshness you can trust. From our farms to
          your home, experience the difference of farm-to-table goodness!"
        </p>
      </div>
    </div>
  );
};

export default AboutComp;
