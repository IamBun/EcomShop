import classes from "./cart.module.css";
import img from "../SRCIMG/banner1.jpg";
import { BiGift } from "react-icons/bi";
import { useSelector } from "react-redux";
// import { TotalPrice } from "../../store/function";
import { editPrice } from "../../store/function";
import CartDetail from "./CartDetail";
import { useState, useEffect } from "react";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const userId = useSelector((state) => state.currentUser.userId);
  const userToken = useSelector((state) => state.currentUser.token);
  const cartChange = useSelector((state) => state.cart.cartChange);

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
      let tempCart = [];
      let tempTotal = 0;
      for (let i = 0; i < dataCart.length; i++) {
        const cartAndQuantity = await fetch(
          process.env.REACT_APP_API_URL +
            `/shop/product/${dataCart[i].productId}`,
          {
            credentials: "include",
            headers: {
              "Content-type": "application/json",
            },
          }
        );
        const cartAndQuantityJson = await cartAndQuantity.json();
        tempCart.push({
          product: cartAndQuantityJson.product,
          quantity: dataCart[i].quantity,
        });
        tempTotal += cartAndQuantityJson.product.price * dataCart[i].quantity;
      }
      setCart(tempCart);
      setTotal(tempTotal);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCartFromBE();
  }, [cartChange]);

  const totalRender = editPrice(total); // xu ly tong gia roi convert sang string hien thi

  return (
    //gom banner o tren, thong tin san pham trong gio hang o ben trai, tam tinh o ben phai
    <div className={classes.cart}>
      <div className={classes.cartBannerImg}>
        <img src={img} />
        <div className={classes.bannerDescription}>
          <h1>Cart Page</h1>
          <h3>Save up to 50% + Free shipping over $49 </h3>
        </div>
      </div>
      <h2>Shopping Cart</h2>
      {/* Thong tin gio hang o ben trai, tam tinh o ben phai  */}
      <div className={classes.shoppingCart}>
        {/* Thong tin gio hang  */}
        <div className={classes.cartDetail}>
          <CartDetail />
        </div>
        {/* Tam tinh tong bill o ben phai  */}
        <div className={classes.cartTotal}>
          <div className={classes.title}>
            <h2>CART TOTAL</h2>
          </div>
          <div className={classes.subTotal}>
            <h3>SUB TOTAL</h3>
            <h3>{totalRender}</h3>
          </div>
          <div className={classes.total}>
            <h3>TOTAL</h3>
            <h2>{totalRender}</h2>
          </div>
          <form className={classes.form}>
            <input placeholder="Enter your coupon" />
            <button
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <BiGift />
              Apply Coupon
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Cart;
