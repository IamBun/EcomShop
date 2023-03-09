import classes from "./products.module.css";
import { editPrice } from "../../store/function";

const Products = (props) => {
  //hien thi thong tin tom tat san pham gom anh, ten, gia, nhan props la obj chua thong tin san pham
  const clickHandler = (e) => {
    //khi click vao san pham thi duoc chuyen den san pham do
    props.click(props.index);
  };

  return (
    <>
      <div className={classes.product}>
        <img
          src={process.env.REACT_APP_API_URL + "/" + props.item.image[0]}
          alt="product-img"
          onClick={clickHandler}
        />
        <h3>{props.item.name}</h3>
        <h4>{editPrice(props.item.price)}</h4>
      </div>
    </>
  );
};
export default Products;
