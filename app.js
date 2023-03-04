const express = require("express");

const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");
const startRoute = require("./routes/startRoute")

const app = express();

const PORT = process.env.PORT || 3000;

app.set("views", "./views");
app.set("view engine", "ejs");

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/user", userRoute);
app.use("/admin", adminRoute);
app.use("/", startRoute);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});