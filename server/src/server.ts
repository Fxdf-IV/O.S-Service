import express, { Request, Response } from 'express';
import cors from 'cors';  // Para permitir requisições do front-end
import bodyParser from 'body-parser';  // Para ler JSON no corpo da requisição

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Mock de banco de dados (substitua por um banco real em produção)
const users = [
  { email: 'user@example.com', password: 'password123' },
];

// Rota de login
app.post('/login', (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Busca o usuário no "banco de dados"
  const user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    // Enviar resposta de sucesso (geralmente você enviaria um token JWT aqui)
    res.status(200).json({ message: 'Login bem-sucedido' });
  } else {
    // Resposta de erro se o login falhar
    res.status(400).json({ message: 'Email ou senha inválidos' });
  }
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
