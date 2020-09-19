const { Router } = require("express");
const router = Router();
const passport = require("passport");
const UserController = require("../Controllers/UserController");

router.get(
  "/chatrooms",
  passport.authenticate("jwt", { session: false }),
  UserController.getAllChatrooms
);

router.get(
  "/getUser",
  passport.authenticate("jwt", { session: false }),
  UserController.getUser
);

router.get(
  "/getMessages/:room",
  passport.authenticate("jwt", { session: false }),
  UserController.getMessages
);

router.post(
  "/addRoom",
  passport.authenticate("jwt", { session: false }),
  UserController.addRoom
);

router.post(
  "/changepassword/:userID",
  passport.authenticate("jwt", { session: false }),
  UserController.changePassword
);

router.get(
  "/messeges/:roomName/page/:page_number",
  passport.authenticate("jwt", { session: false }),
  UserController.getPaginatedMessages
);

router.delete(
  "/deleteRoom/:roomID",
  passport.authenticate("jwt", { session: false }),
  UserController.deleteRoom
);

router.post(
  "/changeNick/:userID",
  passport.authenticate("jwt", { session: false }),
  UserController.chageNick
);

router.delete(
  "/deleteAccount/:userID",
  passport.authenticate("jwt", { session: false }),
  UserController.deleteAccount
);
module.exports = router;
