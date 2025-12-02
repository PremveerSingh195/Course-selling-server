const express = require("express");
const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");
const { default: mongoose } = require("mongoose");

const app = express();

app.use("/user", userRouter);
app.use("/course", courseRouter);
app.use("/admin", adminRouter);

async function main() {
  await mongoose.connect(
    "mongodb+srv://youtube:SdcZbvtt5fQEXsSy@harkiratclass.3incwu1.mongodb.net/"
  );
  app.listen(8000);
  console.log("Server is running on PORT 3000");
}

main();