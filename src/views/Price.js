import React, { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { db } from "../firebase";
export default function Price() {
  const { plans, setPlans, cities } = useAuth();
  const [price, setPrice] = useState(0);
  function handleChange(e, index) {
    const data = [...plans];
    data[index] = e.target.value;
    setPrice(data[index]);
  }
  function handlePrice(id, slug) {
    var plan = db.collection("plans").doc(id);
    plan
      .update({
        price: price,
      })
      .then(() => {
        cities
          .filter((item) => item.plan === slug)
          .forEach((city) => {
            db.collection("cities").doc(city.id).update({
              price: price,
            });
          });
        setPlans(
          plans.map((plan) => {
            if (plan.id === id) {
              return {
                ...plan,
                price: price,
              };
            }
            return plan;
          })
        );
        setPrice(0);
        alert("Plan Price Successfully Updated");
      })
      .catch((err) => {
        console.log("Error updating document:", err);
      });
  }
  return (
    <div className="content">
      <div className="w-100">
        <h3 className="text-center text-primary p-0 m-0">Plan Price</h3>
        <hr className="w-25 mb-5" />

        {plans.map((plan, index) => (
          <div className="d-flex ml-5 text-center" key={plan.id}>
            <h3 style={{ width: "15%" }}>{plan.name}:</h3>
            <div className="form-group w-25 mx-3">
              <input
                type="number"
                step="100"
                className="form-control"
                defaultValue={plan.price}
                onChange={(e) => handleChange(e, index)}
              />
            </div>
            <div className="mt-0">
              <button
                className="btn btn-primary mt-0"
                onClick={() => handlePrice(plan.id, plan.slug)}
              >
                Save
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
