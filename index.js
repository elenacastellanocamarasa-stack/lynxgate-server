const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/chat', async (req, res) => {
    try {
        // Aquí va tu lógica de OpenAI...
        // Simulamos la respuesta para asegurar que no se corte
        res.json({ 
            respuesta1: "Análisis iniciado...", 
            respuesta2: "Análisis completado con éxito por LynxGate." 
        });
    } catch (error) {
        res.status(500).send("Error en el servidor");
    }
});

// ESTA ES LA PARTE CLAVE: El servidor debe quedarse escuchando
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Servidor LynxGate Protegido y LISTO en puerto ' + PORT);
});
