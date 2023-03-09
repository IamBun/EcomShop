import ShopCategories from "./ShopCategories";
import ShopSearchDetail from "./ShopSearchDetail";
import classes from "./shopContainer.module.css";

const ShopContainer = () => {
  //in ra man hinh category o ben trai va list products o ben phai
  return (
    <div className={classes.shopContainer}>
      <ShopCategories />
      <ShopSearchDetail />
    </div>
  );
};
export default ShopContainer;
