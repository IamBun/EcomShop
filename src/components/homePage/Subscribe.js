import classes from "./subscribe.module.css";
const Subscribe = () => {
  //thanh subscribe de nguoi dung dang ky
  const subscribe = (e) => {
    //ham xu ly khi nguoi dung click dang ky
    e.preventDefault();
  };
  return (
    <div className={classes.subscribe}>
      <div className={classes.sologan}>
        <h2>LET'S BE FRIENDS !</h2>
        <p>Hi friends, we are always here !</p>
      </div>
      <div>
        <form className={classes.form}>
          <input placeholder="enter your email address"></input>
          <button onClick={subscribe}>Subscribe</button>
        </form>
      </div>
    </div>
  );
};

export default Subscribe;
