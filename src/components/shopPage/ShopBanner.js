import classes from "./shopBanner.module.css";
import img from "../SRCIMG/banner1.jpg";
const ShopBanner = () => {
  //gom img banner va div mo ta, them sologan de sale
  return (
    <div className={classes.shopBanner}>
      <img src={img}></img>
      <div className={classes.shopDescription}>
        <h1>BOUTIQUE PRODUCTS</h1>
        <h3>Everything you want ! </h3>
      </div>
    </div>
  );
};

export default ShopBanner;
