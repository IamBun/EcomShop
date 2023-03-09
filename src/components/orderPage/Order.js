import classes from "./order.module.css";
import img from "../SRCIMG/banner1.jpg";
import OrderDetail from "./OrderDetail";

const Order = () => {
  return (
    <div className={classes.order}>
      <div className={classes.cartBannerImg}>
        <img src={img} />
        <div className={classes.bannerDescription}>
          <h1>Order History</h1>
          <h3>Thanks for your shopping ! </h3>
        </div>
      </div>
      <div className={classes.title}>
        <h3>ID ORDER</h3>
        <h3>ID USER</h3>
        <h3>USER NAME</h3>
        <h3>PHONE</h3>
        <h3>ADDRESS</h3>
        <h3>TOTAL</h3>
        <h3>STATUS</h3>
        <h3>DETAIL</h3>
      </div>
      <OrderDetail />
    </div>
  );
};

export default Order;
