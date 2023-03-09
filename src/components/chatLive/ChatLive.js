import { useEffect } from "react";
import { useState } from "react";
import classes from "./chatLive.module.css";
import openSocket from "socket.io-client";
import { useSelector } from "react-redux";
import io from "socket.io-client";
const socket = io("wss://shy-roan-roll.glitch.me", {
  transports: ["websocket"],
});
const ChatLive = () => {
  const token = useSelector((state) => state.currentUser.token);

  const userId = useSelector((state) => state.currentUser.userId);
  const name = useSelector((state) => state.currentUser.name);
  const [message, setMessage] = useState([]);
  const [userMessage, setUserMessage] = useState("");

  // window.addEventListener("keypress", (event) => {
  //   if (event.key === "Enter" && userMessage?.trim() !== "") {
  //     sendMessageHandler();
  //   }
  // });

  socket.on("client-receive", (SupportMess) => {
    setMessage([...message, SupportMess]);
  });

  const sendMessageHandler = (e) => {
    socket.emit("client-sent", {
      sender: userId,
      name: name,
      content: userMessage,
    });
    setMessage([...message, { sender: userId, content: userMessage }]);
    setUserMessage("");
  };
  return (
    <div className={classes.livechatWrapper}>
      <div className={classes.right}>
        <div className={classes.chatRender}>
          {message.length > 0 &&
            message.map((ele, index) => {
              return (
                <div
                  key={index}
                  className={
                    ele.sender === userId
                      ? classes.chatMessageRight
                      : classes.chatMessageLeft
                  }
                >
                  <span
                    className={
                      ele.sender === userId ? classes.support : classes.client
                    }
                  >
                    {ele.content}
                  </span>
                </div>
              );
            })}
        </div>
        <div className={classes.chatType}>
          <input
            placeholder="Typing here..."
            onChange={(e) => {
              setUserMessage(e.target.value);
            }}
            value={userMessage}
          ></input>
          <button onClick={sendMessageHandler}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default ChatLive;
