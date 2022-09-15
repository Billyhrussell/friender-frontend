import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import userContext from "./userContext";

/** Form for adding.
 *
 * Props:
 * - register: function to call in parent.
 *
 * State:
 * - formData
 *
 * RoutesList -> SignUpForm
 */

function SignupForm({ register }) {
  const { currentUser } = useContext(userContext);
  const initial =
    { username: "",
    password: "",
    fullName:"",
    hobbies: "",
    interests:"",
    zipcode:"",
    radius:""
  }
  const navigate = useNavigate();
  // const [file, setFile] = useState(null)
  const [formData, setFormData] = useState(initial);
  const [file, setFile] = useState()
  const [isBadLogin, setIsBadLogin] = useState(true);

  /** Update form input. */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(fData => ({
      ...fData,
      [name]: value,
    }));
// setFile(evt.target.files[0])
  }

  /** Call parent function and clear form. */
  function handleSubmit(evt) {
    console.log("gethere")
    evt.preventDefault();
    register(formData);
    setFormData(initial);
    if(currentUser) navigate("/");
    if(!currentUser) setIsBadLogin(false);
  }

  return (
    <div className="signupPage">
      <h3 className="mb-4">Sign Up</h3>
      <form className="SignUpForm" onSubmit={handleSubmit}>

        <div className="mb-3">
        <label className="mb-2 label">Username</label>
          <input
            id="username"
            name="username"
            className="form-control"
            placeholder="Enter username"
            onChange={handleChange}
            value={formData.username}
            aria-label="Username"
          />
        </div>
        <div className="mb-3">
        <label className="mb-2 label">Password</label>
          <input
            id="password"
            name="password"
            className="form-control"
            placeholder="Enter password"
            onChange={handleChange}
            value={formData.password}
            aria-label="Password"
            type="password"
          />
        </div>
        <div className="mb-3">
        <label className="mb-2 label">Full Name</label>
          <input
            id="fullName"
            name="fullName"
            className="form-control"
            placeholder="Enter full name"
            onChange={handleChange}
            value={formData.fullName}
            aria-label="Full Name"
          />
        </div>
        <div className="mb-3">
        <label className="mb-2 label">Hobbies</label>
          <input
            id="hobbies"
            name="hobbies"
            className="form-control"
            placeholder="Enter Hobbies"
            onChange={handleChange}
            value={formData.hobbies}
            aria-label="Hobbies"
          />
        </div>
        <div className="mb-3">
        <label className="mb-2 label">Interests</label>
          <input
            id="interests"
            name="interests"
            className="form-control"
            placeholder="Enter Interests"
            onChange={handleChange}
            value={formData.interests}
            aria-label="Interests"
          />
        </div>
        <div className="mb-3">
        <label className="mb-2 label">Zipcode</label>
          <input
            id="zipcode"
            name="zipcode"
            className="form-control"
            placeholder="Enter Zipcode"
            onChange={handleChange}
            value={formData.zipcode}
            aria-label="Zipcode"
          />
        </div>

        <div className="mb-3">
        <label className="mb-2 label">Radius</label>
          <input
            id="radius"
            name="radius"
            className="form-control"
            placeholder="Enter Radius"
            onChange={handleChange}
            value={formData.radius}
            aria-label="Radius"
          />
        </div>

        <div className="mb-3">
        <label className="mb-2 label">Image</label>
          <input
            id="image"
            name="image"
            type="file"
            className="form-control"
            placeholder="Enter Image"
            onChange={handleChange}
            aria-label="Image"
          />
        </div>

        {!isBadLogin &&
          <div className="alert alert-danger" role="alert">
            All fields must be filled out
          </div>
        }
        <div>
          <button className="btn btn-primary">
            Submit
          </button>
        </div>

      </form>
    </div>
  );
}

export default SignupForm;
