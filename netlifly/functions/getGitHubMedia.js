const fetch = require('node-fetch');

exports.handler = async (event, context) => {
    const usuario = 'Slaporra123';
    const repositorio = 'Site';
    const branch = 'main';
    const pasta = 'Fotos';
    const token = process.env.GITHUB_TOKEN;

    try {
        const apiUrl = `https://api.github.com/repos/${usuario}/${repositorio}/contents/${pasta}?ref=${branch}`;
        const response = await fetch(apiUrl, {
            headers: {
                'Authorization': `token ${token}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        if (!response.ok) {
            throw new Error('Erro na requisição: ' + response.status);
        }

        const files = await response.json();
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
            throw new Error('A pasta precisa conter pelo menos 2 arquivos de mídia');
        }

        const shuffled = media.sort(() => Math.random() - 0.5);
        const selectedMedia = shuffled.slice(0, 2);

        return {
            statusCode: 200,
            body: JSON.stringify({ media: selectedMedia }),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        };
    } catch (error) {
        console.error('Erro:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Erro ao buscar mídia' })
        };
    }
};
