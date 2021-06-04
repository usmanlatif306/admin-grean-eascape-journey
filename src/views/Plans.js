import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardFooter, Row, Col } from "reactstrap";
import { useAuth } from "../Context/AuthContext";
export default function Plans() {
  const { plans } = useAuth();
  // To handle plan image change
  function handlePlanImage(id) {
    alert(id);
  }
  // https://firebasestorage.googleapis.com/v0/b/fypgej.appspot.com/o/silver.png?alt=media&token=ef9ca847-bd43-4837-a06f-ef22ada35d1e
  // https://firebasestorage.googleapis.com/v0/b/fypgej.appspot.com/o/gold.png?alt=media&token=7ccf9420-1750-4037-9cae-ec69bc45a446
  return (
    <div className="content">
      <div className="w-100">
        <h3 className="text-center text-primary p-0 m-0">
          Plans
          <Link
            to="/admin/plans/new"
            className="text-danger ml-3"
            style={{ textDecoration: "none", fontSize: "23px" }}
            title="Add new destination"
          >
            <i className="fas fa-plus-circle"></i>
          </Link>
        </h3>
        <hr className="w-25 mb-5" />
        <Row>
          {plans.map((plan) => (
            <Col lg="4" md="4" sm="12" key={plan.id}>
              <Link
                to={`/admin/plans/${plan.slug}`}
                style={{ textDecoration: "none" }}
              >
                <Card className="card-stats">
                  <CardBody>
                    <div className="text-center">
                      <img
                        src={plan.image}
                        alt=""
                        style={{ height: "250px" }}
                      />
                    </div>
                    <Link to={`/admin/plans/edit/${plan.slug}`}>
                      <span
                        className="plan__edit"
                        // onClick={() => handlePlanImage(plan.id)}
                      >
                        <i className="far fa-edit text-warning"></i>
                      </span>
                    </Link>
                  </CardBody>
                  <CardFooter>
                    <hr />
                    <h6 className="text-center">{plan.name}</h6>
                  </CardFooter>
                </Card>
              </Link>
            </Col>
          ))}
          {/* {error && <div className="alert alert-danger">{error}</div>} */}
        </Row>
      </div>
    </div>
  );
}
