import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Card from "../../UI/Card";
import CardRed from "../../UI/CardRed";

function CartInfo() {
  const [items, setItems] = useState([]);
  const location = useLocation();
  const cartId = location.state && location.state.cartId;

  let url = "http://localhost:5000/carts/" + cartId;
  console.log(url);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch carts
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        const updatedItems = data.map((item) => ({
          id: item.id,
          name: item.name,
          email: item.email,
          price: item.price,
          status: getStatusString(item.status),
        }));
        setItems(updatedItems);
      } catch (error) {
        console.error("Error fetching carts:", error);
      }
    };

    fetchData();
  }, [url]);

  const getStatusString = (status) => {
    if (status === 1 || status === 0) {
      console.log("1");
      return "waiting for a payment";
    }

    if (status === 2) {
      console.log("1");
      return "customer paid";
    }
    return "";
  };
  return (
    <section>
      {items.map((item) =>
        item.status === "2" ? (
          <Card key={item.id}>
            <div>cart id: {cartId}</div>
            <div>status: {item.status}</div>
            <div>item name: {item.name}</div>
            <div>item price: {item.price}</div>
            <div>user email: {item.email}</div>
          </Card>
        ) : (
          <CardRed key={item.id}>
            <div>cart id: {cartId}</div>
            <div>status: {item.status}</div>
            <div>item name: {item.name}</div>
            <div>item price: {item.price}</div>
            <div>user email: {item.email}</div>
            <div>
              <button>Nudge customer</button>
            </div>
          </CardRed>
        )
      )}
    </section>
  );
}

export default CartInfo;
