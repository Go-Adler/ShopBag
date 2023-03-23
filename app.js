import express from express
import nocache from "nocache";

import userRoute from "./routes/userRoute";
import adminRoute from "./routes/adminRoute";
import startRoute from "./routes/startRoute";

const app = express();
const PORT = process.env.PORT || 3000;

// Set view engine and views directory
app.set("views", "./views");
app.set("view engine", "ejs");

// Add middleware
app.use(nocache());
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up routes
app.use("/user", userRoute);
app.use("/admin", adminRoute);
app.use("/", startRoute);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
