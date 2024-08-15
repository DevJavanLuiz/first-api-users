import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // ... you will write your Prisma Client queries here
}

main()
  .then(async () => {
    console.log("tentando");
    await prisma.$connect();
    console.log("conseguiu");
    prisma.user.create({
      data: { age: 21, email: "javanlsj@gmail.com", name: "Javan" },
    });
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

const app = express();
app.use(express.json());

const users = [];

app.post("/usuarios", (req, res) => {
  users.push(req.body);

  res.status(201).json(req.body);
});
app.get("/usuarios", (req, res) => {
  res.status(200).json(users);
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
