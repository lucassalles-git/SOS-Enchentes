const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

const bancoDados = async () => {
  //Abrindo o banco de dados
  const db = await open({
    filename: "./database.db",
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS desaparecidos(
    
    -- identificação de desaparecido
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    imagem TEXT,
    nome TEXT,
    idade INTEGER,
    status TEXT DEFAULT "desaparecido",
    descricao TEXT,
    ultima_vezVisto TEXT,
    abrigo TEXT,
    endereco TEXT,
    data_cadastro TEXT DEFAULT CURRENT_TIMESTAMP
    )
        `);

  console.log("Banco de dados configurado: A tabela de desaparecidos está pronta");

   const checagem = await db.get(`SELECT COUNT (*) AS total FROM desaparecidos`);

   if (checagem.total === 0) {
    await db.exec(`
      INSERT INTO desaparecidos(imagem, nome, idade, status, descricao, ultima_vezVisto, abrigo, endereco) VALUES 
      
      ("https://github.com/lucassalles-git/SOS-EnchentesFrontend/blob/main/src/assets/pedro.png?raw=true", "Pedro da Silva Guimarães", 6, "Encontrado", "Baixa estatura, pele parda, cabelos pretos lisos e curtos.", "Vestia camiseta amarela de super-herói e bermuda jeans", "Ginásio Tesourinha", "Av. Erico Verissimo, s/n - Menino Deus, Porto Alegre - RS" ),

      ("https://github.com/lucassalles-git/SOS-EnchentesFrontend/blob/main/src/assets/arnaldo.png?raw=true", "Arnaldo Gonçalves de Lima", 74, "Encontrado", "Alto, magro, pele branca com manchas senis. Cabelos totalmente brancos e ralos", "Calça de moletom cinza e camisa de botões xadrez azul.", "Centro Estadual de Treinamento Esportivo (CETE)", "Rua Gonçalves Dias, 700 - Menino Deus, Porto Alegre - RS"),

      ("https://github.com/lucassalles-git/SOS-EnchentesFrontend/blob/main/src/assets/lucas.png?raw=true", "Lucas Oliveira Neto", 16, "Encontrado", "Porte atlético, pele negra, cabelo com corte dreadlocks curtos", "Usando moletom preto com capuz, calça larga e mochila camuflada", "Abrigo Vida (Igreja e Centro Social)", "Av. Sertório, 5400 - Jardim Lindóia, Porto Alegre - RS"),

      ("https://github.com/lucassalles-git/SOS-EnchentesFrontend/blob/main/src/assets/mariana.png?raw=true", "Mariana Mendes Amorim", 28, "Encontrado", "Estatura média, pele branca, cabelos longos e tingidos de ruivo vibrante", "Vestido floral escuro e jaqueta de couro preta", "Centro de Esportes e Lazer (CEL) Mathias Velho", "Rua João Paulo I, s/n - Bairro Mathias Velho, Canoas - RS"),

      ("https://github.com/lucassalles-git/SOS-EnchentesFrontend/blob/main/src/assets/roberto.png?raw=true", "Roberto de Oliveira Santos", 45, "Encontrado", "Forte, pele parda, careca, barba por fazer (estilo clã)", "Camiseta polo verde e calça jeans clara", "Parque do Imigrante (Pavilhões de Acolhimento)", "Av. Parque do Imigrante, s/n - Bairro Alto do Parque, Lajeado - RS"),

      ("https://github.com/lucassalles-git/SOS-EnchentesFrontend/blob/main/src/assets/gabriela.png?raw=true", "Gabriela Salles Pereira", 19, "Encontrado", "Magra, pele branca, cabelos castanhos ondulados na altura dos ombros", "Calça legging preta e blusa de frio rosa claro", "Ginásio Municipal Celso Morbach", "Av. Dom João Becker, s/n - Centro, São Leopoldo - RS")
      `)
   }

  return db;
};

// bancoDados();

module.exports = { bancoDados };
