const express = require('express');
const router = express.Router();
const formsController = require('../controllers/FormsController');


// Rota para criar uma nova pergunta
router.post('/create', formsController.createQuestion);

// Rota para votar em uma pergunta específica
router.post('/vote/:questionId', formsController.voteQuestion);

// Rota para obter detalhes de uma pergunta específica
router.get('/:questionId', formsController.getQuestionDetails);

// Rota para listar todas as perguntas disponíveis
router.get('/', formsController.getAllQuestions);

// Rota para alterar dados de uma pergunta específica
router.put('/:questionId', formsController.updateQuestion);

// Rota para remover uma pergunta específica
router.delete('/:questionId', formsController.deleteQuestion);
module.exports = router;
