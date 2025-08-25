import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import GeneralContext from "./GeneralContext";

import "./Orders.css";

const Orders = () => {
  const [allOrders, setallOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const generalContext = useContext(GeneralContext);

  useEffect(() => {
    fetch("http://localhost:3002/allOrders")
      .then((res) => res.json())
      .then((data) => {
        setallOrders(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch orders:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading orders...</p>;
  }

  if (allOrders.length === 0) {
    return (
      <div className="orders">
        <div className="no-orders">
          <p>You haven't placed any orders today</p>
          <Link to="/" className="btn">
            Get started
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="orders">
      <h2 className="title">Your Orders</h2>
      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Mode</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allOrders.map((order) => (
              <tr key={order._id}>
                <td> {order.name} </td>
                <td> {order.qty} </td>
                <td> {order.price} </td>
                <td> {order.mode} </td>
                <td>
                  <button className="btn btn-blue"
                    onClick={() => generalContext.openBuyWindow(order.name)}
                  >
                    Buy
                  </button>
                  <button className="btn btn-red"
                    onClick={() => generalContext.openSellWindow(order.name)}
                  >
                    Sell
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
