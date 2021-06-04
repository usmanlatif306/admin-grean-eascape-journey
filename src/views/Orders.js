import React, { useEffect, useState } from "react";
import Active from "components/Orders/Active";
import Completed from "components/Orders/Completed";
import { useAuth } from "../Context/AuthContext";

export default function Orders() {
  const { orders, setOrders } = useAuth();
  const [isAll, setIsAll] = useState(true);
  const [iscomplete, setIsComplete] = useState(false);
  const [allOrders, setAllOrders] = useState([]);
  const [completed, setCompleted] = useState([]);
  useEffect(() => {
    if (orders.length > 0) {
      setAllOrders(orders.filter((order) => order.status !== "Completed"));
      setCompleted(orders.filter((order) => order.status === "Completed"));
    }
  }, [orders]);
  return (
    <div className="content">
      <div className="order-button">
        <button
          className={`btn ${isAll ? "btn-success" : "btn-outline-success"}`}
          onClick={() => {
            setIsAll(true);
            setIsComplete(false);
          }}
        >
          Active
        </button>
        <button
          className={`btn ${
            iscomplete ? "btn-success" : "btn-outline-success"
          } ml-4`}
          onClick={() => {
            setIsAll(false);
            setIsComplete(true);
          }}
        >
          Completed
        </button>
      </div>
      {isAll && <Active orders={allOrders} setOrders={setOrders} />}
      {iscomplete && <Completed orders={completed} setOrders={setCompleted} />}
    </div>
  );
}
