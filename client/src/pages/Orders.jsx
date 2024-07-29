// Orders.jsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getOrders } from "../api";

const OrdersContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: auto;
`;

const OrderCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin: 10px;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getOrders(token);
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, [token]);

  return (
    <OrdersContainer>
      <h2>Your Orders</h2>
      <div>
        {orders.map((order) => (
          <OrderCard key={order._id}>
            <h3>Order #{order._id}</h3>
            <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
            <p>Total: ${order.total}</p>
            <ul>
              {order.items.map((item) => (
                <li key={item._id}>{item.name}</li>
              ))}
            </ul>
          </OrderCard>
        ))}
      </div>
    </OrdersContainer>
  );
};

export default Orders;
