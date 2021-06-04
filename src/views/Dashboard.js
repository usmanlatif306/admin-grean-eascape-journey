import DashOrders from "components/Dashboard/DashOrders";
import DashPlan from "components/Dashboard/DashPlan";
import DashUsers from "components/Dashboard/DashUsers";
import TopCard from "components/Dashboard/TopCard";
import React from "react";
import { useAuth } from "../Context/AuthContext";
export default function Dashboard() {
  const { orders, setIsOrder, users, setIsUser, plans, cities } = useAuth();
  return (
    <>
      <div className="content">
        <TopCard
          orders={orders}
          setIsOrder={setIsOrder}
          users={users}
          setIsUser={setIsUser}
        />
        <DashOrders orders={orders} />
        <DashPlan plans={plans} cities={cities} />
        <DashUsers users={users} />
      </div>
    </>
  );
}
