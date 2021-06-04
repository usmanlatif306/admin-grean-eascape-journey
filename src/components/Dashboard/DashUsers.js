import React from "react";
import { Link } from "react-router-dom";
import { Card, Row, Col } from "reactstrap";
export default function DashUsers({ users }) {
  return (
    <>
      <Link
        to="/admin/users"
        className="text-primary"
        style={{ textDecoration: "none", fontSize: "30px" }}
      >
        Users
      </Link>
      <Row className="mt-3">
        <Col lg="12" md="12" sm="12">
          <Card>
            <table className="table table-hover text-center">
              <thead className="thead-dark">
                <tr>
                  <th>No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {users.slice(0, 5).map((user, index) => (
                  <tr key={user.id}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td className="text-capitalize">{user.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
          <small>
            Showing only first five users. For complete detail click on Users
          </small>
        </Col>
      </Row>
    </>
  );
}
