const express = require('express');
const router = express.Router();
const formsController = require('../controllers/FormsController');

// Rota para criar um novo formulário
router.post('/forms', formsController.createForm);
router.get('/', formsController.root );

module.exports = router;
