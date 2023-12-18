var express = require("express");
var router = express.Router();

const passport = require("passport");
const userModel = require("./users");
const postModel = require("./post");
// const upload = require("./multer");
const localStrategy = require("passport-local").Strategy;
passport.use(new localStrategy(userModel.authenticate()));

/* GET */
router.get("/", function (req, res, next) {
  res.render("index", { nav: false });
});

router.get("/login", function (req, res, next) {
  res.render("login", { nav: false });
});

router.get("/profile", isLoggedIn, async function (req, res) {
  const user = await userModel
    .findOne({ username: req.session.passport.user })
    .populate("posts");
  res.render("profile", { user, nav: true });
});

/* POST*/

router.post("/register", function (req, res, next) {
  const { email, fullname, username } = req.body;
  const newUser = new userModel({ email, fullname, username });

  userModel.register(newUser, req.body.password).then(function (err, user) {
    passport.authenticate("local")(req, res, function () {
      res.redirect("/profile");
    });
  });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login",
  })
);

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/login");
  }
}

module.exports = router;
