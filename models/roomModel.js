const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  topic: { type: String, required: true },
  RoomType: { type: String },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "user-Anony" },
  SpeakerId:{type:[
    {
        type:mongoose.Schema.Types.ObjectId,ref:'user-Anony'
    }
]},
});

module.exports = mongoose.model("room-Anony",roomSchema)