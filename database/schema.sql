-- Tabela de Usuários
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,                 -- Chave primária, identificador exclusivo auto-incrementado
    user_name TEXT NOT NULL,                              -- Nome do usuário (obrigatório)
    email TEXT NOT NULL UNIQUE,                           -- Email do usuário (obrigatório, unico)
    created_date DATETIME DEFAULT CURRENT_TIMESTAMP,      -- Data de criação (obrigatório)
    user_password TEXT NOT NULL,                          -- Senha do usuário (obrigatório)
    CHECK (                                               -- Restrição para a senha
        LENGTH(user_password) >= 8 AND                    -- Comprimento da senha (no mínimo 8 caracteres)
        user_password GLOB '[A-Z]*' AND                   -- Deve conter pelo menos uma letra maiúscula
        user_password GLOB '[0-9]*'                       -- Deve conter pelo menos um número
    ),
    user_status TEXT NOT NULL DEFAULT 'active',           -- Status do usuário (obrigatório)
    cellphone_number INTEGER NOT NULL,                    -- Celular do usuário (obrigatório)
    user_departament_id INTEGER NOT NULL,                 -- ID do departamento do usuário (obrigatório)
    FOREIGN KEY (user_departament_id) REFERENCES departaments(id_departament),
    ramal_user_number INTEGER NOT NULL,                   -- Ramal do usuário (obrigatório)
    FOREIGN KEY (ramal_user_number) REFERENCES ramals(ramal_number),
    id_user_location INTEGER NOT NULL,                    -- Localização do usuário (obrigatório)
    FOREIGN KEY (id_user_location) REFERENCES locations(id_location)
);

-- Tabela de Tenicos
CREATE TABLE IF NOT EXISTS technicians (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,                           
    created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    user_password TEXT NOT NULL,                          -- Senha do usuário (obrigatório)
    CHECK (                                               -- Restrição para a senha
        LENGTH(user_password) >= 8 AND                    -- Comprimento da senha (no mínimo 8 caracteres)
        user_password GLOB '[A-Z]*' AND                   -- Deve conter pelo menos uma letra maiúscula
        user_password GLOB '[0-9]*'                       -- Deve conter pelo menos um número
    ),
    technician_functions TEXT NOT NULL,                   -- Funções do tecnico (obrigatório)
    technician_status TEXT NOT NULL DEFAULT 'active',
    cellphone_number INTEGER NOT NULL,
    ramal_number INTEGER NOT NULL,
    FOREIGN KEY (ramal_number) REFERENCES ramals(ramal_number),
    id_location INTEGER NOT NULL,
    FOREIGN KEY (id_location) REFERENCES locations(id_location)
);

-- Tabela de Tickets
CREATE TABLE IF NOT EXISTS tickets (
    protocol INTEGER PRIMARY KEY AUTOINCREMENT,             -- Chave primária, identificador exclusivo auto-incrementado
    type_ticket TEXT NOT NULL,                              -- Tipo de ticket (obrigatório)
    created_date_ticket DATETIME DEFAULT CURRENT_TIMESTAMP, -- Data de criação (obrigatório)
    description_ticket TEXT NOT NULL,                       -- Descricao do ticket (obrigatório)
    problem_date DATETIME DEFAULT CURRENT_TIMESTAMP,        -- Data do problema (obrigatório)
    validate_code TEXT UNIQUE,                              -- Código de validação (obrigatório)
    user_id_requester INTEGER NOT NULL,                     -- ID do usuário (obrigatório)
    FOREIGN KEY (user_id_requester) REFERENCES users(id),

    status_ticket TEXT NOT NULL,                            -- Status do ticket (obrigatório)
    conclusion_date DATETIME DEFAULT CURRENT_TIMESTAMP,     -- Data da conclusão (obrigatório)
    solution_description TEXT NOT NULL,                     -- Descrição da solução (obrigatório)
    technician_id_solver INTEGER NOT NULL,                  -- ID do tecnico (obrigatório)
    FOREIGN KEY (technician_id_solver) REFERENCES technicians(id)
);

-- Trigger para gerar o código de validação ao inserir um novo ticket
CREATE TRIGGER IF NOT EXISTS validate_code_trigger 
AFTER INSERT ON tickets
FOR EACH ROW
BEGIN
    UPDATE tickets 
    SET validate_code = UPPER(HEX(RANDOM() % 1000000))         -- Gera um código hexadecimal aleatório
    WHERE protocol = NEW.protocol;
END;

CREATE TABLE IF NOT EXISTS locations (
    id_location INTEGER PRIMARY KEY AUTOINCREMENT,
    address_location TEXT NOT NULL,
    address_number INTEGER NOT NULL,
    neighborhood TEXT NOT NULL,
    cep INTEGER NOT NULL,
    department TEXT NOT NULL,
    room TEXT NOT NULL,
    ramal_number INTEGER NOT NULL,
    FOREIGN KEY (ramal_number) REFERENCES ramals(ramal_number)
);

CREATE TABLE IF NOT EXISTS departaments (
    id_departament INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    name_departament TEXT NOT NULL
    departament_location_id INTEGER NOT NULL,
    FOREIGN KEY (departament_location_id) REFERENCES locations(id_location)
    departament_ramal INTEGER NOT NULL,
    FOREIGN KEY (departament_ramal) REFERENCES ramals(ramal_number)
);

CREATE TABLE IF NOT EXISTS ramals (
    ramal_number INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    ramal_name TEXT NOT NULL,
    ramal_location INTEGER NOT NULL,
    FOREIGN KEY (ramal_location) REFERENCES locations(id_location),
    ramal_departament INTEGER NOT NULL,
    FOREIGN KEY (ramal_departament) REFERENCES departaments(id_departament)
);

CREATE TABLE IF NOT EXISTS inventory_itens (
    id_iten INTEGER PRIMARY KEY AUTOINCREMENT,
    name_iten TEXT NOT NULL,
    type_iten TEXT NOT NULL,
    quantity_iten INTEGER NOT NULL,
    buy_date DATETIME NOT NULL,
    status_iten TEXT NOT NULL,
    location_iten_id INTEGER NOT NULL,
    FOREIGN KEY (location_iten_id) REFERENCES locations(id_location)
);