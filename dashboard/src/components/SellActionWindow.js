import React, { useState, useContext } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";

import "./BuySellActionWindow.css";

const SellActionWindow = ({ uid }) => {
  const generalContext = useContext(GeneralContext);
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);

  const handleSellClick = () => {
    axios.post("http://localhost:3002/newOrder", {
      name: uid,
      qty: Number(stockQuantity),
      price: Number(stockPrice),
      mode: "SELL",
    });
    generalContext.closeSellWindow();
  };

  const handleCancelClick = () => {
    generalContext.closeSellWindow();
  };

  return (
    <div className="container" id="sell-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="sell-qty"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
              min="1"
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="sell-price"
              step="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
              min="0"
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Margin required ₹140.65</span>
        <div>
          <button className="btn btn-red" onClick={handleSellClick}>
            Sell
          </button>
          <button to="" className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellActionWindow;
