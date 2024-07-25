const express = require("express"); //import the express
const path = require("path");
// const methodOverride = require("method-override");
const userRouter = require("./routes/userRoute"); //import the local module router for user
const adminRouter = require("./routes/adminRoute"); //import the local module router for admin
const session = require("express-session"); //import session
const { v4: uuidv4 } = require("uuid"); //import unique id
const MongoDbSession = require("connect-mongodb-session")(session);
const mongoose = require("mongoose");
const app = express();

//for port number
const port = process.env.PORT || 3333;
//for mongodb URI
const mongoDbUri = "mongodb://localhost:27017/week6";

mongoose
  .connect(mongoDbUri)
  .then((res) => {
    console.log(`mongoose connected ${res}`);
  })
  .catch((err) => {
    console.log("connection err", err);
  });

const store = new MongoDbSession({
  uri: mongoDbUri,
  collection: "sessions",
});

//for setting view engine (ejs)
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//middlewares
app.use(express.json()); //for parse to json
app.use(express.urlencoded({ extended: true })); // for url encode
// app.use(methodOverride("_method")); // for method spoofing (delete, put, patch)

//session handling
app.use(
  session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

//for cache handling
app.use((req, res, next) => {
  res.set(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );
  res.set("Pragma", "no-cache");
  res.set("Expires", "0");
  res.set("Surrogate-Control", "no-store");
  next();
});

app.use(express.static("public")); //for static

app.use("/", userRouter); // for user router url
app.use("/admin", adminRouter); // for admin router url

//server listener
app.listen(port, () => {
  console.log(`The server started at http://localhost:${port}`);
});
