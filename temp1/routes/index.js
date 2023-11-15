var express = require("express");
var router = express.Router();
const userSchema = require("../routes/users");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.cookie("age", 25);
  res.render("index");
});

router.get("/read", function (req, res) {
  res.send(req.cookies.age);
  res.send("check");
});

router.get("/delete", function (req, res) {
  res.clearCookie("age");
  res.send("check");
});

// router.get("/create", async function (req, res, next) {
//   const createUser = await userSchema.create({
//     username: "test",
//     name: "test",
//     age: 20,
//   });

// router.get("/allusers", async function (req, res, next) {
//   let allUsers = await userSchema.find({});
//   res.send(allUsers);
// });

module.exports = router;
