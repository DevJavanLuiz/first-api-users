import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {}

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

app.post("/usuarios", async (req, res) => {
  await prisma.user.create({
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age,
    },
  });

  res.status(201).json({ message: "Usuário criado com sucesso!" });
});

app.get("/usuarios", async (req, res) => {
  const users = await prisma.user.findMany();
  res.status(200).json(users);
});

app.put("/usuarios/:id", async (req, res) => {
  await prisma.user.update({
    where: {
      id: req.params.id,
    },
    data: {
      name: req.body.name,
      age: req.body.age,
      email: req.body.email,
    },
  });

  res.status(200).json({ message: "Editado com sucesso!" });
});

app.delete("/usuarios/:id", middlewareUserRequired, async (req, res) => {
  await prisma.user.deleteMany({
    where: {
      id: req.params.id,
    },
  });

  res.status(200).json({ message: "Apagado com sucesso!" });
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

async function middlewareUserRequired(req, res, next) {
  const identficadorUnico = req.params.id || req.body.id;
  const userExist = await prisma.user.findFirst({
    where: { id: identficadorUnico },
  });
  if (!userExist)
    return res.status(404).json({ success: false, message: "User not exist" });

  next();

  console.log(userExist);
}
