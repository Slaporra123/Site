require('dotenv').config(); // Carrega variáveis de ambiente do arquivo .env
const express = require('express');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

// Servir arquivos estáticos (HTML, CSS, JS)
app.use(express.static('public'));

// Rota para buscar as imagens
app.get('/api/imagens', async (req, res) => {
    try {
        const apiUrl = `https://api.github.com/repos/Slaporra123/Site/contents/Fotos?ref=main`;
        const response = await fetch(apiUrl, {
            headers: {
                'Authorization': `token ${process.env.GH_TOKEN}`, // Token do GitHub Secret
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);

        const files = await response.json();
        const imagens = files
            .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file.name))
            .map(file => file.download_url);

        res.json(imagens);
    } catch (error) {
        console.error('Erro:', error);
        res.status(500).json({ error: 'Erro ao carregar imagens' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
