import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import classes from "./navBar.module.css";
import { useDispatch } from "react-redux";
import { currentUserActions } from "../../store/user";
import { BiCartAlt } from "react-icons/bi";
import { BiUserCircle } from "react-icons/bi";
import { BiMenu } from "react-icons/bi";
import { BsFillInboxesFill } from "react-icons/bs";
import { cartActions } from "../../store/cartStore";
import { useState, useEffect } from "react";

const NavBar = () => {
  const userId = useSelector((state) => state.currentUser.userId);
  const userToken = useSelector((state) => state.currentUser.token);
  const isUser = useSelector((state) => state.currentUser.name);
  const cartTotal = useSelector((state) => state.cart.totalProduct);

  const [isShow, setIsShow] = useState(false);

  const dispatch = useDispatch();

  const logoutHandler = async () => {
    //khi click nut logout
    try {
      const res = await fetch(process.env.REACT_APP_API_URL + "/auth/logout", {
        credentials: "include",
        method: "POST",
        headers: {
          withCredentials: true,
        },
      }); //xoa session
      if (!res.ok) {
        throw new Error("Loading failed");
      }
    } catch (error) {
      console.log(error);
    }
    dispatch(currentUserActions.logout()); // gui dispatch logout
    dispatch(cartActions.logoutCart()); // gui dispatch logout cart
    setIsShow(false); //tat popup menu hamburger
  };

  const toggleMenu = () => {
    setIsShow(!isShow);
  };

  const hideMenu = () => {
    setIsShow(false);
  };

  return (
    <div>
      <div className={classes.navBar}>
        <ul className={classes.left}>
          {/* Navbar nao active thi them class active vao  */}
          <li>
            <NavLink
              end
              to="/"
              className={({ isActive }) =>
                isActive ? `${classes.active}` : undefined
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/shop"
              className={({ isActive }) =>
                isActive ? `${classes.active}` : undefined
              }
            >
              Shop
            </NavLink>
          </li>
        </ul>
        <div className={classes.middle}>
          <h1>BOUTIQUE</h1>
        </div>
        <ul className={classes.right}>
          <li className={classes.cart}>
            <BiCartAlt />
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive ? `${classes.active}` : undefined
              }
            >
              Cart
            </NavLink>
            {/* Neu cart co item va nguoi dung luu trong cart la nguoi dung hien tai thi in so luong cart item ra man hinh */}
            {cartTotal > 0 && <span> ( {cartTotal} )</span>}
          </li>

          {/* User chua dang nhap thi hien nut login */}

          {!userToken && (
            <li className={classes.login}>
              <BiUserCircle />
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? `${classes.active}` : undefined
                }
              >
                Login
              </NavLink>
            </li>
          )}

          {/* User da dang nhap thi hien email user */}
          {userToken && (
            <li className={classes.order}>
              <BsFillInboxesFill />
              <NavLink
                to="/order"
                className={({ isActive }) =>
                  isActive ? `${classes.active}` : undefined
                }
              >
                Order
              </NavLink>
            </li>
          )}

          {userToken && (
            <li className={classes.login}>
              <BiUserCircle />
              {isUser}
            </li>
          )}

          {/* User da dang nhap thi hien thi nut logout */}
          {userToken && (
            <li>
              <NavLink to="/" onClick={logoutHandler}>
                Logout
              </NavLink>
            </li>
          )}
        </ul>
      </div>

      {/* Div Hambeger Reponsive Mobile */}
      <div className={classes.navHamburger}>
        <BiMenu onClick={toggleMenu} />
        {isShow && (
          <ul>
            <li>
              <NavLink
                onClick={hideMenu}
                end
                to="/"
                className={({ isActive }) =>
                  isActive ? `${classes.active}` : undefined
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={hideMenu}
                to="/shop"
                className={({ isActive }) =>
                  isActive ? `${classes.active}` : undefined
                }
              >
                Shop
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={hideMenu}
                to="/order"
                className={({ isActive }) =>
                  isActive ? `${classes.active}` : undefined
                }
              >
                Order
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={hideMenu}
                to="/cart"
                className={({ isActive }) =>
                  isActive ? `${classes.active}` : undefined
                }
              >
                Cart
              </NavLink>
              {cartTotal > 0 && <span> ( {cartTotal} )</span>}
            </li>
            {!isUser && (
              <li className={classes.login}>
                <NavLink
                  onClick={hideMenu}
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? `${classes.active}` : undefined
                  }
                >
                  Login
                </NavLink>
              </li>
            )}
            {isUser && (
              <li className={classes.login}>
                <BiUserCircle />
                {isUser}
              </li>
            )}
            {isUser && (
              <li>
                <NavLink to="/" onClick={logoutHandler}>
                  Logout
                </NavLink>
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default NavBar;
