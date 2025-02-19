// Carrega a lista de imagens do arquivo JSON
fetch('imagens.json')
    .then(response => response.json())
    .then(imagens => {
        // Seleciona 3 imagens aleatórias
        const shuffled = imagens.sort(() => 0.5 - Math.random());
        const selecionadas = shuffled.slice(0, 3);

        // Exibe as imagens na página
        const gallery = document.getElementById('gallery');
        selecionadas.forEach(nomeArquivo => {
            const img = document.createElement('img');
            img.src = `fotos/${nomeArquivo}`;
            img.alt = nomeArquivo;
            gallery.appendChild(img);
        });
    })
    .catch(error => console.error('Erro ao carregar imagens:', error));