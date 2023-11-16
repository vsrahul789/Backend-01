var express = require("express");
var router = express.Router();
const userModel = require("./users");
const passport = require("passport");
const localStrategy = require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});

router.post("/register", function (req, res) {
  var userdata = new userModel({
    username: req.body.username,
    secret: req.body.secret,
  });

  userModel
    .register(userdata, req.body.password)
    .then(function (registereduser) {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/profile");
      });
    });
});

router.get("/profile", isLoggedIn, function (req, res) {
  res.send("welcome to profile");
});

router.get(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/failed",
  }),
  function (req, res) {}
);

router.get("/logout", function (req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}

// router.get("/failed", function (req, res, next) {
//   req.flash("age", 20);
//   req.flash("name", "John");
//   res.send("failed successfully");
// });

// router.get("/check", function (req, res, next) {
//   console.log(req.flash("age"), req.flash("name"));
//   res.send("check successfully");
// });

module.exports = router;
