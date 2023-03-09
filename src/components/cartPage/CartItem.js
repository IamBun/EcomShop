import classes from "./cartItem.module.css";
import { BiTrash } from "react-icons/bi";
import { editPrice } from "../../store/function";
import { TotalPriceObj } from "../../store/function";
import { BiCaretLeft } from "react-icons/bi";
import { BiCaretRight } from "react-icons/bi";
import { cartActions } from "../../store/cartStore";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";

const CartItem = (props) => {
  // nhan props la thong tin chi tiet san pham
  const [quantityRender, setQuantityRender] = useState(props.quantity);
  const quantityInputRef = useRef();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.currentUser.userId);
  const token = useSelector((state) => state.currentUser.token);

  const plusHandler = () => {
    //them so luong 1
    // setNewQuantity(newQuantity--);
  };

  const subHandler = () => {
    //giam so luong 1
    // setNewQuantity(newQuantity--);
  };

  const deleteItemHandler = async (id) => {
    const res = await fetch(
      process.env.REACT_APP_API_URL + `/shop/cart/${userId}`,
      {
        credentials: "include",
        method: "DELETE",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: id,
        }),
      }
    );
    // this.render();
    dispatch(cartActions.change());
  };

  const changeQuantity = async (newQuantity) => {
    await fetch(process.env.REACT_APP_API_URL + `/shop/cart/${userId}`, {
      credentials: "include",
      method: "PUT",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: props.item._id,
        quantity: newQuantity,
      }),
    });

    dispatch(cartActions.change());
  };

  return (
    <div className={classes.item}>
      <img
        src={process.env.REACT_APP_API_URL + "/" + props.item.image[0]}
      ></img>
      <h3>{props.item.name}</h3>
      <h3>{editPrice(props.item.price)} VND</h3>
      <form>
        <input
          ref={quantityInputRef}
          type="number"
          name="qty"
          id="qty"
          min="1"
          max="10"
          step="1"
          defaultValue={props.quantity}
          onChange={(e) => {
            changeQuantity(e.target.value);
            setQuantityRender(e.target.value);
          }}
        />
        {/* <BiCaretLeft onClick={subHandler} /> */}
        {/* <input defaultValue={props.quantity} value={newQuantity}></input> */}
        {/* <label>{props.quantity}</label> */}
        {/* <BiCaretRight onClick={plusHandler} /> */}
      </form>
      <h3>
        {editPrice(TotalPriceObj(props.item.price, quantityRender).toString())}{" "}
        VND
      </h3>
      <div
        className={classes.deleteIcon}
        onClick={() => {
          let prom = prompt(
            "Are you sure you want delete this product (y/n) ?"
          );
          if (prom.toLowerCase() === "y") {
            deleteItemHandler(props.item._id);
            console.log(props.item);
          }
        }}
      >
        <BiTrash />
      </div>
    </div>
  );
};

export default CartItem;
