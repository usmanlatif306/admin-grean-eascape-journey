import React from "react";
import "./css/style.css";

export default function ViewModel({ setIsModal, order }) {
  return (
    <div className="model">
      <div className="model-position">
        <div className="model-content p-5">
          <i
            className="fas fa-times fa-2x text-danger modal-icon"
            onClick={() => setIsModal(false)}
          ></i>
          <div className=" d-flex border border-bottom-0">
            <h3 className="m-0 modal-th text-center py-1">Plan</h3>
            <p className="m-0 modal-tr pt-2 text-center">{order.plan}</p>
          </div>
          <div className=" d-flex border border-bottom-0">
            <h3 className="m-0 modal-th text-center py-1">City</h3>
            <p className="m-0 modal-tr pt-2 text-center">{order.city}</p>
          </div>
          <div className=" d-flex border border-bottom-0">
            <h3 className="m-0 modal-th text-center py-1">Persons</h3>
            <p className="m-0 modal-tr pt-2 text-center">{order.persons}</p>
          </div>
          <div className=" d-flex border border-bottom-0">
            <h3 className="m-0 modal-th text-center py-1">Price</h3>
            <p className="m-0 modal-tr pt-2 text-center">{order.total}</p>
          </div>
          <div className=" d-flex border border-bottom-0">
            <h3 className="m-0 modal-th text-center py-1">Mobile</h3>
            <p className="m-0 modal-tr pt-2 text-center">{order.mobile}</p>
          </div>
          <div className=" d-flex border border-bottom-0">
            <h3 className="m-0 modal-th text-center py-1">Address</h3>
            <p className="m-0 modal-tr pt-2 text-center">{order.address}</p>
          </div>
          <div className=" d-flex border">
            <h3 className="m-0 modal-th text-center py-1">Status</h3>
            <p className="m-0 modal-tr pt-2 text-center">{order.status}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
