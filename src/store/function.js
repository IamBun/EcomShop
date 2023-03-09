import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// 1. Ham xu ly in gia san pham co dau cham o giua
export const editPrice = (price) => {
  const str = price.toString();
  return str.slice(-10, -6) + "." + str.slice(-6, -3) + "." + str.slice(-3);
};

// 2. Validate User dang ky nhan vao fullname, email, password, phone
export const validateUserSignUp = (obj) => {
  const userArr = localStorage.getItem("userArr")
    ? JSON.parse(localStorage.getItem("userArr"))
    : [];

  let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // check email hop le

  if (obj.fullname === "") {
    //khong nhap fullname
    toast.error("Please input your name");
    return false;
  }

  if (obj.email === "") {
    //khong nhap email
    toast.error("please input your email !");
    return false;
  }

  if (!regex.test(obj.email)) {
    // email khong hop le
    toast.error("Your email is not valid");
    return false;
  }

  for (let i = 0; i < userArr.length; i++) {
    // kiem tra email da ton tai chua
    if (obj.email === userArr[i].email) {
      toast.error("Email is already exists ! Try another email ! ");
      return false;
    }
  }

  if (obj.password.length < 8) {
    // password it hon 8 ky tu
    // pass < 8 ky tu
    toast.error("Password is must at least 8 characters");
    return false;
  }

  toast.success("Sign up completed !");
  return true;
};

//3 Validate Sign In
export const validateSignInUser = (obj) => {
  const userArr = localStorage.getItem("userArr")
    ? JSON.parse(localStorage.getItem("userArr"))
    : [];

  if (obj.email === "") {
    //khong nhap email
    toast.error("Please input your email !");
    return false;
  }

  if (obj.password === "") {
    // khong nhap pass
    toast.error("Please input your password");
    return false;
  }

  for (let i = 0; i < userArr.length; i++) {
    if (userArr[i].email === obj.email) {
      // co email
      if (obj.password === userArr[i].password) {
        // sai pass
        toast.success("Login completed");
        return true;
      } else {
        toast.error("Wrong password");
        return false;
      }
    }
  }
  toast.error("Wrong email");
  return false;
};

// 4. Ham tinh tong gia tri cac san pham trong gio hang

export const TotalPrice = (arr) => {
  let total = 0;
  for (let i = 0; i < arr.length; i++) {
    total = total + arr[i].price * arr[i].quantity;
  }
  return total;
};

export const TotalPriceObj = (price, quantity) => {
  return price * quantity;
};
export const truncate = (str, n) => {
  return str?.length > n ? str.substr(0, n - 1) + " ..." : str;
};
