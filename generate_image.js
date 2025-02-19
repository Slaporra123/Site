const fs = require('fs');
const path = require('path');

// 1. Caminhos importantes
const repoRoot = path.join(__dirname);
const fotosDir = path.join(repoRoot, 'fotos');
const outputFile = path.join(repoRoot, 'imagens.json');

// 2. Verifica se a pasta existe
if (!fs.existsSync(fotosDir)) {
  console.error('❌ Pasta "fotos" não encontrada!');
  process.exit(1);
}

// 3. Lista e filtra arquivos
const arquivos = fs.readdirSync(fotosDir)
  .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
  .map(file => encodeURIComponent(file)); // Codifica caracteres especiais

// 4. Cria o arquivo JSON
try {
  fs.writeFileSync(outputFile, JSON.stringify(arquivos, null, 2));
  console.log('✅ imagens.json gerado com sucesso!');
  console.log(`📁 ${arquivos.length} imagens encontradas:`);
  console.log(arquivos.join('\n'));
} catch (error) {
  console.error('❌ Erro ao gerar JSON:', error);
}
