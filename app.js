require("dotenv").config()
const express = require("express");
const session = require("express-session");

const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");
const noCacheMiddleware = require("./middlewares/noCache");
const otp = require("./services/UserServices/userAccessServices")

// otp()
const app = express();
const PORT = process.env.PORT || 3000;

app.set("views", "./views");
app.set("view engine", "ejs");

app.use(
  session({
    secret: "mySecretKey",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use(noCacheMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));

app.use("/user", userRoute);
app.use("/admin", adminRoute);
app.use("/", userRoute);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});