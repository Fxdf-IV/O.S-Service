import express, { Request, Response } from 'express';
import cors from 'cors';

// Interfaces
interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  user_name: string;
  email: string;
  user_password: string;
  cellphone_number: string;
  user_departament_id: number;
  ramal_user_number: number;
  id_user_location: number;
}

interface Department {
  id_departament: number;
  name_departament: string;
}

interface Location {
  id_location: number;
  address_location: string;
  room: string;
}

interface Ramal {
  ramal_number: number;
}

const app = express();

// Middleware para permitir CORS e processar JSON
app.use(cors());
app.use(express.json());

// Mock data temporária (substitua por banco de dados depois)
const departments: Department[] = [
  { id_departament: 1, name_departament: 'TI' },
  { id_departament: 2, name_departament: 'RH' },
  { id_departament: 3, name_departament: 'Financeiro' }
];

const locations: Location[] = [
  { id_location: 1, address_location: 'Prédio Principal', room: '101' },
  { id_location: 2, address_location: 'Prédio Principal', room: '102' },
  { id_location: 3, address_location: 'Anexo', room: '201' }
];

const ramals: Ramal[] = [
  { ramal_number: 1001 },
  { ramal_number: 1002 },
  { ramal_number: 1003 }
];

const users: RegisterRequest[] = [];

// Rota de login
app.post('/login', (req: Request<{}, {}, LoginRequest>, res: Response) => {
  const { email, password } = req.body;

  // Procurar usuário registrado
  const user = users.find(u => u.email === email && u.user_password === password);
  
  if (user) {
    res.json({ message: 'Login bem-sucedido!' });
  } else {
    res.status(401).json({ message: 'Email ou senha incorretos!' });
  }
});

// Rota de registro
app.post('/register', (req: Request<{}, {}, RegisterRequest>, res: Response) => {
  const newUser = req.body;

  // Validações básicas
  if (!newUser.email || !newUser.user_password) {
    return res.status(400).json({ message: 'Email e senha são obrigatórios' });
  }

  // Verificar se email já existe
  if (users.some(user => user.email === newUser.email)) {
    return res.status(400).json({ message: 'Email já cadastrado' });
  }

  // Validar se departamento existe
  if (!departments.some(d => d.id_departament === Number(newUser.user_departament_id))) {
    return res.status(400).json({ message: 'Departamento inválido' });
  }

  // Validar se localização existe
  if (!locations.some(l => l.id_location === Number(newUser.id_user_location))) {
    return res.status(400).json({ message: 'Localização inválida' });
  }

  // Validar se ramal existe
  if (!ramals.some(r => r.ramal_number === Number(newUser.ramal_user_number))) {
    return res.status(400).json({ message: 'Ramal inválido' });
  }

  // Salvar usuário
  users.push(newUser);
  res.status(201).json({ message: 'Usuário registrado com sucesso!' });
});

// Rota para listar departamentos
app.get('/departments', (_req: Request, res: Response) => {
  res.json(departments);
});

// Rota para listar localizações
app.get('/locations', (_req: Request, res: Response) => {
  res.json(locations);
});

// Rota para listar ramais
app.get('/ramals', (_req: Request, res: Response) => {
  res.json(ramals);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});