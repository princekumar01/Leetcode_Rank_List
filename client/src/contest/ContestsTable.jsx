import { Link } from "react-router-dom";

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
        <thead>
          <tr>
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
              className={contest._id.startsWith("Bi") ? "active" : undefined}
            >
              <th>{i + 1}</th>
              <td>{contest.title}</td>
              <td className="hidden md:table-cell">
                {convert(contest.startTime)}
              </td>
              <td>
                <Link
                  className="link link-primary"
                  to={`/contest/${contest._id}`}
                >
                  Rank List
                </Link>
              </td>
              <td>
                <div className="badge badge-accent">
                  <a
                    className="link"
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
