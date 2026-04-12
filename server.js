const express = require("express");
const { bancoDados } = require("./database");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`
        <body>
        <h1>SOS Enchentes</h1>
        
        <h2>Registros para pessoas desaparecidas</h2>
            
        <p>Lista de pessoas: /registros</p>
        </body>


        `);
});

//Rota para listar os registrados
app.get("/registros", async (req, res) => {
  const db = await bancoDados(); //chamando a função do database

  const todosOsRegistros = await db.all(`SELECT * FROM registros`);

  res.json(todosOsRegistros);
});

//Rota específica por nome
app.get("/registros/:nome", async (req, res) => {
  const { nome } = req.params;
  const db = await bancoDados();
  const pessoaEspecifica = await db.all(
    `SELECT * FROM registros WHERE nome = ?`,
    [nome],
  );

  res.json(pessoaEspecifica);
});

//POST novo registro de desaparecido
app.post("/registros", async (req, res) => {
  const { nome, idade, abrigo, endereco } = req.body;
  const db = await bancoDados();

  await db.run(
    `INSERT INTO registros(nome, idade, abrigo, endereco) VALUES (?, ?, ?, ?)`,
    [nome, idade, abrigo, endereco],
  );

  res.send(`Cadastro de desaparecido: ${nome}, de ${idade} de idade`)
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
