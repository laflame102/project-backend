const express = require("express");
const ctrl = require('../../controllers/users');
const validateBody = require("../../decorators/validateBody");


const { schemas } = require('../../models/user');
const router = express.Router();

router.patch("/theme", validateBody(schemas.themeSchema), ctrl.theme);

module.exports = router;