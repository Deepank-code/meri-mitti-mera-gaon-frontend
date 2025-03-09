import { FaBasketShopping } from "react-icons/fa6";
import "./ProductCard.css";

import { BiHeart } from "react-icons/bi";
import { CartItem } from "../../types/types";
import { useNavigate } from "react-router-dom";
import { transformImages } from "../../utils/feature";

type ProductPropType = {
  productId: string;
  photos: [{ url: string; public_id: string }];
  name: string;
  price: number;
  stock: number;
  handler: (cartItem: CartItem) => string | undefined;
};

const ProductCard = ({
  productId,
  photos,
  name,
  price,
  stock,
  handler,
}: ProductPropType) => {
  const navigate = useNavigate();
  return (
    <div
      className="productCard"
      onClick={() => navigate(`/product/${productId}`)}
    >
      <img
        src={transformImages(`${photos?.[0].url}`, 300)}
        width="200px"
        alt="meal.name"
      />

      <p>{name}</p>

      <span id="stock-span">{stock}</span>

      <span>₹ {price}</span>

      <button
        onClick={() =>
          handler({
            productId,
            photo: photos[0].url,
            name,
            price,
            stock,
            quantity: 1,
          })
        }
      >
        Add To Cart <FaBasketShopping />
      </button>
      <span id="heart">
        <BiHeart size={28} />
      </span>
    </div>
  );
};

export default ProductCard;
