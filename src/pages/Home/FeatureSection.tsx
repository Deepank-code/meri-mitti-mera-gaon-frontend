import "./features.css";
const FeatureSection = () => {
  return (
    <div className="feature-section">
      <h5 className="py-4">WHAT WE SERVE</h5>
      <h2>Your Favorite Food Delivery Partner</h2>
      <div className="features">
        <div className="feature-1">
          <img className="feature-img" src="images/feature-img-1.png" />
          <h4>Easy To Order</h4>
          <p>You only need a few steps in ordering food</p>
        </div>
        <div className="feature-2">
          <img className="feature-img" src="images/feature-img-2.png" />

          <h4>Fastest Delivery</h4>
          <p>Delivery that is always ontime even faster</p>
        </div>
        <div className="feature-3">
          <img className="feature-img" src="images/feature-img-3.png" />

          <h4>Best Quality</h4>
          <p>Not only fast for us quality is also number one</p>
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
