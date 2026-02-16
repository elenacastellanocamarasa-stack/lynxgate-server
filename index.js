const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');
const app = express();

app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post('/chat', async (req, res) => {
    const { message } = req.body;
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "Eres LynxGate. Analiza el texto del usuario y responde estrictamente en este formato JSON: {\"ambito\": \"aquí el ámbito detectado\", \"foco\": \"aquí el foco de la preocupación\"}" },
                { role: "user", content: message }
            ],
        });

        const data = JSON.parse(completion.choices[0].message.content);
        res.json({
            respuesta1: data.ambito,
            respuesta2: data.foco
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error procesando la IA" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Servidor LynxGate funcionando correctamente en puerto ' + PORT);
});
