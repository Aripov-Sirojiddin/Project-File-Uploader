const path = require("node:path");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const express = require("express");
const indexRouter = require("./routers/indexRouter");
const authRouter = require("./routers/authRouter");
const passport = require("passport");
const app = express();

require("dotenv").config();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const assetsPath = path.join(__dirname, "public");
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

const PORT = process.env.PORT || 3000;

app.use(express.static(assetsPath));

app.use(expressLayouts);
app.set("layout", "layout");

app.use("/", authRouter);
app.use("/", indexRouter);

app.get("/*splat", (req, res) => {
  res.status(404).render(path.join(__dirname, "views/pages/404.ejs"));
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));