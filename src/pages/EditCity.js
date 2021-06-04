import React, { useEffect, useRef, useState } from "react";
import { Card } from "reactstrap";
import { db, storage } from "../firebase";
import firebase from "firebase/app";
import ProgressBar from "components/ProgressBar";
import { useAuth } from "../Context/AuthContext";
import { useHistory } from "react-router";
export default function EditCity(props) {
  const id = props.match.params.city;
  const plan = props.match.params.plan;
  const { cities, plans } = useAuth();
  const fileRef = useRef();
  let history = useHistory();
  const [city, setCity] = useState(
    cities.filter((city) => city.id === id && city.plan === plan)[0]
  );
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [cityError, setcityError] = useState(null);
  const [detailError, setdetailError] = useState(null);
  const [url, setUrl] = useState();
  const [isPosted, setisPosted] = useState(false);

  const [state, setState] = useState({
    id: city.id,
    plan: city.plan,
    city: city.city,
    detail: city.detail,
  });
  //******** Save Record function
  function updateRecord(img, id) {
    var city = db.collection("cities").doc(id);
    city
      .update({
        plan_id: state.plan === "silver" ? 1 : state.plan === "gold" ? 2 : 3,
        plan: state.plan,
        city: state.city,
        detail: state.detail,
        image: img,
        price:
          state.plan === "silver"
            ? plans.filter((plan) => plan.slug === state.plan)[0].price
            : state.plan === "gold"
            ? plans.filter((plan) => plan.slug === state.plan)[0].price
            : plans.filter((plan) => plan.slug === state.plan)[0].price,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        alert("Plan destination has been Updated");
        setState({
          plan: state.plan,
          city: state.city,
          detail: state.detail,
        });
        setCity({
          ...city,
          plan: state.plan,
          city: state.city,
          detail: state.detail,
          image: img,
        });
        setisPosted(false);
        setFile(null);
        setImage(null);
        setUrl(null);
        fileRef.current.value = "";
      })
      .catch((error) => {
        alert(error.message);
      });
  }
  //******** Save Record to Database
  useEffect(() => {
    if (url) {
      updateRecord(url, state.id);
      // console.log(state.id);
    }
  }, [url]);
  //******** Rules to evaluate an Image
  const types = ["image/png", "image/jpeg", "image/jpg"];
  //******** Getting Value on Change
  const handleChange = ({ target }) => {
    setState({
      ...state,
      [target.name]: target.value,
    });
  };
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
      var city = db.collection("cities").doc(id);
      city.update({
        image: "",
      });
      let image = storage.refFromURL(img);
      image
        .delete()
        .then(() => {
          setCity({
            ...city,
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
    setcityError(null);
    setdetailError(null);
    if (state.city.length < 3) {
      setcityError("City name must be contain 3 characters");
    } else if (!state.city.match(/^[A-Za-z_ ]+$/)) {
      setcityError("Only letters are allowed");
    } else if (state.detail.length < 3) {
      setdetailError("Detail must be contain 3 characters");
    } else if (!state.detail.match(/^[A-Za-z_ ]+$/)) {
      setdetailError("Only letters are allowed");
    } else {
      setisPosted(true);
      if (city.image === "") {
        setFile(image);
      } else {
        updateRecord(city.image, city.id);
      }
    }
  };
  return (
    <div className="content">
      <h3 className="text-center text-primary p-0 m-0">Edit Destination</h3>
      <hr className="w-25 mb-3" />
      <div className="row">
        <div className="col-10 offset-1">
          <Card className="px-5 py-4">
            <form className="w-75 mx-auto" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Choose Plan</label>
                <select
                  name="plan"
                  id=""
                  className="form-control"
                  onChange={handleChange}
                  value={state.plan}
                >
                  <option value="silver">Silver</option>
                  <option value="gold">Gold</option>
                  <option value="diamond">Diamond</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">City</label>
                <input
                  type="text"
                  name="city"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Enter City"
                  onChange={handleChange}
                  required
                  value={state.city}
                />
              </div>
              {cityError && (
                <div className="alert alert-danger">{cityError}</div>
              )}
              <div className="form-group">
                <label htmlFor="detail">Detail</label>
                <textarea
                  name="detail"
                  id=""
                  cols="30"
                  rows="10"
                  className="form-control"
                  onChange={handleChange}
                  required
                  value={state.detail}
                  placeholder="Enter Detail"
                ></textarea>
              </div>
              {detailError && (
                <div className="alert alert-danger">{detailError}</div>
              )}
              <div className="edit-div">
                {city.image !== "" && (
                  <img src={city.image} alt="" style={{ width: "100%" }} />
                )}
                <i
                  className={`fas fa-times text-danger ${
                    city.image === "" ? "hide" : "edit-icon"
                  }`}
                  onClick={() => handleImageDelete(city.id, city.image)}
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
                  required={city.image === ""}
                  disabled={city.image !== ""}
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
