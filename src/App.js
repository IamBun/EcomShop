import React, { Suspense, useState } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from ".//page/HomePage";
import Layout from "./components/layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { dataActions } from "./store/data";
import LoadingSpinner from "./components/UI/LoadingSpinner";
// import { useState } from "react";
//Lazy Load
const ShopPage = React.lazy(() => import(".//page/ShopPage"));
const CheckoutPage = React.lazy(() => import(".//page/CheckoutPage"));
const LoginPage = React.lazy(() => import(".//page/LoginPage"));
const RegisterPage = React.lazy(() => import(".//page/RegisterPage"));
const CartPage = React.lazy(() => import(".//page/CartPage"));
const DetailPage = React.lazy(() => import(".//page/DetailPage"));
const OrderPage = React.lazy(() => import(".//page/OrderPage"));
const OrderIdDetail = React.lazy(() =>
  import("./components/orderPage/OrderIdDetail")
);
// const ChatLive = React.lazy(() => import(".//page/ChatLivePage"));
function App() {
  console.log(process.env.REACT_APP_API_URL)
  const token = useSelector((state) => state.currentUser.token);
  const dispatch = useDispatch();
  const getProducts = async function () {
    try {
      const res = await fetch(
        process.env.REACT_APP_API_URL +
          // "https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74"
          "/shop/allProduct",
        {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        throw new Error("Loading failed !");
      }

      const data = await res.json();
      dispatch(dataActions.getData(data.products));
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <Layout>
        <Suspense
          fallback={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "100px auto",
              }}
            >
              <LoadingSpinner />
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/shop" element={<ShopPage />}></Route>
            <Route path="/cart" element={<CartPage />}></Route>
            <Route path="/detail/:productId" element={<DetailPage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/register" element={<RegisterPage />}></Route>
            {token && (
              <Route path="/checkout" element={<CheckoutPage />}></Route>
            )}
            {token && (
              <Route path="/order/:orderId" element={<OrderIdDetail />}></Route>
            )}
            {token && <Route path="/order" element={<OrderPage />}></Route>}
            <Route path="*" element={<HomePage />}></Route>
          </Routes>
        </Suspense>
      </Layout>
    </>
  );
}

export default App;
