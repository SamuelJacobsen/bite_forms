const admin = require("firebase-admin");

const createForm = async (req, res) => {
    try {
        const { question, votesCount } = req.body;
        if (!question || !votesCount) {
            return res.status(400).json({ error: 'Campos obrigatórios não fornecidos' });
        }
        // Acesse o Firestore diretamente usando o admin.firestore()
        const formRef = await admin.firestore().collection('forms').add({
            question: question,
            votesCount: votesCount
        });
        res.status(201).json({ message: 'Formulário criado com sucesso!', id: formRef.id });
    } catch (error) {
        console.error('Erro ao criar formulário:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

const root = async (req, res) => {
    res.send("teste")
};

module.exports = { createForm, root };
