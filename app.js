const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");

const app = express();
const PORT = 3000;

app.set("views", "./views");
app.set("view engine", "ejs");

app.use(
  session({
    secret: "mySecret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));

app.use("/user", userRoute);
app.use("/admin", adminRoute);
app.use("/", userRoute);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
