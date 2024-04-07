const admin = require("firebase-admin");

// Função para criar uma nova pergunta
const createQuestion = async (req, res) => {
    try {
        const { question, options } = req.body;
        
        // Verifica se a pergunta e as opções foram fornecidas
        if (!question || !options || options.length < 2) {
            return res.status(400).json({ error: 'Pergunta ou opções inválidas' });
        }

        // Adiciona a nova pergunta ao Firestore
        const newQuestionRef = await admin.firestore().collection('questions').add({
            question: question,
            options: options.map(option => ({ text: option })),
            votes: options.map(() => 0) // Inicializa o array de votos para cada opção com zero
        });

        res.status(201).json({ message: 'Pergunta criada com sucesso', questionId: newQuestionRef.id });
    } catch (error) {
        console.error('Erro ao criar pergunta:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

// Função para votar em uma pergunta específica
const voteQuestion = async (req, res) => {
    try {
        const questionId = req.params.questionId;
        const optionId = req.body.optionId;

        // Obtém a referência da pergunta no Firestore
        const questionRef = admin.firestore().collection('questions').doc(questionId);
        const questionDoc = await questionRef.get();

        if (!questionDoc.exists) {
            return res.status(404).json({ error: 'Pergunta não encontrada' });
        }

        const questionData = questionDoc.data();

        // Verifica se a opção de voto é válida
        if (optionId < 0 || optionId >= questionData.options.length) {
            return res.status(400).json({ error: 'Opção de voto inválida' });
        }

        // Incrementa o voto para a opção escolhida
        questionData.votes[optionId]++;

        // Atualiza a pergunta no Firestore
        await questionRef.update({
            votes: questionData.votes
        });

        res.status(200).json({ message: 'Voto registrado com sucesso' });
    } catch (error) {
        console.error('Erro ao votar na pergunta:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

// Função para obter detalhes de uma pergunta específica
const getQuestionDetails = async (req, res) => {
    try {
        const questionId = req.params.questionId;

        // Obtém os detalhes da pergunta no Firestore
        const questionDoc = await admin.firestore().collection('questions').doc(questionId).get();

        if (!questionDoc.exists) {
            return res.status(404).json({ error: 'Pergunta não encontrada' });
        }

        const questionData = questionDoc.data();

        res.status(200).json(questionData);
    } catch (error) {
        console.error('Erro ao obter detalhes da pergunta:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

// Função para listar todas as perguntas disponíveis
const getAllQuestions = async (req, res) => {
    try {
        // Obtém todas as perguntas do Firestore
        const questionsSnapshot = await admin.firestore().collection('questions').get();
        const questionsData = [];

        questionsSnapshot.forEach(doc => {
            const question = doc.data();
            question.id = doc.id;
            questionsData.push(question);
        });

        res.status(200).json(questionsData);
    } catch (error) {
        console.error('Erro ao listar perguntas:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
// Função para alterar uma pergunta específica
const updateQuestion = async (req, res) => {
    try {
        const questionId = req.params.questionId;
        const { question, options } = req.body;

        // Verifica se a pergunta e as opções foram fornecidas
        if (!question || !options || options.length < 2) {
            return res.status(400).json({ error: 'Pergunta ou opções inválidas' });
        }

        // Atualiza os dados da pergunta no Firestore
        await admin.firestore().collection('questions').doc(questionId).update({
            question: question,
            options: options.map(option => ({ text: option })),
            votes: options.map(() => 0) // Recria o array de votos para cada opção com zero
        });

        res.status(200).json({ message: 'Pergunta atualizada com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar pergunta:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

// Função para deletar uma pergunta específica
const deleteQuestion = async (req, res) => {
    try {
        const questionId = req.params.questionId;

        // Remove a pergunta do Firestore
        await admin.firestore().collection('questions').doc(questionId).delete();

        res.status(200).json({ message: 'Pergunta removida com sucesso' });
    } catch (error) {
        console.error('Erro ao remover pergunta:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

module.exports = { createQuestion, voteQuestion, getQuestionDetails, getAllQuestions, deleteQuestion, updateQuestion};
