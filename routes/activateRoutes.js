const express = require("express");
const Router = express.Router();
const { verifyToken } = require("../jwt/jwt");
const activateControl =require('../controller/ActivateController')


Router.post('/activate',verifyToken,activateControl.activation)
module.exports =Router;