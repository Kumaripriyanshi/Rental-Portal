import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/CartStyles.css";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();

  const navigate = useNavigate();

  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async (id) => {
    const { data } = await axios.get(`/api/v1/auth/get-user-by-id/${id}`);
    console.log(data);
    return data;
  };
  //detele item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className=" cart-page">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {!auth?.user
                ? "Hello Guest"
                : `Hello  ${auth?.token && auth?.user?.firstName}`}
              <p className="text-center">
                {cart?.length
                  ? `You liked ${cart.length} properties ${
                      auth?.token ? "" : "please login to checkout !"
                    }`
                  : " Your Haven't liked "}
              </p>
            </h1>
          </div>
        </div>
        <div className="container ">
          <div className="row ">
            <div className="col-md-7  p-0 m-0">
              {cart?.map((p) => (
                <div className="row card flex-row" key={p._id}>
                  {console.log("seller = ", p.seller)}
                  <div className="col-md-9">
                    <div className="row">
                      <div className="col-md-4">
                        <img
                          src={`/api/v1/product/product-photo/${p._id}`}
                          className="card-img-top"
                          alt={p.name}
                          width="100%"
                          height={"130px"}
                        />
                      </div>
                      <div className="col-md-4">
                        <p>{p.name}</p>
                        <p>{p.description.substring(0, 30)}</p>
                        <p>Price : {p.price}</p>
                      </div>
                      <div className="col-md-4 cart-remove-btn">
                        <button
                          className="btn btn-danger"
                          onClick={() => removeCartItem(p._id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-3 card">
                    {auth?.token ? (
                      <div>
                        <h5>Seller Details</h5>
                        Name : {p.seller.firstName + " " + p.seller.lastName}
                        <br />
                        Email : {p.seller.email}
                        <br />
                        Phone : {p.seller.phone}
                        <br />
                      </div>
                    ) : (
                      <h4>Login to View Sellers Details</h4>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
