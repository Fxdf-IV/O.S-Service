import express, { Request, Response } from 'express';
import cors from 'cors';

interface LoginRequest {
  email: string;
  password: string;
}

const app = express();

// Middleware para permitir CORS e processar JSON
app.use(cors());
app.use(express.json());

// Rota de login
app.post('/login', (req: Request<{}, {}, LoginRequest>, res: Response) => {
  const { email, password } = req.body;

  // Implementar a lógica real de autenticação

  // Exemplo para teste
  if (email === 'fxdf01@hotmail.com' && password === '1') {
    res.json({ message: 'Login bem-sucedido!' });
  } else {
    res.status(401).json({ message: 'Email ou senha incorretos!' });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});