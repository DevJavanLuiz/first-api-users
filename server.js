import express from "express";

const app = express();
app.use(express.json());

app.post("/usuarios", (req, res) => {
  console.log(req.body);
  res.send("o post deu bom");
});

app.get("/usuarios", (req, res) => {
  res.send("Deu bom!");
});

app.listen(3000, () => {
  console.log("http://localhost:3000/");
});

/*
  CRIAR API DE USUÁRIOS
  
  -Criar um usuário
  -Listar todos os usuários
  -Editar um usuário
  -Deletar um usuário

*/
