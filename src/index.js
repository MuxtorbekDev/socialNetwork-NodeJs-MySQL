const express = require("express");
const { buildDB } = require("./models/db-architechture/build");
const engine = require("ejs-mate");
const path = require("path");
const session = require("express-session");
const methodOverride = require("method-override");
const passport = require("passport");
const { HomeControl } = require("./controllers/HomeContoller");
const PostRouter = require("./routes/PostRoutes");
const CommentRoutes = require("./routes/CommentRoutes");
const UserRouter = require("./routes/UserRoutes");
const app = express();
const { BlogError } = require("./helpers/BlogErrors");

// MySQL DB
buildDB();

// app use
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: true }));
app.engine("ejs", engine);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../templates/views"));
app.use(methodOverride("_method"));
app.use(
  session({
    secret: "secret not found",
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
    },
  })
);
passport.initialize();
app.use(passport.session());
require("./helpers/auth-local").localConfig(passport);

// Routers Controller
app.get("/", HomeControl);
app.use(PostRouter);
app.use(CommentRoutes);
app.use(UserRouter);

// Error Handling
app.all("*", (req, res, next) => {
  next(new BlogError("404 Not Found", 404));
});

app.use((err, req, res, next) => {
  const { status = 500, message = "No'malum xatolik yuz berdi!" } = err;
  res.status(status).render("error", { message, status });
});

// Listen
app.listen(4001, () => {
  console.log("Server port 4001 da ishga tushdi");
});
