import classes from "./shopCategories.module.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { categoriesActions } from "../../store/categories";
import { useState } from "react";

const ShopCategories = (props) => {
  // tao ra cac mang dummy category, tuong lai se lay tu database
  const iPhoneMac = ["Iphone", "Ipad", "Macbook"];
  const wireless = ["Airpod", "Watch"];
  const other = ["Mouse", "Keyboard", "Other"];
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState("");

  const data = useSelector((state) => state.data.currentData); // lay data tu store
  const getCategoryTitleHandler = (ele) => {
    //nhan ele la ten category
    //lay query search tu thanh navbar category
    let categoryArr = []; //tao mang rong

    if (ele === "all") {
      // neu click all
      categoryArr = data.slice(); // chep lai mang data
    } else {
      // loc mang data, luu vao mang moi cac item co cung category
      categoryArr = data.filter((item) => item.category === ele.toLowerCase());
    }
    dispatch(categoriesActions.getCategories(categoryArr)); // goi dispatch len de luu lai mang category trong store
    setIsActive(ele); // khi click thi set cho isActive = ten category
  };

  return (
    <div className={classes.shopCategories}>
      <h1>CATEGORIES</h1>
      <ul>
        <h3 style={{ backgroundColor: "black", color: "#fff" }}>APPLE</h3>
        <h4
          onClick={() => {
            getCategoryTitleHandler("all");
          }}
          className={"all" === isActive ? `${classes.active}` : ""}
        >
          All
        </h4>

        <h3>Iphone & Mac</h3>
        {/* Duyet mang IphoneMac, voi moi ele la ten cua moi dong san pham lay tu mang DUMMY o tren */}
        {iPhoneMac.map((ele, index) => {
          return (
            <li
              key={index}
              onClick={() => {
                getCategoryTitleHandler(ele);
              }}
              className={ele === isActive ? `${classes.active}` : ""} //neu ten trung voi isActive thi set class active vao
            >
              {ele}
            </li>
          );
        })}

        {/* Duyet mang Wireless, voi moi ele la ten cua moi dong san pham lay tu mang DUMMY o tren */}

        <h3>WIRELESS</h3>
        {wireless.map((ele, index) => {
          return (
            <li
              key={index}
              onClick={() => {
                getCategoryTitleHandler(ele);
              }}
              className={ele === isActive ? `${classes.active}` : ""}
            >
              {ele}
            </li>
          );
        })}

        {/* Duyet mang Other, voi moi ele la ten cua moi dong san pham lay tu mang DUMMY o tren */}

        <h3>OTHER</h3>
        {other.map((ele, index) => {
          return (
            <li
              key={index}
              onClick={() => {
                getCategoryTitleHandler(ele);
              }}
              className={ele === isActive ? `${classes.active}` : ""}
            >
              {ele}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ShopCategories;
