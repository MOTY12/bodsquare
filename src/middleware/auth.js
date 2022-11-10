const jwt = require("jsonwebtoken");
const { userModel } = require("../models/index");

const userauth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decode = jwt.verify(token, process.env.USER_TOKEN_SECRET);
    req.user = decode;

    let user = await userModel.findById(req.user.id);

    // if (!user) {
    //   res.status(401).json({
    //     message: "Account no longer exist or has been deactivated",
    //   });
    //   return;
    // }

    // if (user.status == "Pending") {
    //   res.status(401).json({
    //     message:
    //       "Your account has not been activated, please verify your email to complete your registration",
    //   });
    //   return;
    // }

    // if (user.status == "Suspended") {
    //   res.status(401).json({
    //     message:
    //       "Your account cannot perform this operation because it has been suspended",
    //   });
    //   return;
    // }

    req.userAccount = user;
    next();
  } catch (error) {
    res.status(403).json({
      message: "Authentication Failed!",
    });
  }
};

module.exports = userauth;
