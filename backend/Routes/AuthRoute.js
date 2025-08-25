const {
  Signup,
  Login,
  userVerification,
} = require("../controllers/AuthController");
const router = require("express").Router();

// console.log("\n--- Debugging AuthRoute.js Imports ---");
// console.log("  typeof Signup (in AuthRoute):", typeof Signup);
// console.log("  typeof Login (in AuthRoute):", typeof Login);
// console.log(
//   "  typeof userVerification (in AuthRoute):",
//   typeof userVerification
// );
// console.log("--------------------------------------\n");

router.post("/signup", Signup);
router.post("/login", Login);
router.post("/auth", userVerification);

module.exports = router;
