import React, { useRef, useState } from "react";
import { Button, Card, CardHeader, CardBody, CardTitle } from "reactstrap";
import firebase from "firebase/app";
const Password = ({ user }) => {
  //   const oldPass = useRef();
  const [state, setState] = useState({
    old: "",
    new: "",
    confirm: "",
  });
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const handleChange = ({ target }) => {
    setError();
    setSuccess();
    setState({ ...state, [target.name]: target.value });
  };
  function handlePasswordSubmit(e) {
    e.preventDefault();
    var credential = firebase.auth.EmailAuthProvider.credential(
      firebase.auth().currentUser.email,
      state.old
    );
    user
      .reauthenticateWithCredential(credential)
      .then(function () {
        // User re-authenticated.
        if (state.new === state.confirm) {
          if (state.old !== state.new) {
            user
              .updatePassword(state.new)
              .then(function () {
                setState({
                  old: "",
                  new: "",
                  confirm: "",
                });
                setSuccess("Password updated successfully.");
              })
              .catch(function (error) {
                setError("Something went wrong.");
              });
          } else {
            setError("Please choose new password to update");
          }
        } else {
          setError("Password does not match.");
        }
      })
      .catch(function (error) {
        // An error happened.
        setError("Wrong old password.");
      });
  }
  return (
    <>
      <Card className="card-user">
        <CardHeader>
          <CardTitle tag="h5" className="text-center">
            Change Pasword
          </CardTitle>
        </CardHeader>
        <CardBody>
          <div className="password-div">
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            {success && (
              <div className="alert alert-success" role="alert">
                {success}
              </div>
            )}
            <form onSubmit={handlePasswordSubmit}>
              <div className="form-group">
                <label>Old Password</label>
                <input
                  type="password"
                  name="old"
                  className="form-control"
                  value={state.old}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>New Password</label>
                <input
                  type="password"
                  name="new"
                  className="form-control"
                  value={state.new}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="confirm"
                  className="form-control"
                  value={state.confirm}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="text-center">
                <Button className="btn-round" color="primary" type="submit">
                  Update Password
                </Button>
              </div>
            </form>
          </div>
        </CardBody>
      </Card>
    </>
  );
};
export default Password;
