import classes from "./orderDetail.module.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { editPrice, truncate } from "../../store/function";
import { useNavigate } from "react-router-dom";

const OrderDetail = () => {
  const userToken = useSelector((state) => state.currentUser.token);
  const userId = useSelector((state) => state.currentUser.userId);
  const [order, setOrder] = useState([]);
  const navigate = useNavigate();

  const fetchOrder = async () => {
    try {
      const res = await fetch(process.env.REACT_APP_API_URL+`/shop/order`, {
        credentials: "include",
        headers: {
          Authorization: userToken,
        },
      });

      const data = await res.json();
      setOrder(data);
    } catch (error) {
      console.log(error);
    }
  };

  const showOrder = (id) => {
    navigate(`/order/${id}`);
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <>
      {order.length != 0 &&
        order.map((ele) => {
          return (
            <div className={classes.orderDetail} key={ele._id}>
              <p>{truncate(ele._id, 10)}</p>
              <p>{truncate(ele.userId, 10)}</p>
              <p>{ele.name}</p>
              <p>{ele.phoneNumber}</p>
              <p>{ele.address}</p>
              <p>{editPrice(ele.total)}</p>
              <p>{ele.status}</p>
              <button
                onClick={() => {
                  showOrder(ele._id);
                }}
              >
                Detail
              </button>
            </div>
          );
        })}
      {order.length == 0 && <h1>No order yet ! Shopping now </h1>}
    </>
  );
};

export default OrderDetail;
