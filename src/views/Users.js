import React from "react";
import { useAuth } from "../Context/AuthContext";
import { db } from "../firebase";
export default function Users() {
  const { users, setUsers } = useAuth();
  const handleStatus = (user, id) => {
    if (window.confirm("Are you sure to change status!")) {
      var status = null;
      if (user.status === "active") {
        status = "block";
      } else {
        status = "active";
      }
      var selectedUser = db.collection("profile").doc(id);
      return selectedUser
        .update({
          status: status,
        })
        .then(() => {
          setUsers(
            users.map((user) => {
              if (user.id === id) {
                return {
                  ...user,
                  status: status,
                };
              }
              return user;
            })
          );
        });
    }
  };
  return (
    <div className="content">
      <div className="w-100">
        <h3 className="text-center text-primary p-0 m-0">Users</h3>
        <hr className="w-25" />
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
            {users.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                  {user.status === "active" ? (
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => {
                        handleStatus(user, user.id);
                      }}
                    >
                      Active
                    </button>
                  ) : (
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => {
                        handleStatus(user, user.id);
                      }}
                    >
                      Block
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
