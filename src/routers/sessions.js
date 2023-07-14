const express = require('express');
const router = express.Router();
const {checkLogin} = require('../controller/sessions.js')

router.post('/', checkLogin);

module.exports = router;
