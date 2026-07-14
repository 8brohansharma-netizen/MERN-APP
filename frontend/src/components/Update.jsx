import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Update() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [error, setError] = useState("");
  const [response, setResponse] = useState("");
  const [userData, setUserData] = useState("");

  const navigate = useNavigate();

  const { id } = useParams();

  const getUserData = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/user/userdetails/${id}`,
      {
        method: "GET",
      }
    );
    const result = await response.json();

    if (!response.ok) {
      console.error(result.error);
      setError(result.error);
    }
    if (response.ok) {
      console.log(result);
      setUserData(result.data);
    }
  };

  useEffect(() => {
    getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEdit = async (event) => {
    event.preventDefault();

    const addUser = { name, email, age };
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/user/updateuser/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify(addUser),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const result = await response.json();

    if (!response.ok) {
      console.error(result.error);
      setError(result.error);
    }
    if (response.ok) {
      console.log(result);
      setResponse(result.message);
      setError("");
      setName("");
      setEmail("");
      setAge(0);
      navigate("/userlist");
    }
  };

  return (
    <div className="container my-2">
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      {response && (
        <div className="alert alert-success" role="alert">
          {response}
        </div>
      )}

      <h2>Edit the Data</h2>

      <form onSubmit={handleEdit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            name="name"
            type="text"
            className="form-control"
            aria-describedby="emailHelp"
            defaultValue={userData?.name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            name="email"
            type="email"
            className="form-control"
            aria-describedby="emailHelp"
            defaultValue={userData?.email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            name="age"
            type="number"
            className="form-control"
            defaultValue={userData?.age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Update;