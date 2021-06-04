import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardFooter, Row, Col } from "reactstrap";
import { db, storage } from "../firebase";
import { useAuth } from "../Context/AuthContext";
import ProgressBar from "components/ProgressBar";
import firebase from "firebase/app";
import { useHistory } from "react-router";
function EditPlan(props) {
  const slug = props.match.params.plan;
  const fileRef = useRef();
  let history = useHistory();
  const { plans, setPlans, setIsPlan } = useAuth();
  const [plan, setPlan] = useState(
    plans.filter((item) => item.slug === slug)[0]
  );
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState();
  const [isPosted, setisPosted] = useState(false);
  const [state, setState] = useState({
    id: plan.id,
    name: plan.name,
  });
  //******** Getting Value on Change
  const handleChange = ({ target }) => {
    setState({
      ...state,
      [target.name]: target.value,
    });
  };
  //******** Save Record function
  function updateRecord(img, id) {
    var plan = db.collection("plans").doc(id);
    plan
      .update({
        name: state.name,
        image: img,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        alert("Plan has been Updated");
        setPlan({
          ...plan,
          name: state.plan,
          image: img,
        });
        setIsPlan((state) => !state);
        setisPosted(false);
        setFile(null);
        setImage(null);
        setUrl(null);
        fileRef.current.value = "";
      })
      .catch((error) => {
        // alert(error.message);
        console.log(error.message);
      });
  }
  //******** Save Record to Database
  useEffect(() => {
    if (url) {
      updateRecord(url, state.id);
    }
  }, [url]);
  //******** Rules to evaluate an Image
  const types = ["image/png", "image/jpeg", "image/jpg"];
  //******** Getting Image on Change
  const handleImageChange = (e) => {
    let selected = e.target.files[0];
    if (selected && types.includes(selected.type)) {
      setImage(selected);
    } else {
      setImage(null);
      setError("plaese select an image file");
    }
  };
  //******** Image Delete from database
  function handleImageDelete(id, img) {
    if (window.confirm("Are you sure to want delete")) {
      var plan = db.collection("plans").doc(id);
      plan.update({
        image: "",
      });
      let image = storage.refFromURL(img);
      image
        .delete()
        .then(() => {
          setPlan({
            ...plan,
            image: "",
          });
        })
        .catch((err) => {
          console.log("an error occur", err);
        });
    }
  }
  //******** Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    if (state.name.length < 3) {
      setError("Plan name must be contain 3 characters");
    } else if (!state.name.match(/^[A-Za-z_ ]+$/)) {
      setError("Only letters are allowed");
    } else {
      setisPosted(true);
      if (plan.image === "") {
        setFile(image);
      } else {
        updateRecord(plan.image, plan.id);
      }
    }
  };
  return (
    <div className="content">
      <h3 className="text-center text-primary p-0 m-0">{plan.name}</h3>
      <hr className="w-25 mb-3" />
      <div className="row">
        <div className="col-10 offset-1">
          <Card className="px-5 py-4">
            <form className="w-75 mx-auto" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Plan Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Enter Plan Name"
                  onChange={handleChange}
                  value={state.name}
                  required
                />
              </div>
              {/* {cityError && (
                <div className="alert alert-danger">{cityError}</div>
              )} */}
              <div className="edit-div">
                {plan.image !== "" && (
                  <img src={plan.image} alt="" style={{ width: "100%" }} />
                )}
                <i
                  className={`fas fa-times text-danger ${
                    plan.image === "" ? "hide" : "edit-icon"
                  }`}
                  onClick={() => handleImageDelete(plan.id, plan.image)}
                ></i>
              </div>
              <div className="form-group">
                <label htmlFor="coverImage">Cover Image</label>
                <input
                  type="file"
                  className="form-control"
                  id="coverImage"
                  onChange={handleImageChange}
                  ref={fileRef}
                  required={plan.image === ""}
                  disabled={plan.image !== ""}
                />
              </div>
              {file && (
                <ProgressBar file={file} setFile={setFile} setUrl={setUrl} />
              )}
              {error && <div className="alert alert-danger">{error}</div>}
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isPosted}
              >
                Submit
              </button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default EditPlan;
