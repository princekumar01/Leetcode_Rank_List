const express = require("express");
const Contest = require("../models/contest");
const router = express.Router();
const userController = require("../controller/user");

router.post("/register", userController.createRegisteredUser);
router.get("/getcontestdata/:_id", userController.getContestData);
router.get("/getallcontest", userController.getAllContest);
exports.router = router;