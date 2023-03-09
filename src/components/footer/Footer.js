import { NavLink } from "react-router-dom";
import classes from "./footer.module.css";

const Footer = () => {
  //Chua cac link den cac trang gioi thieu, hien tai la hardcode
  return (
    <div className={classes.footer}>
      <div>
        <h2> CUSTOMER SERVICE</h2>
        <ul className={classes.left}>
          <li>
            <NavLink to="#">Helps & Contact Us</NavLink>
          </li>
          <li>
            <NavLink to="#">Returns & Refunds</NavLink>
          </li>
          <li>
            <NavLink to="#">Online Stores</NavLink>
          </li>
          <li>
            <NavLink to="#">Terms & Conditions</NavLink>
          </li>
        </ul>
      </div>
      <div>
        <h2>COMPANY</h2>
        <ul className={classes.middle}>
          <li>
            <NavLink to="#">What We Do</NavLink>
          </li>
          <li>
            <NavLink to="#">Available Services</NavLink>
          </li>
          <li>
            <NavLink to="#">Latest Posts</NavLink>
          </li>
          <li>
            <NavLink to="#">FAQs</NavLink>
          </li>
        </ul>
      </div>
      <div>
        <h2>SOCIAL MEDIA</h2>
        <ul className={classes.right}>
          <li>
            <NavLink to="#">Twitter</NavLink>
          </li>
          <li>
            <NavLink to="#">Instagram</NavLink>
          </li>
          <li>
            <NavLink to="#">Facebook</NavLink>
          </li>
          <li>
            <NavLink to="#">Pinterest</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
