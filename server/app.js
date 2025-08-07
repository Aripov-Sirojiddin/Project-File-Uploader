const session = require("express-session");
const express = require("express");
const cors = require("cors");
const path = require("node:path");
const indexRouter = require("./routers/indexRouter");
const authRouter = require("./routers/authRouter");
const folderRouter = require("./routers/folderRouter");
const passport = require("passport");
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate("session"));

require("dotenv").config();

const PORT = process.env.PORT || 3000;

app.use("/", authRouter);
app.use("/folder", folderRouter);
app.use("/", indexRouter);

app.get("/*splat", (req, res) => {
  res.status(404).render(path.join(__dirname, "views/pages/404.ejs"));
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

module.exports = app;
