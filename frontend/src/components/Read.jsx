import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Read() {
  const [data, setData] = useState();
  const [error, setError] = useState("");

  async function getData() {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user/userlist`, {
      method: "GET",
    });
    const result = await response.json();

    if (!response.ok) {
      setError(result.error);
    }
    if (response.ok) {
      setData(result.data);
      setError("");
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (id, event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/user/deleteuser/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const result = await response.json();

    if (!response.ok) {
      setError(result.error);
    }
    if (response.ok) {
      setError("Delete Successfully");

      setTimeout(() => {
        setError("");
        getData();
      }, 2000);
    }
  };

  return (
    <div className="container my-2">
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <h2 className="text-center">User List</h2>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Age</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => (
            <tr key={item._id}>
              <th scope="row">1</th>
              <td>{item?.name}</td>
              <td>{item?.email}</td>
              <td>{item?.age}</td>
              <td>
                <Link to={`/update/${item?._id}`} className="card-link m-2">Edit</Link>
                <a href="" className="card-link m-2" onClick={(e) => handleDelete(item?._id, e)}>Delete</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Read;