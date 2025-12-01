const { Router } = require("express");

const courseRouter = Router();

courseRouter.post("/purchase", function (req, res) {
  res.json({
    message: "Signup endpoint",
  });
});

courseRouter.get("/preview", function (req, res) {
  res.json({
    message: "Course Preview endpoint",
  });
});

module.exports = {
  courseRouter: courseRouter,
};
