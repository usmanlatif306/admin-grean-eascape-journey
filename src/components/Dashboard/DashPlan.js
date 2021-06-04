import React from "react";
import { Link } from "react-router-dom";
import { Card, Row, Col } from "reactstrap";
export default function DashPlan({ plans, cities }) {
  return (
    <div className="mt-3">
      <Link
        to="/admin/plans"
        className="text-primary"
        style={{ textDecoration: "none", fontSize: "30px" }}
      >
        Plans
      </Link>
      <Row className="mt-3">
        <Col lg="12" md="12" sm="12">
          <Card>
            <table className="table table-hover text-center">
              <thead className="thead-dark">
                <tr>
                  <th>No</th>
                  <th>Plan Name</th>
                  <th>Cities</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {plans.map((plan, index) => (
                  <tr key={plan.id}>
                    <td>{index + 1}</td>
                    <td>{plan.name}</td>
                    <td>
                      {cities.filter((city) => city.plan === plan.slug).length}
                    </td>
                    <td>{plan.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
