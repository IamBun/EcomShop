import classes from "./browseCategory.module.css";
import image1 from "../SRCIMG/product_1.png";
import image2 from "../SRCIMG/product_2.png";
import image3 from "../SRCIMG/product_3.png";
import image4 from "../SRCIMG/product_4.png";
import image5 from "../SRCIMG/product_5.png";
import { useNavigate } from "react-router-dom";

const BrowseCategory = () => {
  //gom cac hih anh duoc dieu huong den shoppage
  const navigate = useNavigate();

  const goShopPage = () => {
    navigate("/shop");
  };

  return (
    <div className={classes.browseCategory}>
      <p>CAREFULLY CREATED COLLECTIONS</p>
      <h1>BROWSE OUR CATEGORIES</h1>
      <div>
        <div className={classes.imgtop}>
          <img src={image1} onClick={goShopPage} className={classes.img1} />
          <img src={image2} onClick={goShopPage} className={classes.img2} />
        </div>
        <div className={classes.imgbottom}>
          <img src={image3} onClick={goShopPage} />
          <img src={image4} onClick={goShopPage} />
          <img src={image5} onClick={goShopPage} />
        </div>
      </div>
    </div>
  );
};

export default BrowseCategory;
