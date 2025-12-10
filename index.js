const express = require("express");
const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");
const { default: mongoose } = require("mongoose");

const app = express();

app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/admin", adminRouter);

async function main() {
  await mongoose.connect(
    "mongodb+srv://youtube:SdcZbvtt5fQEXsSy@harkiratclass.3incwu1.mongodb.net/course-selling-app"
  );
  app.listen(8000);
  console.log("Server is running on PORT 3000");
}

main();