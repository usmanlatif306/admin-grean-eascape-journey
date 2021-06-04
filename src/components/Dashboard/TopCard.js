import React from "react";
import { Card, CardBody, CardFooter, CardTitle, Row, Col } from "reactstrap";
export default function TopCard({ orders, setIsOrder, users, setIsUser }) {
  return (
    <>
      <h3 className="text-primary">Overall Statistics</h3>
      <Row>
        <Col lg="3" md="6" sm="6">
          <Card className="card-stats">
            <CardBody>
              <Row>
                <Col md="4" xs="5">
                  <div className="icon-big text-center icon-warning">
                    <i className="nc-icon nc-globe text-warning" />
                  </div>
                </Col>
                <Col md="8" xs="7">
                  <div className="numbers">
                    <p className="card-category">Orders</p>
                    <CardTitle tag="p">{orders.length}</CardTitle>
                    <p />
                  </div>
                </Col>
              </Row>
            </CardBody>
            <CardFooter>
              <hr />
              <div
                className="stats"
                style={{ cursor: "pointer" }}
                onClick={() => setIsOrder((state) => !state)}
              >
                <i className="fas fa-sync-alt" /> Update Now
              </div>
            </CardFooter>
          </Card>
        </Col>
        <Col lg="3" md="6" sm="6">
          <Card className="card-stats">
            <CardBody>
              <Row>
                <Col md="4" xs="5">
                  <div className="icon-big text-center icon-warning">
                    <i className="nc-icon nc-money-coins text-success" />
                  </div>
                </Col>
                <Col md="8" xs="7">
                  <div className="numbers">
                    <p className="card-category">Active</p>
                    <CardTitle tag="p">
                      {
                        orders.filter((order) => order.status !== "Completed")
                          .length
                      }
                    </CardTitle>
                    <p />
                  </div>
                </Col>
              </Row>
            </CardBody>
            <CardFooter>
              <hr />
              <div className="stats">
                <i className="far fa-calendar" /> Overall
              </div>
            </CardFooter>
          </Card>
        </Col>
        <Col lg="3" md="6" sm="6">
          <Card className="card-stats">
            <CardBody>
              <Row>
                <Col md="4" xs="5">
                  <div className="icon-big text-center icon-warning">
                    <i className="nc-icon nc-vector text-danger" />
                  </div>
                </Col>
                <Col md="8" xs="7">
                  <div className="numbers">
                    <p className="card-category">Completed</p>
                    <CardTitle tag="p">
                      {
                        orders.filter((order) => order.status === "Completed")
                          .length
                      }
                    </CardTitle>
                    <p />
                  </div>
                </Col>
              </Row>
            </CardBody>
            <CardFooter>
              <hr />
              <div className="stats">
                <i className="far fa-clock" /> Overall
              </div>
            </CardFooter>
          </Card>
        </Col>
        <Col lg="3" md="6" sm="6">
          <Card className="card-stats">
            <CardBody>
              <Row>
                <Col md="4" xs="5">
                  <div className="icon-big text-center icon-warning">
                    <i className="nc-icon nc-circle-10 text-primary" />
                  </div>
                </Col>
                <Col md="8" xs="7">
                  <div className="numbers">
                    <p className="card-category">Users</p>
                    <CardTitle tag="p">{users.length}</CardTitle>
                    <p />
                  </div>
                </Col>
              </Row>
            </CardBody>
            <CardFooter>
              <hr />
              <div
                className="stats"
                style={{ cursor: "pointer" }}
                onClick={() => setIsUser((state) => !state)}
              >
                <i className="fas fa-sync-alt" /> Update Now
              </div>
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </>
  );
}
