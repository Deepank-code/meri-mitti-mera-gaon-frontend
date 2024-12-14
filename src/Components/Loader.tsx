import "./Loader.css";
const Loader = () => {
  return (
    <div className="loader">
      {" "}
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
export const Skleton = ({
  width = "unset",
  count = 3,
}: {
  width?: string;
  count?: number;
}) => {
  const skeletions = Array.from({ length: count }, (v, idx) => (
    <div key={idx} className="skleton-shape"></div>
  ));
  return (
    <div className="skleton-loader" style={{ width }}>
      {skeletions}
    </div>
  );
};
export default Loader;
