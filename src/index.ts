/*import express from "express";
// import db from "./client/db";

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
*/
// Exercicio de CRUD
// Utilizando as 5 funções encontradas em db, crie 5 endpoints para o recurso "usuario".
// (Leia em README para saber mais sobre as funções)
/* 
    O recurso usuario deve ter as seguintes propriedades com seus respectivos tipos:
    { 
        name: String, 
        email: String, 
        password: String 
    }
*/

// app.get("/", (req, res) => {
//   res.send("Hello World");
// });
/*
app.listen(port, () => {
  console.log(`Esse servidor está rodando em ${port}`);
});
*/




import express from 'express';
import * as fs from 'fs';

const app = express();
const PORT = 8080;

app.use(express.json()); // Para que o Express possa interpretar JSON

const USERS_FILE = 'users.json';

// Função para ler usuários do arquivo
const readUsers = () => {
  if (fs.existsSync(USERS_FILE)) {
    const data = fs.readFileSync(USERS_FILE, 'utf-8');
    return JSON.parse(data);
  }
  return [];
};

// Função para escrever usuários no arquivo
const writeUsers = (users: any[]) => {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
};

// Função para gerar um novo ID
const generateId = (users: any[]) => {
  return users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1;
};

// Rota para obter todos os usuários (GET)
app.get('/users', (req, res) => {
  const users = readUsers();
  res.json(users);
});

// Rota para criar um novo usuário (POST)
app.post('/users', (req, res) => {
  const newUser = req.body;
  const users = readUsers();
  newUser.id = generateId(users); // Gera um novo ID
  users.push(newUser);
  writeUsers(users);
  res.status(201).json(newUser);
});

// Rota para atualizar um usuário existente (PUT)
app.put('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedUser = req.body;
  const users = readUsers();

  const index = users.findIndex(user => user.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Usuário não encontrado' });
  }

  // Atualiza o usuário
  users[index] = { id, ...updatedUser };
  writeUsers(users);
  res.json(users[index]);
});

// Rota para atualizar parcialmente um usuário (PATCH)
app.patch('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const partialUpdate = req.body;
  const users = readUsers();

  const index = users.findIndex(user => user.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Usuário não encontrado' });
  }

  // Atualiza apenas os campos fornecidos
  users[index] = { ...users[index], ...partialUpdate };
  writeUsers(users);
  res.json(users[index]);
});

// Rota para deletar um usuário (DELETE)
app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const users = readUsers();

  const index = users.findIndex(user => user.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Usuário não encontrado' });
  }

  // Remove o usuário
  users.splice(index, 1);
  writeUsers(users);
  res.status(204).send(); // 204 No Content
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
