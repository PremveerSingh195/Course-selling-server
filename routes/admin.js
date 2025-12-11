const { Router } = require("express");
const adminRouter = Router();
const { adminModel, courseModel } = require("../db");
const jwt = require("jsonwebtoken");
const { adminMiddleware } = require("../middleware/admin");

const JWT_ADMIN_PASSWORD = "jdshgfjheg54325jgh345jgh342jhg5423h";

adminRouter.post("/signup", async function (req, res) {
  const { email, password, firstname, lastname } = req.body;

  await adminModel.create({
    email: email,
    password: password,
    firstname: firstname,
    lastname: lastname,
  });

  res.json({
    message: "admin Signup successfull",
  });
});

adminRouter.post("/signin", async function (req, res) {
  const { email, password } = req.body;

  const user = await adminModel.findOne({
    email: email,
    password: password,
  });

  if (user) {
    const token = jwt.sign(
      {
        id: user._id,
      },
      JWT_ADMIN_PASSWORD
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

adminRouter.post("/createCourse", adminMiddleware, async function (req, res) {
  const adminId = req.userId;

  const { title, description, imageUrl, price } = req.body;

  const course = await courseModel.create({
    title: title,
    description: description,
    imageUrl: imageUrl,
    price: price,
    creatorId: adminId,
  });

  res.json({
    message: "Course created successfully",
    courseId: course._id,
  });
});

module.exports = {
  adminRouter: adminRouter,
};
