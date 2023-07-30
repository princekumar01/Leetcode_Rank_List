import "./App.css";
import { useState } from "react";
import api from "./Axios";
const Registration = () => {
  const [formData, setFormData] = useState({
    name: "",
    enrollmentNumber: "",
    year: "1st",
    gender: "Male",
    username: "",
  });

  const onChangeHandler = (event) => {
    setFormData(() => ({
      ...formData,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const { name, enrollmentNumber, gender, year, username } = formData;
    //addUser(name,enrollmentNumber,gender,year,username);
    try {
      console.log(name, enrollmentNumber, gender, year, username);
      await api.post("/api/v1/register", {
        name: name,
        enrollmentNumber: enrollmentNumber,
        gender: gender,
        year: year,
        _id: username,
      });
      setFormData({
        name: "",
        enrollmentNumber: "",
        year: "1st",
        gender: "Male",
        username: "",
      });
    } catch (err) {
      <div className="grid h-screen place-items-center ">
        <div>
          <progress className="progress w-56"></progress>
          <p className="text-center">Error: {err.message}</p>
          <p className="text-center">Try Refresh</p>
        </div>
      </div>;
    }
  };
  return (
    <div className="App1">
      <form onSubmit={onSubmitHandler}>
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            className="form-control"
            name="name"
            placeholder="..."
            required={true}
            onChange={onChangeHandler}
            value={formData.name}
          />
        </div>
        <div className="form-group">
          <label htmlFor="username" className="form-label">
            Leetcode Username
          </label>
          <input
            className="form-control"
            name="username"
            placeholder="handle_ID.."
            required={true}
            onChange={onChangeHandler}
            value={formData.username}
          />
        </div>
        <div className="form-group">
          <label htmlFor="enrollmentNumber" className="form-label">
            Enrollment Number
          </label>
          <input
            className="form-control"
            name="enrollmentNumber"
            placeholder="2022CSB0.."
            required={true}
            onChange={onChangeHandler}
            value={formData.enrollmentNumber}
          />
        </div>
        <div className="form-group">
          <label htmlFor="year" className="form-label">
            Year
          </label>
          <select
            className="form-select"
            name="year"
            onChange={onChangeHandler}
            value={formData.year}
          >
            <option value="1st">1st</option>
            <option value="2nd">2nd</option>
            <option value="3rd">3rd</option>
            <option value="4th">4th</option>
            <option value="Pass Out">Pass Out</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="gender" className="form-label">
            Gender
          </label>
          <div>
            <div>
              <input
                type="radio"
                name="gender"
                value="Female"
                onChange={onChangeHandler}
                checked={formData.gender === "Female"}
              />
              <label htmlFor="Female">Female</label>
            </div>
            <div>
              <input
                type="radio"
                name="gender"
                value="Male"
                onChange={onChangeHandler}
                checked={formData.gender === "Male"}
              />
              <label htmlFor="Male">Male</label>
            </div>
          </div>
        </div>
        <div className="form-group">
          <button className="btn" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Registration;
