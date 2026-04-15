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
    nome TEXT,
    idade INTEGER,
    descricao TEXT,
    ultimo_local TEXT,
    status TEXT DEFAULT "desaparecido",
    abrigo TEXT,
    endereco TEXT,
    data_cadastro TEXT DEFAULT CURRENT_TIMESTAMP
    )
        `);

  console.log("Banco de dados configurado: A tabela de desaparecidos está pronta");

  const checagem = await db.get(`SELECT COUNT (*) AS total FROM desaparecidos`);

  if (checagem.total === 0) {
    await db.exec(`
        INSERT INTO desaparecidos(nome, idade, descricao, ultimo_local, status, abrigo, endereco) VALUES (?, ?, ?, ?, ?, ?, ?)`);
  } else {
    console.log(`Banco pronto com ${checagem.total} desaparecidos`);
  }

  const todosOsDesaparecidos = await db.all("SELECT * FROM desaparecidos");
  console.table(todosOsDesaparecidos);

  return db;
};

// bancoDados();

module.exports = { bancoDados };
