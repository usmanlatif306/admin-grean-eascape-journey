import React from "react";
import { Link } from "react-router-dom";
import { Card, Row, Col } from "reactstrap";
export default function DashOrders({ orders }) {
  return (
    <>
      <Link
        to="/admin/orders"
        className="text-primary"
        style={{ textDecoration: "none", fontSize: "30px" }}
      >
        Orders
      </Link>
      <Row className="mt-3">
        <Col lg="12" md="12" sm="12">
          <Card>
            <table className="table table-hover text-center">
              <thead className="thead-dark">
                <tr>
                  <th>No</th>
                  <th>Plan</th>
                  <th>City</th>
                  <th>Persons</th>
                  <th>Price</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 5).map((order, index) => (
                  <tr key={order.id}>
                    <td>{index + 1}</td>
                    <td>{order.plan}</td>
                    <td>{order.city}</td>
                    <td>{order.persons}</td>
                    <td>{order.total}</td>
                    <td>{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
          <small>
            Showing only first five orders. For complete detail click on Orders
          </small>
        </Col>
      </Row>
    </>
  );
}
