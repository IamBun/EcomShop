import classes from "./detailProduct.module.css";
import { useSelector } from "react-redux";
import Products from "../homePage/Products";
import { editPrice } from "../../store/function";
import { json, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cartStore";
import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DetailProduct = (props) => {
  const data = useSelector((state) => state.data.currentData); //lay data tu store
  const userActive = useSelector((state) => state.currentUser.name); // lay user hien tai
  const userId = useSelector((state) => state.currentUser.userId); // lay userId hien tai
  const userToken = useSelector((state) => state.currentUser.token); // lay userId hien tai
  const cart = useSelector((state) => state.cart); //lay cart tu store

  const [product, setProduct] = useState();
  const [quantity, setQuantity] = useState(1);

  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const quantityInputRef = useRef();

  const related = useCallback(
    data.filter(
      // loc cac san pham tuong tu category / khong lay san pham hien tai
      (ele) => {
        return ele.category === product?.category && ele._id !== product?._id;
      }
    ),
    [product]
  );

  const fetchProduct = () => {
    fetch(process.env.REACT_APP_API_URL + `/shop/product/${params.productId}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setProduct(data.product);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchProduct();
  }, [data, params]);

  const showDetailHandler = (index) => {
    //show detail san pham lien quan
    const idDetail = related[index]._id;
    navigate(`/detail/${idDetail}`);
  };

  const backToShopHandler = (e) => {
    // button quay lai shop
    e.preventDefault();
    navigate("/shop");
  };

  //Xu ly du lieu add to cart
  const addToCartHandler = async (e) => {
    if (!userActive) {
      //Neu chua dang nhap thi thong bao dang nhap
      toast.warn("Login to continue !");
      return false;
    }
    if (!!userActive) {
      await fetch(process.env.REACT_APP_API_URL + `/shop/cart/${userId}`, {
        credentials: "include",
        method: "POST",
        headers: {
          Authorization: userToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product._id,
          quantity: quantity,
        }),
      });
      const res = await fetch(
        process.env.REACT_APP_API_URL + `/shop/cart/${userId}`,
        {
          credentials: "include",
          headers: {
            Authorization: userToken,
          },
        }
      );
      const data = await res.json();
      dispatch(
        cartActions.changeProductQuantity({ totalProduct: data.length })
      );
      toast.success(`Added`);
    }
  };

  return (
    <>
      {product && (
        <div>
          <div className={classes.detailProduct}>
            {/* anh mini o ben trai  */}
            <div className={classes.miniImg}>
              {/* {product.image.map((ele, index) => {
                <img src={ele} key={index}></img>;
              })} */}
              <img
                src={process.env.REACT_APP_API_URL + "/" + product?.image[0]}
                alt="image0"
              ></img>
              <img
                src={process.env.REACT_APP_API_URL + "/" + product?.image[1]}
                alt="image1"
              ></img>
              <img
                src={process.env.REACT_APP_API_URL + "/" + product?.image[2]}
                alt="image2"
              ></img>
              <img
                src={process.env.REACT_APP_API_URL + "/" + product?.image[3]}
                alt="image3"
              ></img>
            </div>
            {/* anh chinh o giua  */}
            <div className={classes.imgMain}>
              <img
                src={process.env.REACT_APP_API_URL + "/" + product?.image[0]}
                alt="image0"
              ></img>
            </div>

            {/* thanh phan hien thi mo ta san pham o ben phai */}
            <div className={classes.detailDescription}>
              <h1>{product.name}</h1>
              <h3>{editPrice(product.price)}</h3>
              <p>{product.short_desc}</p>
              <h3>Category : {product?.category}</h3>
              <div className={classes.formButton}>
                {/* form de lay du lieu cho vao cart */}
                <form>
                  <label htmlFor="" for="qty">
                    Quantity:
                  </label>
                  <input
                    ref={quantityInputRef}
                    type="number"
                    name="qty"
                    id="qty"
                    min="1"
                    max="10"
                    step="1"
                    defaultValue={quantity}
                    onChange={(e) => {
                      setQuantity(e.target.value);
                    }}
                  />
                </form>
                <button onClick={addToCartHandler}>Add to cart</button>
              </div>
            </div>
          </div>
          {/* MIDDLE thanh phan mo ta cu the  */}
          //{" "}
          <div className={classes.middle}>
            <span>Description</span>
            <h3>PRODUCT DESCRIPTION</h3>
            <p className={classes.description}>{product.long_desc}</p>
          </div>
          {/* BOTTOM gom cac san pham lien quan */}{" "}
          <div className={classes.bottom}>
            <h3>RELATED PRODUCTS</h3>{" "}
            <div className={classes.products}>
              {/* Neu co san pham lien quan thi hien thi ra man hinh  */}
              {related.length > 0 &&
                related.map((ele, index) => (
                  <Products
                    key={index}
                    item={ele} //obj chua thong tin san pham
                    click={showDetailHandler} //click show san pham
                    index={index} //index de hien thi
                  />
                ))}
            </div>
          </div>
          {/* Button de quay lai trang shop */}
          <div className={classes.backToShopBtn}>
            <button onClick={backToShopHandler}> Back To ShopPage</button>
          </div>
        </div>
      )}
      {/* Luc moi tai trang, Component duoc render lan dau chua co du lieu thi hien thi Loading...  */}
      {data.length === 0 && <h1>Loading...</h1>}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default DetailProduct;
