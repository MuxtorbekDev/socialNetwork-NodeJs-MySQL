const express = require("express");
const { buildDB } = require("./models/db-architechture/build");
const engine = require("ejs-mate");
const path = require("path");
const methodOverride = require("method-override");
const { HomeControl } = require("./controllers/HomeContoller");
const PostRouter = require("./routes/PostRoutes");
const CommentRoutes = require("./routes/CommentRoutes");
const app = express();

// MySQL DB
buildDB(true);

// app use
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: true }));
app.engine("ejs", engine);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../templates/views"));
app.use(methodOverride("_method"));

// Routers Controller
app.get("/", HomeControl);
app.use(PostRouter);
app.use(CommentRoutes);

// Error Handling
app.all("*", (req, res, next) => {
  next(new BlogErrors("404 Not Found", 404));
});

app.use((err, req, res, next) => {
  const { status = 500, message = "No'malum xatolik yuz berdi!" } = err;
  res.status(status).render("error", { message, status });
});

// Listen
app.listen(4001, () => {
  console.log("Server port 4001 da ishga tushdi");
});
