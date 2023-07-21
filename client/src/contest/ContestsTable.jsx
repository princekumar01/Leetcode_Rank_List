import { NavLink } from "react-router-dom";

const ContestsTable = ({ contests }) => {
  const convert = (dateTime) => {
    const date = dateTime.split("T")[0];
    const time = dateTime.split("T")[1].split(".")[0];
    const utcDateTime = new Date(`${date}T${time}Z`);
    const options = { timeZone: "Asia/Kolkata" };
    const istDateTime = utcDateTime.toLocaleString("en-US", options);
    return istDateTime;
  };
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead >
          <tr style={{fontSize:'large',fontWeight:'bold'}} className="bg-base-300 rounded-box">
            <th></th>
            <td>Past Contest</td>
            <td>Started Time</td>
            <td>IIEST Result</td>
            <td>Official Result</td>
          </tr>
        </thead>
        <tbody>
          {contests.map((contest, i) => (
            <tr
              key={contest._id}
              className={contest._id.startsWith("bi") ? "h-20 bg-base-300 rounded-box" : undefined}
            >
              <th>{i + 1}</th>
              <td style={{fontFamily:'serif',fontSize:'large'}}>{contest.title}</td>
              <td style={{fontFamily:'serif'}}>
                {convert(contest.startTime)}
              </td>
              <td>
                <NavLink
                  className="edit" style={{padding:'0.1em',margin:"0.1em"}}
                  to={`/contest/${contest._id}`}
                >
                  Rank List
                </NavLink>
              </td>
              <td>
                <div className="badge badge-accent" >
                  <a
                    className="edit" style={{padding:'0.1em',margin:"0.1em"}}
                    href={`https://leetcode.com/contest/${contest._id}/ranking`}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Leetcode
                  </a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default ContestsTable;
