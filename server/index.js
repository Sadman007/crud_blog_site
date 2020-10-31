const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const blogRouter = require("./routes/BlogsRouter");
const userRouter = require("./routes/UserRouter");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/blog", blogRouter);
app.use("/api/user", userRouter);

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}...`);
});
