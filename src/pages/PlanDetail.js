import React, { useEffect, useState } from "react";
import "./css/style.css";
import { Link } from "react-router-dom";
import { Card, CardBody, CardFooter, Row, Col } from "reactstrap";
import { useAuth } from "../Context/AuthContext";
import { db } from "../firebase";
export default function PlanDetail(props) {
  const { cities, plans, setCities } = useAuth();
  const [plan, setPlan] = useState([]);
  const name = props.match.params.plan;
  useEffect(() => {
    if (cities.length > 0) {
      setPlan(cities.filter((city) => city.plan === name));
    }
  }, [cities]);
  function handleCityDelete(id) {
    if (window.confirm("Are you sure to want delete")) {
      db.collection("cities")
        .doc(id)
        .delete()
        .then(() => {
          setCities(cities.filter((item) => item.id !== id));
        })
        .catch((err) => {
          console.log("Error while deleting document", err);
        });
    }
  }
  return (
    <div className="content">
      <div className="w-100">
        <h3 className="text-center text-primary p-0 m-0 text-capitalize">
          {name}
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
          {plan.length === 0 && (
            <h1 className="text-center text-primary pl-5">
              No city found in this plan
            </h1>
          )}
          {plan.map((city) => (
            <Col lg="3" md="6" sm="12" key={city.id}>
              <Link
                to={`/admin/plans/${name}/${city.id}`}
                style={{ textDecoration: "none" }}
              >
                <Card className="card-stats card-plan">
                  <CardBody>
                    <div className="text-center">
                      <img
                        src={city.image}
                        alt=""
                        style={{ height: "150px" }}
                      />
                    </div>
                  </CardBody>
                  <CardFooter>
                    <hr />
                    <div className="d-flex justify-content-between">
                      <h6 className="">{city.city}</h6>
                      <h6>
                        Rs:{" "}
                        {
                          plans.filter((plan) => plan.slug === city.plan)[0]
                            .price
                        }
                      </h6>
                    </div>
                  </CardFooter>
                  <i
                    className="fas fa-times text-danger plan-icon"
                    onClick={() => handleCityDelete(city.id)}
                  ></i>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
