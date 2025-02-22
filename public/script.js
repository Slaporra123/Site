// Carrega imagens aleatórias únicas
async function carregarImagens() {
    try {
        const response = await fetch('/api/imagens'); // Rota do backend
        const imagens = await response.json();

        if (imagens.length < 2) throw new Error('Adicione pelo menos 2 imagens diferentes');

        // Embaralha as imagens
        const shuffled = imagens.sort(() => Math.random() - 0.5);
        const [img1, img2] = shuffled.slice(0, 2);

        document.getElementById('photo1').src = img1;
        document.getElementById('photo2').src = img2;

    } catch (error) {
        console.error('Erro:', error);
        alert(`Falha ao carregar: ${error.message}`);
    }
}

// Sistema de código secreto melhorado
const secretCode = ['•', '•', '-'];
let inputSequence = [];

document.querySelectorAll('.photo-container').forEach(container => {
    container.addEventListener('click', () => {
        inputSequence.push(container.dataset.code);
        checkSecretCode();
    });
});

function checkSecretCode() {
    // Verifica a cada clique se o código parcial está correto
    for (let i = 0; i < inputSequence.length; i++) {
        if (inputSequence[i] !== secretCode[i]) {
            inputSequence = [];
            return;
        }
    }

    // Se chegou ao tamanho do código e está correto
    if (inputSequence.length === secretCode.length) {
        showSecretLayer();
        inputSequence = [];
    }
}

function showSecretLayer() {
    const layer = document.getElementById('secretLayer');
    layer.classList.add('active');
    setTimeout(hideSecretLayer, 25000);
}

function hideSecretLayer() {
    document.getElementById('secretLayer').classList.remove('active');
}

// Inicialização
carregarImagens();
