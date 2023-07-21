require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const server = express();
const router = require('./routes/index');
const cron = require('node-cron');
const {fetchContestsMetaData,fetchContestRankings} = require("./controller/rankings");
const model = require('./models/contest')
const Contest = model.Contest;
 
//db connection
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log('database connected')
}
//Schema

server.use(cors());
server.use(express.json());
server.use(express.urlencoded());
server.use(morgan('default'));
server.use('/api/v1/',router.router);

//server.use('/users',auth,userRouter.router);

server.listen(8080, () => {
  console.log('server started');
});

const fetchContest = async function () {
const contests = await Contest.find({  },{ rankings: 0});
console.log('Contest data fetched from database')
return contests;  
}

// Schedule myFunction to run at 10:00 PM on Saturday in IST
cron.schedule('40 11 * * 3', async() => {
fetchContestsMetaData(); 
console.log('continue....');
const contests=fetchContest();
//const contests = await Contest.find({  },{ rankings: 0});
for(let i=0;i<1;i++){
console.log(contests[i]._id);
fetchContestRankings(contests[i]._id);
}
}, {
  timezone: 'Asia/Kolkata' // Set timezone to India Standard Time
});