const fetch = require('node-fetch');

exports.handler = async (event, context) => {
    const usuario = 'Slaporra123';
    const repositorio = 'Site';
    const branch = 'main';
    const pasta = 'Fotos';
    const token = process.env.GITHUB_TOKEN;

    try {
        if (!token) {
            throw new Error('GITHUB_TOKEN não configurado nas variáveis de ambiente');
        }

        const apiUrl = `https://api.github.com/repos/${usuario}/${repositorio}/contents/${pasta}?ref=${branch}`;
        const response = await fetch(apiUrl, {
            headers: {
                'Authorization': `token ${token}`,
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'Site-Netlify-Function' // Recomendado pela API do GitHub
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Erro na requisição: ${response.status} - ${errorText}`);
        }

        const files = await response.json();
        if (!Array.isArray(files)) {
            throw new Error('Resposta inválida da API do GitHub');
        }

        const media = files
            .filter(file => /\.(jpg|jpeg|png|gif|mp4)$/i.test(file.name))
            .map(file => {
                const ext = file.name.split('.').pop().toLowerCase();
                let type;
                if (['jpg', 'jpeg', 'png'].includes(ext)) type = 'image';
                else if (ext === 'gif') type = 'gif';
                else if (ext === 'mp4') type = 'video';
                return { url: file.download_url, type };
            });

        if (media.length < 2) {
            throw new Error('A pasta "Fotos" precisa conter pelo menos 2 arquivos de mídia válidos');
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ media }), // Retorna todos os arquivos
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        };
    } catch (error) {
        console.error('Erro:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};
