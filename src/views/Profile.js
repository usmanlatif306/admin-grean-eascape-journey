import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../Context/AuthContext";
import { db } from "../firebase";
import "./css/style.css";
import firebase from "firebase/app";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
import Password from "./Password";
import ProgressBar from "components/ProgressBar";

const User = () => {
  const { currentUser, admin, setAdmin } = useAuth();
  const [image, setImage] = useState();
  const [file, setFile] = useState();
  const [preview, setPreview] = useState();
  const [isDisable, setIsDisable] = useState(false);
  const [url, setUrl] = useState();
  const [error, setError] = useState(null);
  const [nameError, setNameError] = useState(null);
  const [isChangeEmail, setIsChangeEmail] = useState(false);
  const [state, setState] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  //Handle input changes
  const handleChange = ({ target }) => {
    setState({ ...state, [target.name]: target.value });
  };

  // For Preview image
  useEffect(() => {
    if (admin) {
      setPreview(admin.image);
      setState({
        ...state,
        name: admin.name,
        email: admin.email,
        phone: admin.phone,
      });
    }
  }, [admin]);
  // For updating record in database
  useEffect(() => {
    if (url) {
      var admin = db.collection("admin").doc(currentUser.uid);
      admin
        .update({
          name: state.name,
          email: state.email,
          phone: state.phone,
          image: url,
        })
        .then(() => {
          setAdmin({
            ...admin,
            name: state.name,
            email: state.email,
            phone: state.phone,
            image: url,
          });
          setState({
            ...state,
            password: "",
          });
          setImage();
          setFile();
          setUrl();
          setIsChangeEmail(false);
          setIsDisable(false);
          alert("Profile Successfully Updated");
        })
        .catch((err) => {
          console.log("Error updating document:", err);
        });
    }
  }, [url]);

  //Handle input changes
  function imageChange(e) {
    const img = e.target.files[0];
    setImage(img);
    const reader = new FileReader();

    reader.onloadend = () => {
      setPreview(reader.result);
    };
    if (img) {
      reader.readAsDataURL(img);
      setPreview(reader.result);
    } else {
      setPreview("");
    }
  }
  function handleProfileSubmit(e) {
    e.preventDefault();
    setError(null);
    setNameError(null);
    if (state.name.length < 3) {
      setNameError("Name should be 3 characters long.");
    } else if (!state.name.match(/^[A-Za-z_ ]+$/)) {
      setNameError("Only letters are allowed");
    } else if (admin.email !== state.email && state.password === "") {
      setIsChangeEmail(true);
    } else {
      setIsDisable(true);
      if (admin.email !== state.email) {
        var credential = firebase.auth.EmailAuthProvider.credential(
          firebase.auth().currentUser.email,
          state.password
        );
        currentUser
          .reauthenticateWithCredential(credential)
          .then(function () {
            currentUser.updateEmail(state.email).then(function () {
              if (image) {
                setFile(image);
              } else {
                setUrl(admin.image);
              }
              // setIsChangeEmail(false);
              // alert("Profile Successfully Updated!");
            });
          })
          .catch(function (error) {
            setError("Wrong password.");
          });
      } else {
        if (image) {
          setFile(image);
        } else {
          setUrl(admin.image);
        }
      }
    }
  }
  return (
    <>
      <div className="content">
        <>
          {/* {admin && ( */}
          <Row>
            <Col md="6">
              <Card className="card-user">
                <CardHeader>
                  <CardTitle tag="h5" className="text-center">
                    Profile Information
                  </CardTitle>
                </CardHeader>

                <CardBody>
                  <form onSubmit={handleProfileSubmit}>
                    <div className="profile-img">
                      <img
                        alt="..."
                        className="pro-img"
                        src={
                          preview
                            ? preview
                            : "https://www.kindpng.com/picc/m/252-2524695_dummy-profile-image-jpg-hd-png-download.png"
                        }
                      />
                      <div className="overrelay">
                        <label htmlFor="img-file">Change Photo</label>
                        <input
                          type="file"
                          id="img-file"
                          hidden
                          onChange={imageChange}
                        />
                      </div>
                    </div>
                    <div className="form-group mt-5">
                      <label>Name</label>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={state.name}
                        onChange={handleChange}
                      />
                    </div>
                    {nameError && (
                      <div className="alert alert-danger">{nameError}</div>
                    )}
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={state.email}
                        onChange={handleChange}
                      />
                    </div>
                    {/* Passowrd for email change */}
                    {isChangeEmail && (
                      <div className="form-group">
                        <label>
                          Please enter your password for change Email
                        </label>
                        <input
                          type="password"
                          name="password"
                          className="form-control"
                          value={state.password}
                          onChange={handleChange}
                        />
                      </div>
                    )}

                    <div className="form-group">
                      <label>Phone</label>
                      <input
                        type="number"
                        name="phone"
                        className="form-control"
                        value={state.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="text-center">
                      {file && (
                        <ProgressBar
                          file={file}
                          setFile={setFile}
                          setUrl={setUrl}
                        />
                      )}
                      <Button
                        className="btn-round"
                        color="primary"
                        type="submit"
                        disabled={isDisable}
                      >
                        Update Profile
                      </Button>
                    </div>
                  </form>
                </CardBody>
              </Card>
            </Col>
            <Col md="6">
              <Password user={currentUser} />
            </Col>
          </Row>
          {/* )} */}
        </>
      </div>
    </>
  );
};

export default User;
