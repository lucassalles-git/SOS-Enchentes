const express = require("express");
const { bancoDados } = require("./database");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`
        <body>
        <h1>SOS Enchentes</h1>
        
        <h2>Abrigos para pessoas afetadas</h2>
            
        <p>Lista de abrigos: /abrigos</p>
        </body>


        `);
});

//Rota para listar os abrigos
app.get("/abrigos", async (req, res) => {
  const db = await bancoDados(); //chamando a função do database

  const todosOsAbrigos = await db.all(`SELECT * FROM abrigos`);

  res.json(todosOsAbrigos);
});







const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
