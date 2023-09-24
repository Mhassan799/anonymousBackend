const express = require('express')
const Router = express.Router();
 const roomControls =require('../controller/RoomController')
const { verifyToken } = require("../jwt/jwt");

Router.post('/getAllRooms',verifyToken,roomControls.getAllRooms)
Router.post('/createRoom',verifyToken,roomControls.createRoom)

module.exports = Router;