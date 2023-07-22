const RegisteredUsermodel = require("../models/user");
const RegisteredUser = RegisteredUsermodel.RegisteredUser;
const model = require("../models/contest");
const Contest = model.Contest;

exports.getAllContest = async (req, res) => {
  const contests = await Contest.find({}, { rankings: 0, lastUpdated: 0 });
  //console.log(contests);
  res.json(contests);
};

exports.createRegisteredUser = (req, res) => {
  const newUser = new RegisteredUser(req.body);
  newUser.save((err, doc) => {
    //console.log({err,doc})
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(201).json(doc);
    }
  });
};

exports.getContestData = async (req, res) => {
  const user = await RegisteredUser.find();
  const _id = req.params._id;
  //console.log(_id);
  try {
    // const allUser = await Contest.findById({_id:_id});
    // const modifiedUser=allUser.rankings.filter(({_id}) => user.some(obj => obj._id == _id));
    // console.log(modifiedUser);

    const modifiedUser = await Contest.aggregate([
      { $match: { _id: _id } },
      {
        $addFields: {
          rankings: {
            $filter: {
              input: "$rankings",
              as: "rank",
              cond: { $in: ["$$rank._id", user.map((u) => u._id)] },
            },
          },
        },
      },
    ]);

    const actualuser = modifiedUser[0].rankings.map(
      ({ _id, rank, score, finish_time }) => {
        const obj = user.find((obj) => obj._id == _id);
        return { ...obj.toObject(), rank, score, finish_time };
      }
    );

    res.status(201).json(actualuser);
  } catch (err) {
    console.log("catch error-");
    console.log(err);
    res.status(400).json(err);
  }
};
