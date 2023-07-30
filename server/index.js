require("dotenv").config();
const path = require('path');
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const server = express();
const router = require("./routes/route");
const cron = require("node-cron");
const {
  fetchContestsMetaData,
  fetchContestRankings,
} = require("./controller/rankings");
const model = require("./models/contest");
const Contest = model.Contest;

//db connection
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL, { useUnifiedTopology: true });
  console.log("database connected");
}
//Schema 
 
server.use(cors());
server.use(express.json());
server.use(express.urlencoded());
server.use(morgan('default'));
server.use("/api/v1/", router.router);
// server.use('*',(req,res)=>{
//   res.sendFile(path.resolve(__dirname,'build','index.html'))
// })
server.listen(8080, () => {
  console.log("server started");
});

function isDateWithinLastSevenDays(date) {
  const today = new Date();
  const sevenDaysAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
  return date > sevenDaysAgo;
}
 
cron.schedule(
  "55 21 * * 6",
  () => {
    fetchContestsMetaData();
  },
  {
    timezone: "Asia/Kolkata", // Set timezone to India Standard Time
  }
);

cron.schedule(
  "55 9 * * 0",
  () => {
    fetchContestsMetaData();
  },
  {
    timezone: "Asia/Kolkata", // Set timezone to India Standard Time
  }
);

cron.schedule(
  "25 5 * * 1",
  () => {
    fetchContestsMetaData();
  },
  {
    timezone: "Asia/Kolkata", // Set timezone to India Standard Time
  }
);

cron.schedule(
  "0 22 * * 6",
  async () => {
    const contests = await Contest.find({}, { rankings: 0 });
    for (let i = 0; i < contests.length; i++) {
      const date = new Date(contests[i].startTime);
      if(isDateWithinLastSevenDays(date)){
        //console.log(contests[i]._id);
        fetchContestRankings(contests[i]._id);
      }
      }
  },
  {
    timezone: "Asia/Kolkata", // Set timezone to India Standard Time
  }
);

cron.schedule(
  "0 10 * * 0",
  async () => {
    const contests = await Contest.find({}, { rankings: 0 });
    for (let i = 0; i < contests.length; i++) {
      const date = new Date(contests[i].startTime);
      if(isDateWithinLastSevenDays(date)){
        //console.log(contests[i]._id);
        fetchContestRankings(contests[i]._id);
      }
      }
  },
  {
    timezone: "Asia/Kolkata", // Set timezone to India Standard Time
  }
);

cron.schedule(
  "30 5 * * 1",
  async () => {
    const contests = await Contest.find({}, { rankings: 0 });
    for (let i = 0; i < contests.length; i++) {
      const date = new Date(contests[i].startTime);
      if(isDateWithinLastSevenDays(date)){
        //console.log(contests[i]._id);
        fetchContestRankings(contests[i]._id);
      }
      }
  },
  {
    timezone: "Asia/Kolkata", // Set timezone to India Standard Time
  }
);

cron.schedule(
  "30 5 * * 5",
  async () => {
    const contests = await Contest.find({}, { rankings: 0 });
    for (let i = 0; i < contests.length; i++) {
      const date = new Date(contests[i].startTime);
      if(isDateWithinLastSevenDays(date)){
        //console.log(contests[i]._id);
        fetchContestRankings(contests[i]._id);
      }
      }
  },
  {
    timezone: "Asia/Kolkata", // Set timezone to India Standard Time
  }
);
