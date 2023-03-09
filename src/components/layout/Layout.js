import NavBar from "../navBar/NavBar";
import Footer from "../footer/Footer";
import ChatLive from "../chatLive/ChatLive";
import { useState } from "react";
import { useSelector } from "react-redux";
import classes from "./layout.module.css";
import { BiMessageRoundedDots } from "react-icons/bi";
const Layout = (props) => {
  //NavBar va Footer bao boc cac noi dung con lai
  const token = useSelector((state) => state.currentUser.token);
  const [showChat, setShowChat] = useState(false);
  return (
    <>
      <NavBar />
      {props.children}
      <Footer />
      {token && (
        <div className={classes.chatlivePosition}>
          <BiMessageRoundedDots
            onClick={() => {
              setShowChat(!showChat);
            }}
          >
            CHAT
          </BiMessageRoundedDots>
          {showChat && <ChatLive />}
        </div>
      )}
    </>
  );
};

export default Layout;
