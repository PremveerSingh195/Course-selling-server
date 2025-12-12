const { Router } = require("express");
const { userModel, purchaseModel, courseModel } = require("../db");
const { userMiddleware } = require("../middleware/user");
const jwt = require("jsonwebtoken");

const userRouter = Router();

userRouter.post("/signup", async function (req, res) {
  const { email, password, firstname, lastname } = req.body;

  await userModel.create({
    email: email,
    password: password,
    firstname: firstname,
    lastname: lastname,
  });

  res.json({
    message: "Signup successfull",
  });
});

userRouter.post("/signin", async function (req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({
    email: email,
    password: password,
  });

  if (user) {
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_USER_PASSWORD
    );

    res.json({
      token: token,
    });
  } else {
    res.status(403).json({
      message: "Incorrect Credentials",
    });
  }
});

userRouter.get("/purchases", userMiddleware, async function (req, res) {
  const userId = req.userId;

  const purchases = await purchaseModel.find({
    userId,
  });

  const courseData = await courseModel.find({
    _id: { $in: purchases.map((x) => x.courseId) },
  });
  res.json({
    purchases,
    courseData,
  });
});

module.exports = {
  userRouter: userRouter,
};
