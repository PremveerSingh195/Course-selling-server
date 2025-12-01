const { Router } = require("express");
const adminRouter = Router();

adminRouter.post("/signup", function (req, res) {
  res.json({
    message: "adminRouter endpoint",
  });
});

adminRouter.post("/signin", function (req, res) {
  res.json({
    message: "adminRouter endpoint",
  });
});

adminRouter.post("/createCourse", function (req, res) {
  res.json({
    message: "Create course endpoint",
  });
});

module.exports = {
  adminRouter: adminRouter,
};
