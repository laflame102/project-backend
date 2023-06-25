const express = require("express");
const ctrl = require('../../controllers/users');
const { validateBody, authenticate } = require('../../decorators');


const { schemas } = require('../../models/user');
const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.patch("/theme", authenticate, validateBody(schemas.themeSchema), ctrl.theme);

module.exports = router;