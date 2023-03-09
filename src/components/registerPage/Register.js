import img from "../SRCIMG/banner1.jpg";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { validateUserSignUp } from "../../store/function";
import classes from "./register.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  //lay du lieu tu input
  const fullnameInputRef = useRef();
  const passwordInputRef = useRef();
  const emailInputRef = useRef();
  const phoneInputRef = useRef();

  const navigate = useNavigate();

  const userArr = localStorage.getItem("userArr") //kiem tra co mang user o trong localstore chua ? Neu chua thi tao mang rong
    ? JSON.parse(localStorage.getItem("userArr"))
    : [];

  const registerHandler = async (e) => {
    //ham click vao nut Reg
    e.preventDefault();

    //lay gia tri tu input
    const enteredFullnameInputRef = fullnameInputRef.current.value;
    const enteredEmailInputRef = emailInputRef.current.value;
    const enteredPasswordInputRef = passwordInputRef.current.value;
    const enteredPhoneInputRef = phoneInputRef.current.value;
    try {
      const res = await fetch(
        process.env.REACT_APP_API_URL + "/auth/register/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: enteredEmailInputRef,
            password: enteredPasswordInputRef,
            name: enteredFullnameInputRef,
          }),
        }
      );
      const data = await res.json();
      // const userId = data.userId;
      if (!res.ok) {
        toast.error(`${data.message}`);
        const error = new Error(`${data.message}`);
        throw error;
      }

      toast.success(`${data.message}`);

      navigate("/login");

      // navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={classes.register}>
      <img src={img}></img>
      <form onSubmit={registerHandler} className={classes.form}>
        <h1>Sign up</h1>
        <input
          placeholder="Full Name"
          type="text"
          ref={fullnameInputRef}
        ></input>
        <input placeholder="Email" type="email" ref={emailInputRef}></input>
        <input
          placeholder="Password"
          type="password"
          ref={passwordInputRef}
        ></input>
        <input placeholder="Phone" type="text" ref={phoneInputRef}></input>
        <button>SIGN UP</button>
        {/* Chuyen qua trang Login  */}
        <h3>
          Login ? <Link to="/login"> Click here</Link>
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

export default Register;
