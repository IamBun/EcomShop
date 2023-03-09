import Banner from "./Banner";
import BrowseCategory from "./BrowseCategory";
import TopTrending from "./TopTrending";
import OtherInfo from "./OtherInfo";
import Subscribe from "./Subscribe";

const Home = () => {
  //chua toan bo noi dung cua trang home
  return (
    <>
      <Banner />
      <BrowseCategory />;
      <TopTrending />
      <OtherInfo />
      <Subscribe />
    </>
  );
};

export default Home;
