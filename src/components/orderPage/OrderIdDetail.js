import classes from "./orderIdDetail.module.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { editPrice } from "../../store/function";
import ProductInOrder from "./ProductInOrder";

const OrderIdDetail = (props) => {
  const params = useParams();
  const token = useSelector((state) => state.currentUser.token);
  const [order, setOrder] = useState();

  const fetchOrder = async () => {
    const res = await fetch(
      process.env.REACT_APP_API_URL+`/shop/order/${params.orderId}`,
      {
        credentials:'include',
        headers: {
          Authorization: token,
        },
      }
    );
    const data = await res.json();
    setOrder(data);
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <div className={classes.orderWrapper}>
      <h1>Information Order</h1>
      {order && (
        <div className={classes.orderIdDetail}>
          <div className={classes.orderIdDetailInfo}>
            <h3>User ID : </h3>
            <h3>{order.userId}</h3>
          </div>
          <div className={classes.orderIdDetailInfo}>
            <h3>Full Name :</h3>
            <h3>{order.name}</h3>
          </div>
          <div className={classes.orderIdDetailInfo}>
            <h3>Phone Number : </h3>
            <h3>{order.phoneNumber}</h3>
          </div>
          <div className={classes.orderIdDetailInfo}>
            <h3>Address : </h3>
            <h3>{order.address}</h3>
          </div>
          <div className={classes.orderIdDetailInfo}>
            <h3>Total : </h3>
            <h3>{editPrice(order.total)}</h3>
          </div>
        </div>
      )}
      <hr />
      <div className={classes.productTitle}>
        <h2>ProductId</h2>
        <h2>Image</h2>
        <h2>Name</h2>
        <h2>Price</h2>
        <h2>Quantity</h2>
      </div>
      {order &&
        order.products.map((ele) => {
          return <ProductInOrder key={ele.productId} item={ele} />;
        })}
    </div>
  );
};

export default OrderIdDetail;
