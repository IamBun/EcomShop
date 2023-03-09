import DetailProduct from "../components/detailPage/DetailProduct";
import { useParams } from "react-router-dom";

const DetailPage = () => {
  const params = useParams();

  return (
    <>
      <DetailProduct id={params.productId} />
    </>
  );
};

export default DetailPage;
