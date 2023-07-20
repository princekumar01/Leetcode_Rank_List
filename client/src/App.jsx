import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import api from "./Axios";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import ContestsTable from "./contest/ContestsTable";
import Registration from "./Registration";
import ContestRecords from "./contest/ContestRecords";

function App() {
  // const initializeDataTheme = () =>
  //   JSON.parse(localStorage.getItem("dataTheme")) ?? "light";
  // const [dataTheme, setDataTheme] = useState(initializeDataTheme());
  // useEffect(() => {
  //   localStorage.setItem("dataTheme", JSON.stringify(dataTheme));
  // }, [dataTheme]);

  const [contests, setContests] = useState([]);
  const getContests = async () => {
    try {
      const response = await api.get("/api/v1/getallcontest");
      //console.log("Response.data: ", response.data);
      setContests([...response.data]);
    } catch (err) {
      return (
        <div className="grid h-screen place-items-center ">
          <div>
            <progress className="progress w-56"></progress>
            <p className="text-center">Error: {err.message}</p>
            <p className="text-center">Try Refresh</p>
          </div>
        </div>
      );
    }
  };

  useEffect(() => {
    getContests();
  }, []);

  // useEffect(() => {
  //   document.title = "Home";
  // }, []);

  return (
    <div data-theme="cyberpunk">
      <BrowserRouter>
        {/* <Navbar dataTheme={dataTheme} setDataTheme={setDataTheme} /> */}
        <div className="container mx-auto" style={{ paddingTop: "0.5em" }}>
          <div className="grid h-20 card bg-base-300 rounded-box place-items-center">
            <NavLink
              to="/register"
              className="btn m-1"
              style={{ position: "absolute", right: "5em" }}
            >
              <span>Register</span>
            </NavLink>
            <label
              tabIndex={0}
              className="btn m-1"
              style={{ position: "absolute", right: "0.2em" }}
            >
              <span className="hidden md:flex">Theme</span>
            </label>
            <NavLink
              to="/"
              className="btn m-1"
              style={{ position: "absolute", left: "0.2em" }}
            >
              <span>Home</span>
              <FontAwesomeIcon
                style={{ padding: "0.1em" }}
                icon={faHouse}
                size="lg"
              />
            </NavLink>
            <p> Leetcode contest 👀</p>
            <a
              className="grey-text text-lighten-3"
              target="_blank"
              rel="noreferrer noopener"
              href="https://github.com/baoliay2008/lccn_predictor"
            >
              <img
                src="https://img.shields.io/github/stars/baoliay2008/lccn_predictor?style=social"
                alt="Stars"
              />
            </a>
          </div>
          <div className="divider"></div>
          <Routes>
            <Route path="/" element={<ContestsTable contests={contests} />} />
            <Route path="/register" element={<Registration />}></Route>
            <Route path="/contest/:_id" element={<ContestRecords />} />
          </Routes>
        </div>
        <div>
          <br></br>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
