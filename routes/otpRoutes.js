const express = require("express");
const Router = express.Router();

const OtpControl =require('../controller/OtpController')


Router.post('/sendOtp',OtpControl.sendOtp)
Router.post('/verifyOtp',OtpControl.verifyOtp)
module.exports =Router;