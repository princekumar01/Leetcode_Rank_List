import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import "../App.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSearch } from "@fortawesome/free-solid-svg-icons";
import api from "../Axios";
const ContestRecordsTable = ({ contest }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table table-compact w-full">
        <thead>
          <tr
            className="bg-base-300 rounded-box"
            style={{
              fontSize: "larger",
              fontWeight: "bold",
              fontFamily: "serif",
            }}
          >
            <td>Rank</td>
            <td>Name</td>
            <td>Username</td>
            <td>Score</td>
            <td>Last Submission</td>
            <td>Global Rank</td>
            <td>Year</td>
          </tr>
        </thead>
        <tbody style={{ fontFamily: "serif" }}>
          {contest.map((record, i) => (
            <tr
              key={i}
              className={i % 2 === 1 ? "bg-base-300 rounded-box" : undefined}
            >
              <td style={{ fontWeight: "bold" }}>#{i + 1}</td>
              <td style={{ fontFamily: "monospace", fontSize: "large" }}>
                {record.name}
              </td>
              <td>
                {
                  <a
                    className="edit"
                    style={{ fontFamily: "Inter" }}
                    href={`https://leetcode.com/${record._id}`}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {record._id}
                  </a>
                }
              </td>
              <td style={{ paddingLeft: "1em" }}>{record.score}</td>
              <td style={{ paddingLeft: "1.5em" }}>
                {new Date(record.finish_time * 1000).toLocaleTimeString()}
              </td>
              <td style={{ paddingLeft: "2.0em" }}>{record.rank}</td>
              <td>{record.year}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const RecordsSearch = ({ revText, setContest }) => {
  const [searchData, setSearchData] = useState({
    year: "All",
    gender: "All",
  });

  const onChangeHandler = (event) => {
    setSearchData(() => ({
      ...searchData,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const { gender, year } = searchData;
    console.log(gender, year);
    let contestData = [...revText.current];
    if (year !== "All") {
      contestData = contestData.filter((person) => person.year === year);
    }
    if (gender !== "All") {
      contestData = contestData.filter((person) => person.gender === gender);
    }
    setContest([...contestData]);
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <div className="container mx-auto text-center bg-base-300 rounded-box">
        <div className="form-group">
          <label
            style={{
              marginLeft: "0.5em",
              marginRight: "2em",
            }}
          >
            <FontAwesomeIcon icon={faUser} size="lg" />
          </label>
          <label htmlFor="year" className="form-label">
            Year
          </label>
          <select
            className="input input-bordered input-primary w-1/2 max-w-xs"
            name="year"
            onChange={onChangeHandler}
            value={searchData.year}
            style={{
              marginLeft: "0.5em",
              marginRight: "1em",
            }}
          >
            <option value="1st">1st</option>
            <option value="2nd">2nd</option>
            <option value="3rd">3rd</option>
            <option value="4th">4th</option>
            <option value="Pass Out">Pass Out</option>
            <option value="All">All</option>
          </select>
          <label htmlFor="gender" className="form-label">
            Gender
          </label>
          <select
            className="input input-bordered input-primary w-1/2 max-w-xs"
            name="gender"
            onChange={onChangeHandler}
            value={searchData.gender}
            style={{
              marginLeft: "0.5em",
              marginRight: "1em",
            }}
          >
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            <option value="All">All</option>
          </select>

          <button className="btn" type="submit">
            <FontAwesomeIcon icon={faSearch} size="lg" />
          </button>
        </div>
      </div>
    </form>
  );
};

const ContestRecords = () => {
  const { _id } = useParams();

  console.log(_id);
  const revText = useRef();

  const [contest, setContest] = useState([]);
  const getContestData = async (_id) => {
    try {
      const response = await api.get(`/api/v1/getcontestdata/${_id}`);
      const singleContest = response.data;
      //console.log(...singleContest);
      revText.current = [...singleContest];

      setContest([...singleContest]);
    } catch (error) {
      return (
        <div className="grid h-screen place-items-center ">
          <div>
            <progress
              className="progress progress-error w-56"
              value="100"
              max="100"
            ></progress>
            <p className="text-center">Error! Try to revisit later!</p>
          </div>
        </div>
      );
    }
  };

  useEffect(() => {
    getContestData(_id);
  }, [_id]);
  //console.log('check',revText.current);
  return (
    <>
      <div
        className="text-center"
        style={{ fontWeight: "bold", fontSize: "large" }}
      >
        {_id.split("-").join(" ")}
      </div>
      <div>
        <RecordsSearch revText={revText} setContest={setContest} />
        <br></br>
        <ContestRecordsTable contest={contest} />
      </div>
    </>
  );
};

export default ContestRecords;
