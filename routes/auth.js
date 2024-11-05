const express = require("express");
const { register, login } = require("../controllers/auth");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// router.post('/procuct',auth, asdsad) burası middleware için oylesine bir ornek. silebilirisn

module.exports = router;
