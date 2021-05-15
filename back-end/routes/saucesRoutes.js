const express = require('express');
const router = express.Router();

const saucesCtrl = require('../controllers/saucesControllers');

router.get('', saucesCtrl.sauces);
router.get('/:id', saucesCtrl.sauce);

module.exports = router;