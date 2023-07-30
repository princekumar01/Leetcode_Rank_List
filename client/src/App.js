import api from "./Axios";
import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { Moon, SunDim } from "phosphor-react";
import ContestsTable from "./contest/ContestsTable";
import Registration from "./Registration";
import ContestRecords from "./contest/ContestRecords";
//import Navbar from "./components/Navbar";
function App() {
  // const initializeDataTheme = () =>
  // JSON.parse(localStorage.getItem("dataTheme")) ?? "light";

  const [dataTheme, setDataTheme] = useState("light");
  // useEffect(() => {
  //   localStorage.setItem("dataTheme", JSON.stringify(dataTheme));
  // }, [dataTheme]);

  const setTheme = () => {
    if (dataTheme === "light") setDataTheme("dark");
    else setDataTheme("light");
  };

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

  return (
    <div data-theme={dataTheme} style={{ minHeight: "100vh" }}>
      <BrowserRouter>
        <div className="container mx-auto" style={{ paddingTop: "0.5em" }}>
          <div className="grid h-20 card bg-base-300 rounded-box place-items-center">
            <NavLink
              to="/register"
              className="btn demo"
              style={{
                position: "absolute",
                right: "3em",
                padding: "0.2em",
                borderRadius: "12px",
                overflow: "hidden",
              }}
            >
              <span>Register</span>
            </NavLink>

            <button
              className="btn"
              style={{
                position: "absolute",
                right: "0.2em",
                padding: "0.2em",
                borderRadius: "12px",
                overflow: "hidden",
              }}
              onClick={() => setTheme()}
            >
              {dataTheme === "light" ? (
                <Moon size={24} />
              ) : (
                <SunDim size={24} />
              )}
            </button>

            <NavLink
              to="/"
              className="btn"
              style={{
                position: "absolute",
                left: "0.2em",
                padding: "0.2em",
                borderRadius: "12px",
                overflow: "hidden",
              }}
            >
              <span>Home</span>
              <FontAwesomeIcon
                style={{ padding: "0.1em" }}
                icon={faHouse}
                size="lg"
              />
            </NavLink>
            <p> <strong>Leetcode contest</strong> 👀</p>
            <a
              className="grey-text text-lighten-3"
              target="_blank"
              rel="noreferrer noopener"
              href="https://github.com/princekumar01/Leetcode_Rank_List"
            >
              <img
                src="https://img.shields.io/github/stars/princekumar01/Leetcode_Rank_List?style=social"
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
