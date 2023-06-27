const express = require("express");
const ctrl = require("../../controllers/users");
const { validateBody, authenticate, upload } = require("../../decorators");

const { schemas } = require("../../models/user");
const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.get("/refresh",  authenticate, ctrl.refresh);

router.get("/current", authenticate, ctrl.getCurrent);

router.put("/update",authenticate,validateBody(schemas.updateProfileSchema),ctrl.updateProfile);

router.post("/logout", authenticate, ctrl.logout);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);

router.patch(
  "/theme",
  authenticate,
  validateBody(schemas.themeSchema),
  ctrl.theme
);

router.post("/help", authenticate, validateBody(schemas.helpSchema), ctrl.help);

module.exports = router;
