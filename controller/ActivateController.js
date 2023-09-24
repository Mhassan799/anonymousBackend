const User = require("../models/userModel");
const jimp = require("jimp");
const path = require("path");
const jwt = require("../jwt/jwt");
const { Buffer } = require('buffer');

const activateControl = {
  async activation(req, res) {
    const { Name, Img, token } = req.body;
 //    console.log(`${Name} : ${Img} : ${token}`)
    if (!Name || !Img || !token) {
      return res.status(400).json({ message: " All fields are required !" });
    }
    const buffer = Buffer.from(
      Img.replace(/^data:image\/(png|jpg|jpeg);base64,/, ''),
      'base64'
  );

    const imagePath = `${Date.now()}-${Math.ceil(Math.random() * 1e9)}.png`;

    try {
      const jimpRes = await jimp.read(buffer);
      jimpRes
        .resize(150, jimp.AUTO)
        .write(path.resolve(__dirname, `../storage/${imagePath}`));

      } catch (error) {
        
        return res.status(400).json({ message: " Message Could not process image !" });
// return res.status(404).json({message:' Image not Found !'});
      
    }

    const userId = req.userId;
    try {

const user = await User.findById({_id:userId});
if(!user)
{
return res.status(404).json({message:' User not Found !'});
}
user.activated=true;
user.Name =Name;
user.Img = `http://localhost:5000/storage/${imagePath}`;
user.save();
const token = jwt.sign(JSON.stringify(user))
res.json({token ,auth:true});
    } catch (error) {


 res.status(500).json(error.message);
      
    }
  },
};
module.exports =activateControl