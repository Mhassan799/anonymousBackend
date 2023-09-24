const User = require("../models/userModel");
const crypto = require("crypto");
const jwt = require("../jwt/jwt");
const smsId = process.env.SMS_SID;
const authToken = process.env.SMS_AUTH_TOKEN;

const twilio = require("twilio")(smsId, authToken, {
  lazyLoading: true,
});

const OtpControl = {
  async sendOtp(req, res) {
    const { phone } = req.body;
    const otp = 1111;
    const ttl = 1000 * 60 * 2;

    const expires = Date.now() + ttl;
    const data = `${phone}.${otp}.${expires}`;

    const hash = crypto
      .createHmac("sha256", "helloTalha")
      .update(data)
      .digest("hex");

    try {
      res.json({
        hash:`${hash}.${expires}`,
        phone: phone,
        otp,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: " Error in OTP " });
    }
  },

  async verifyOtp(req, res) {
    try {
      const { phone, otp, hash } = req.body;
      // console.log( `${phone} : ${otp} : ${hash} `)
      if (!phone || !otp || !hash) {
        return res.status(400).json({ message: " All fields are required ! " });
      }
      const [hashedOtp, expire] = hash.split(".");
     //  console.log(`${expire} : ${hashedOtp} `);

       if (Date.now() > +expire) {
         return res.status(400).json({ message: " OTP expired " });
       }

       const data = `${phone}.${otp}.${expire}`;
// console.log(data)
      const compare = crypto
      .createHmac("sha256", "helloTalha")
      .update(data)
      .digest("hex");
      //  console.log(compare +" : "+hashedOtp)
      if (compare !== hashedOtp) {
        return res.status(400).json({ message: " Invalid Otp ! " });
      }
      //console.log("before user ")
      let user;
      try {
        user = await User.findOne({ phone });
        
         if (!user) {

              user = await User.create({ phone });
             user.save();
           
          }
        //  user? console.log(user):console.log("error in this code ");
       const token = jwt.sign({ user });
        
 //console.log(token)

        return res.status(201).json({token, user });
       } catch (error) {}
    } catch (error) {
      return res.status(500).json({ message: " Error in verify OTP " });
    }
  },
};

module.exports =OtpControl