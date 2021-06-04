import React, { useState } from "react";
import { db } from "../../firebase";
import ViewModal from "Models/ViewModel";
export default function Completed({ orders, setOrders }) {
  const [isModal, setIsModal] = useState(false);
  const [modalData, setModalData] = useState();
  const [selectItems, setSelectItems] = useState([]);
  // **** View Modal Data
  async function handleViewModal(id) {
    await setModalData(orders.filter((order) => order.id === id)[0]);
    setIsModal(true);
  }
  // **** Delete Order
  function handleOrderDelete(id) {
    if (window.confirm("Are you sure to want delete")) {
      db.collection("orders")
        .doc(id)
        .delete()
        .then(() => {
          setOrders(orders.filter((item) => item.id !== id));
        })
        .catch((err) => {
          console.log("Error while deleting document", err);
        });
    }
  }
  // **** handle Select Change
  function handleSelectChange(id) {
    let selectArray = selectItems.filter((item) => item.id === id);
    if (selectArray.length > 0) {
      setSelectItems(selectItems.filter((item) => item.id !== id));
    } else {
      setSelectItems((state) => [
        ...state,
        {
          id: id,
        },
      ]);
    }
  }
  // **** handle Select Delete
  function handleSelectDelete() {
    if (
      window.confirm(`Are you sure to want delete ${selectItems.length} orders`)
    ) {
      setOrders(
        orders.filter((order) => {
          for (let i = 0; i < selectItems.length; i++) {
            if (order.id === selectItems[i].id) {
              return false;
            }
          }
          return true;
        })
      );
      setSelectItems([]);
      selectItems.map((item) => {
        db.collection("orders").doc(item.id).delete();
      });
    }
  }
  return (
    <div className="complete-orders w-100">
      <h3 className="text-center text-primary p-0 m-0">Completed Orders</h3>
      <hr className="w-25" />
      {orders.length < 1 ? (
        <h1>No Order Found</h1>
      ) : (
        <>
          {selectItems.length > 0 && (
            <div className="item__selected">
              <span>{`${selectItems.length} selected`}</span>
              <button
                className="btn btn-sm btn-danger ml-3"
                onClick={handleSelectDelete}
              >
                Delete
              </button>
            </div>
          )}
          <table className="table table-hover text-center">
            <thead className="thead-dark">
              <tr>
                <th></th>
                <th>No</th>
                <th>Plan</th>
                <th>City</th>
                <th>Persons</th>
                <th>Price</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td>
                    <div>
                      <input
                        type="checkbox"
                        onChange={() => handleSelectChange(order.id)}
                      />
                    </div>
                  </td>
                  <td>{index + 1}</td>
                  <td>{order.plan}</td>
                  <td>{order.city}</td>
                  <td>{order.persons}</td>
                  <td>{order.total}</td>
                  <td>{order.status}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => handleViewModal(order.id)}
                    >
                      view
                    </button>
                    <button
                      className="btn btn-sm btn-danger ml-2"
                      onClick={() => handleOrderDelete(order.id)}
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {isModal && <ViewModal setIsModal={setIsModal} order={modalData} />}
    </div>
  );
}
