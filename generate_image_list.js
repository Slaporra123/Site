const fs = require('fs');
const path = require('path');

const pastaFotos = path.join(__dirname, 'fotos');

// Lista e filtra arquivos de imagem
const imagens = fs.readdirSync(pastaFotos)
    .filter(arquivo => /\.(jpg|jpeg|png|gif|webp)$/i.test(arquivo));

// Salva a lista em JSON
fs.writeFileSync(path.join(__dirname, 'imagens.json'), JSON.stringify(imagens));

console.log('Lista de imagens atualizada com sucesso!');