import classes from "./cartDetail.module.css";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import { BiSubdirectoryLeft } from "react-icons/bi";
import { BiSubdirectoryRight } from "react-icons/bi";
import { createSearchParams, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { fetchProduct } from "../../store/function";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cartStore";

const CartDetail = () => {
  const dispatch = useDispatch();
  const [cart, setCart] = useState([]);
  const userId = useSelector((state) => state.currentUser.userId);
  const userToken = useSelector((state) => state.currentUser.token);
  const cartChange = useSelector((state) => state.cart.cartChange);
  // const cart = useSelector((state) => state.cart.cart);
  const navigate = useNavigate();

  const fetchCartFromBE = async () => {
    try {
      const res = await fetch(
        process.env.REACT_APP_API_URL + `/shop/cart/${userId}`,
        {
          credentials: "include",
          headers: {
            Authorization: userToken,
          },
        }
      );
      const dataCart = await res.json(); // lay cart tu BE ve, la mang gom ProductId va quantity
      dispatch(
        cartActions.changeProductQuantity({ totalProduct: dataCart.length })
      );
      let tempCart = [];
      for (let i = 0; i < dataCart.length; i++) {
        const cartAndQuantity = await fetch(
          process.env.REACT_APP_API_URL +
            `/shop/product/${dataCart[i].productId}`,
          {
            credentials: "include",
          }
        );
        const cartAndQuantityJson = await cartAndQuantity.json();
        tempCart.push({
          product: cartAndQuantityJson.product,
          quantity: dataCart[i].quantity,
        });
      }
      setCart(tempCart);
      dispatch(cartActions.changeCart(tempCart));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCartFromBE();
  }, [cartChange]);

  const backToShop = () => {
    //click continue thi quay lai shopping tiep
    navigate("/shop");
  };

  const goCheckOutPage = () => {
    //di tinh tien
    navigate("/checkout");
  };

  return (
    <>
      {/* Tieu de, chia grid 6 cot  */}
      <div className={classes.title}>
        <h3>IMAGE</h3>
        <h3>PRODUCTS</h3>
        <h3>PRICE</h3>
        <h3>QUANTITY</h3>
        <h3>TOTAL</h3>
        <h3>REMOVE</h3>
      </div>
      {/* Voi moi san pham trong gio hang thi in ra thong tin chi tiet, chia grid 6 cot nhu o tren de khop nhau  */}
      {cart.length > 0 && (
        <div className={classes.detail}>
          {cart?.map((ele, index) => (
            <CartItem key={index} item={ele.product} quantity={ele.quantity} /> //nhan obj item la thong tin chi tiet san pham
          ))}
        </div>
      )}
      {/* Button chuyen trang  */}
      <div className={classes.buttonTransPage}>
        {/* Quay lai shop  */}
        <div className={classes.buttonLeft} onClick={backToShop}>
          <button>
            <BiSubdirectoryLeft />
            Continue Shopping
          </button>
        </div>
        {/* Di tinh tien  */}
        <div className={classes.buttonRight} onClick={goCheckOutPage}>
          <button>
            Proceed to checkout
            <BiSubdirectoryRight />
          </button>
        </div>
      </div>
    </>
  );
};
export default CartDetail;
