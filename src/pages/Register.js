import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { db } from "../firebase";
import { auth } from "../firebase";
import firebase from "firebase/app";
export default function Register() {
  const [state, setState] = useState({
    name: "",
    phone: "",
    type: "premium",
    status: "enable",
  });
  const emailRef = useRef();
  const pwdRef = useRef();
  const cpwdRef = useRef();
  const history = useHistory();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const { signup } = useAuth();

  const handleChange = ({ target }) => {
    setState({ ...state, [target.name]: target.value });
  };
  async function handleSubmit(e) {
    e.preventDefault();
    if (pwdRef.current.value !== cpwdRef.current.value) {
      return setError("Password does not match");
    }
    try {
      setError("");
      setIsLoading(true);
      await auth
        .createUserWithEmailAndPassword(
          emailRef.current.value,
          pwdRef.current.value
        )
        .then((currentUser) => {
          db.collection("admin").doc(currentUser.user.uid).set({
            name: state.name,
            phone: state.phone,
            email: currentUser.user.email,
            pic: "",
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
          });
          history.push("/login");
        });
    } catch {
      setError("Failed to Sign Up");
    }
    setIsLoading(false);
  }
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-6 offset-3">
          <div className="d-flex justify-content-between">
            <h4 className="m-0">Register</h4>
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
          </div>
          <hr />
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name"</label>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Enter Name"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Phone No:</label>
              <input
                type="text"
                name="phone"
                onChange={handleChange}
                className="form-control"
                placeholder="Enter Phone No:"
              />
            </div>
            <div className="form-group">
              <label>Email address:</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                ref={emailRef}
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                ref={pwdRef}
              />
            </div>
            <div className="form-group">
              <label>Confirm Password:</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password again"
                ref={cpwdRef}
              />
            </div>
            {error !== "" ? (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            ) : null}

            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
