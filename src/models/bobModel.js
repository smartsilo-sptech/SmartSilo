var { GoogleGenAI } = require("@google/genai");

var chatIA = new GoogleGenAI({ apiKey: process.env.MINHA_CHAVE });

async function gerarResposta(mensagem) {

    try {
        // gerando conteúdo com base na pergunta
        const modeloIA = chatIA.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Você é uma IA focada em ajudar com informações sobre armazenamento de grãos secos em silos verticais, seu nome é Bob. Muito breve responda: ${mensagem}`

        });
        const resposta = (await modeloIA).text;
        const tokens = (await modeloIA).usageMetadata;

        console.log(resposta);
        console.log("Uso de Tokens:", tokens);

        return resposta;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = { gerarResposta };