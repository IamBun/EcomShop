import classes from "./productInOrder.module.css";
import { useEffect, useState } from "react";
import { editPrice } from "../../store/function";

const ProductInOrder = (props) => {
  //props.item la products in order
  const [product, setProduct] = useState();
  const fetchProduct = async () => {
    const res = await fetch(
      process.env.REACT_APP_API_URL + `/shop/product/${props.item.productId}`,
      { credentials: "include" }
    );

    const data = await res.json();
    console.log("data", data);
    setProduct(data.product);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <>
      {product && (
        <div className={classes.productInOrder}>
          <h3>{product._id}</h3>
          <img
            src={process.env.REACT_APP_API_URL + "/" + product.image[0]}
            alt={product.name}
          ></img>
          <h3>{product.name}</h3>
          <h3>{editPrice(product.price)}</h3>
          <h3>{props.item.quantity}</h3>
        </div>
      )}
    </>
  );
};

export default ProductInOrder;
