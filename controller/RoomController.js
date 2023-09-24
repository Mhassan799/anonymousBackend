const User = require("../models/userModel");
const Room = require("../models/roomModel");

const roomControls = {
  async getAllRooms(req, res) {
    try {
      const { token } = req.body;

      if (!token) {
        res.status(400).json({ message: "Token not Provided" });
      }

      const room = await Room.find();
      if (!room) {
        res.status(400).json(" No Room Availible ");
      }

      return res.status(200).json({ room });
    } catch (err) {
      res.status(500).json({ message: " ERROR IN GET ROOM :" + err });
    }
  },
  async createRoom(req, res) {
    try {
      const { topic, roomType } = req.body;
      if (!topic || !roomType) {
        return res.status(400).json({ message: "All fields are required!" });
      }
      // const room = Room.create({
      //   topic,
      //   roomType,
      //   ownerId: req.userId,
      //   SpeakerId: [req.userId],
      // });
      // return res.status(200).json("rooms Created Successfully");

      const room = await Room.create({
        topic,
        roomType,
        ownerId: req.userId,
        SpeakerId: [req.userId],
    });
    
    return res.status(200).json({ message: "Room Created Successfully", roomId: room._id });
    
    } catch (error) {}
  },
};

module.exports = roomControls;
