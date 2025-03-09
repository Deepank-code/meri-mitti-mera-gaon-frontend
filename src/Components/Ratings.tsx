import { useRating } from "6pp";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";

const Ratings = ({ rating, size = 2 }: { rating: number; size: number }) => {
  const { Ratings } = useRating({
    value: rating,
    IconFilled: <FaStar />,
    IconOutline: <CiStar />,
    selectable: false,
    styles: {
      fontSize: `${size}rem`,
      color: "gold",
      justifyContent: "start",
    },
  });
  return (
    <div>
      <Ratings />
    </div>
  );
};
export default Ratings;
