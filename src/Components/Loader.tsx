import { useEffect, useState } from "react";
import "./Loader.css";
const Loader = () => {
  const loadingText = [
    "Loading magic... ✨",
    "Summoning data... 🧙‍♂️",
    "Cooking up something good... 🍳",
    "Hang tight, almost there! 🚀",
    "Warming up the servers... 🔥",
    "Fetching secrets from the database... 🤫",
    "Loading awesomeness... 🎉",
    "Dusting off the pixels... 🖥️",
  ];
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % loadingText.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="loader">
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <p className="loading-text">{loadingText[index]}</p>
    </div>
  );
};
export const Skleton = ({
  width = "unset",
  count = 3,
  height = "30px",
  containerHeight = "unset",
}: {
  width?: string;
  count?: number;
  height?: string;
  containerHeight?: string;
}) => {
  const skeletions = Array.from({ length: count }, (_, idx) => (
    <div key={idx} className="skleton-shape" style={{ height }}></div>
  ));
  return (
    <div className="skleton-loader" style={{ width, height: containerHeight }}>
      {skeletions}
    </div>
  );
};
export default Loader;
