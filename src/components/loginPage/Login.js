import img from "../SRCIMG/banner1.jpg";
import { json, Link } from "react-router-dom";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { currentUserActions } from "../../store/user";
import { useNavigate } from "react-router-dom";
import classes from "./login.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { cartActions } from "../../store/cartStore";

const Login = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signInHandler = async (e) => {
    //click login
    e.preventDefault();

    const enteredEmailInputRef = emailInputRef.current.value; //lay gia tri tu input
    const enteredPasswordInputRef = passwordInputRef.current.value;
    try {
      const res = await fetch(process.env.REACT_APP_API_URL + "/auth/login", {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: enteredEmailInputRef,
          password: enteredPasswordInputRef,
        }),
      });

      const data = await res.json();
      const userId = await data.userId;
      if (!userId) {
        toast.error(`${data.message}`);
        throw new Error("Login failed !");
      }
      toast.success("Login success !");
      const cart = await fetch(
        process.env.REACT_APP_API_URL + `/shop/cart/${userId}`,
        {
          credentials: "include",
          headers: {
            Authorization: data.token,
          },
        }
      );
      const cartTotal = await cart.json();
      console.log("cartTotal", cartTotal);
      dispatch(
        cartActions.changeProductQuantity({ totalProduct: cartTotal.length })
      );

      localStorage.setItem("cartTotal", cartTotal.length);

      dispatch(cartActions.changeCart({ cart: cartTotal }));
      dispatch(
        currentUserActions.login({
          name: data.name,
          token: data.token,
          userId: data.userId,
        })
      ); // gui dispatch de luu email user hien tai
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("isUser", data.name);
      sessionStorage.setItem("userId", data.userId);
      cartTotal.length > 0 &&
        localStorage.setItem("cart", JSON.stringify(cartTotal));
      navigate("/"); //dang nhap thanh cong, chuyen trang home
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={classes.login}>
      <img src={img}></img>
      <form onSubmit={signInHandler} className={classes.form}>
        <h1>Sign In</h1>
        <input type="text" placeholder="Email" ref={emailInputRef}></input>
        <input
          type="password"
          placeholder="Password"
          ref={passwordInputRef}
        ></input>
        <button>SIGN IN</button>
        {/* Goi y chua co tai khoan thi chuyen den trang dang ky  */}
        <h3>
          Create an account ? <Link to="/register"> Sign up</Link>
        </h3>
      </form>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Login;
