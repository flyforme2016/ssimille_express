var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var s3Router = require("./routes/s3");
var kakaoRouter = require("./routes/kakao");
var postRouter = require("./routes/post");
var friendRouter = require("./routes/friend");
var spotifyRouter = require("./routes/spotify");
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("common"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/kakao", kakaoRouter);
app.use("/post", postRouter);
app.use("/s3", s3Router);
app.use("/friend", friendRouter);
app.use("/spotify", spotifyRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
//모든 IP에서 지정 port 3000번으로 대기
const port = 3000;
const server = app.listen(port, "0.0.0.0", () => {});
server.keepAliveTimeout = 10000;
server.headersTimeout = 10005;

module.exports = app;

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
