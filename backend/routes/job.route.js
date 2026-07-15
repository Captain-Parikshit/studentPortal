const express = require("express");
const {postJob,getAllJobs,getAdminJobs,getJobById} = require('../controllers/job.controller')
const isAuthenticated = require("../middlewares/isAuthenticated");
// const bcrypt = require("bcrypt");
const router = express.Router();

router.post("/post" ,isAuthenticated,postJob);
router.get("/get" ,isAuthenticated,getAllJobs);
router.get("/getadminJobs" ,isAuthenticated,getAdminJobs);
router.get("/get/:id" ,isAuthenticated,getJobById);

module.exports = router;