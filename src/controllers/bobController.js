var bobModel = require("../models/bobModel");

async function perguntar(req, res) {
    const pergunta = req.body.pergunta;

    try {
        const resultado = await bobModel.gerarResposta(pergunta);
        res.json({ resultado });
    } catch (error) {
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
}

module.exports = { perguntar };