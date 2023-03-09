import classes from "./banner.module.css";
import banner1 from "../SRCIMG/banner1.jpg";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  //gom anh banner, button collection dieu huong den shoppage
  const navigate = useNavigate();
  const goShopPage = () => {
    navigate("/shop");
  };

  return (
    <div className={classes.banner}>
      <div className={classes.imgdiv}>
        <img src={banner1} alt="banner" />
      </div>
      <div className={classes.description}>
        <p>NEW INSPIRATION 2020</p>
        <h1>20% OFF ON NEW SEASON</h1>
        {/* Dieu huong den shoppage  */}
        <button onClick={goShopPage}>Browse Collections</button>
      </div>
    </div>
  );
};
export default Banner;
