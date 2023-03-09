import Products from "../homePage/Products";
import classes from "./shopSearchDetail.module.css";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { categoriesActions } from "../../store/categories";
import { useNavigate } from "react-router-dom";

const ShopSearchDetail = () => {
  const categoriesInputRef = useRef(); //nhan gia tri nhap vao
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const data = useSelector((state) => state.data.currentData); // lay data tu store

  useEffect(() => {
    dispatch(categoriesActions.getCategories(data));
  }, [data]); //lan dau tai trang thi lay data, khi data thay doi thi tai lai

  const searchCategoryHandler = () => {
    const enteredInputRef = categoriesInputRef.current.value
      .toLowerCase()
      .trim(); //lay gia tri tu input, khong viet hoa
    let categoryArr = data.filter(
      //tao mang moi lay tu mang data sao cho category trung voi category nhap tu input
      // (ele) => ele.category === enteredInputRef
      (ele) =>
        ele.name.match(enteredInputRef) || ele.category === enteredInputRef
    );

    dispatch(categoriesActions.getCategories(categoryArr)); //goi len store luu mang category de hien thi
  };

  const categorySearch = useSelector((state) => state.categories.categories); // lay mang category tu store, da duoc danh gia lai

  console.log(categorySearch);

  const showDetailHandler = (index) => {
    //khi click thi chuyen den trang detail san pham
    console.log(index);
    const idDetail = index; //lay id cua san pham
    navigate(`/detail/${idDetail}`);
  };

  return (
    <div className={classes.shopSearchDetail}>
      <div>
        <input
          placeholder="Enter Search Here ! "
          ref={categoriesInputRef}
        ></input>
        <button onClick={searchCategoryHandler}>Search</button>
        {/* <button>Sort</button> */}
      </div>
      <div className={classes.searchDetail}>
        {/* Tim duoc san pham phu hop  */}
        {categorySearch.length > 0 ? (
          categorySearch.map((ele, index) => (
            <Products
              key={index}
              item={ele}
              click={showDetailHandler}
              index={ele._id}
            />
          ))
        ) : (
          // khong tim duoc san pham
          <h1>No result !</h1>
        )}
      </div>
    </div>
  );
};
export default ShopSearchDetail;
