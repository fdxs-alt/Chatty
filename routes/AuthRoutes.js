const { Router } = require("express");
const router = Router();
const AuthController = require("../Controllers/AuthController");

router.post("/register", AuthController.register);

router.post("/confirm/:token", AuthController.confirm);

router.post("/login", AuthController.login);

router.post("/recoverpassword", AuthController.recoverPassword);

router.post("/reset/:token", AuthController.reset);

router.post("/resend", AuthController.resend);

module.exports = router;
