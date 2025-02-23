-- Tabela de Usuários
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,                 -- Chave primária, identificador exclusivo auto-incrementado
    user_name TEXT NOT NULL,                              -- Nome do usuário (obrigatório)
    email TEXT NOT NULL UNIQUE,                           -- Email do usuário (obrigatório, unico)
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,      -- Data de criação (obrigatório)
    user_password TEXT NOT NULL,                          -- Senha do usuário (obrigatório)
    user_status TEXT NOT NULL DEFAULT 'active',           -- Status do usuário (obrigatório)
    cellphone_number TEXT NOT NULL,                       -- Celular do usuário (obrigatório)
    user_departament_id INTEGER NOT NULL,                 -- ID do departamento do usuário (obrigatório)
    FOREIGN KEY (user_departament_id) REFERENCES departaments(id_departament),
    ramal_user_number INTEGER NOT NULL,                   -- Ramal do usuário (obrigatório)
    FOREIGN KEY (ramal_user_number) REFERENCES ramals(ramal_number),
    id_user_location INTEGER NOT NULL,                    -- Localização do usuário (obrigatório)
    FOREIGN KEY (id_user_location) REFERENCES locations(id_location),
);

-- Tabela de Técnicos
CREATE TABLE IF NOT EXISTS technicians (
    technician_id INTEGER PRIMARY KEY,                    -- Chave primária
    FOREIGN KEY (technician_id) REFERENCES users(id),     -- Referência ao usuário
);

-- Tabela de Administradores
CREATE TABLE IF NOT EXISTS admins (
    admin_id INTEGER PRIMARY KEY,                         -- Chave primária
    FOREIGN KEY (admin_id) REFERENCES users(id),          -- Referência ao usuário
);

-- Tabela de Tickets
CREATE TABLE IF NOT EXISTS tickets (
    protocol INTEGER PRIMARY KEY AUTOINCREMENT,             -- Chave primária, identificador exclusivo auto-incrementado
    ticket_category TEXT NOT NULL,                          -- Tipo de ticket
    description_ticket TEXT NOT NULL,                       -- Descricao do ticket
    created_at_ticket DATETIME DEFAULT CURRENT_TIMESTAMP,   -- Data de criação
    problem_category TEXT NOT NULL,                         -- Categoria do problema
    problem_at DATETIME DEFAULT CURRENT_TIMESTAMP,          -- Data do problema
    user_id_requester INTEGER NOT NULL,                     -- ID do usuário
    FOREIGN KEY (user_id_requester) REFERENCES users(id),
    location_id_requester INTEGER NOT NULL,                 -- Localização do usuário
    FOREIGN KEY (location_id_requester) REFERENCES locations(id_location),

    status_ticket TEXT NOT NULL,                            -- Status do ticket
    conclusion_at DATETIME DEFAULT CURRENT_TIMESTAMP,       -- Data da conclusão
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,          -- Data das atualizações
    solution_description TEXT NOT NULL,                     -- Descrição da solução
    technician_id_solver INTEGER NOT NULL,                  -- ID do tecnico
    FOREIGN KEY (technician_id_solver) REFERENCES users(id),
   
    item_is_used BOOLEAN NOT NULL DEFAULT FALSE ,           -- Itens usados
    CHECK (
        item_is_used = FALSE OR item_id_used IS NOT NULL
    ),
    item_id_used INTEGER,
    FOREIGN KEY (item_id_used) REFERENCES inventory_items(id_item)
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
    address_location TEXT NOT NULL,                             -- Endereço
    address_number INTEGER NOT NULL,                            -- Número do endereço
    neighborhood TEXT NOT NULL,                                 -- Bairro   
    department TEXT NOT NULL,                                   -- Departamento
    room TEXT NOT NULL,                                         -- Sala
    ramal_number INTEGER NOT NULL,                              -- Ramal
    FOREIGN KEY (ramal_number) REFERENCES ramals(ramal_number)
);

CREATE TABLE IF NOT EXISTS departaments (
    id_departament INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,   -- Chave primária, identificador exclusivo auto-incrementado
    name_departament TEXT NOT NULL,                              -- Nome do departamento
    departament_location_id INTEGER NOT NULL,                    -- Localização do departamento
    FOREIGN KEY (departament_location_id) REFERENCES locations(id_location),
    departament_ramal INTEGER NOT NULL,                         -- Ramal do departamento
    FOREIGN KEY (departament_ramal) REFERENCES ramals(ramal_number)
);

CREATE TABLE IF NOT EXISTS ramals ( 
    ramal_number INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,     -- Ramal
    ramal_name TEXT NOT NULL,                                    -- Nome do ramal
    ramal_location INTEGER NOT NULL,                             -- Localização do ramal
    FOREIGN KEY (ramal_location) REFERENCES locations(id_location),
    ramal_departament INTEGER NOT NULL,                         -- Departamento do ramal
    FOREIGN KEY (ramal_departament) REFERENCES departaments(id_departament)
);

CREATE TABLE IF NOT EXISTS inventory_items (
    id_item INTEGER PRIMARY KEY AUTOINCREMENT,                   -- Chave primária, identificador exclusivo auto-incrementado
    name_item TEXT NOT NULL,                                     -- Nome do item
    type_item TEXT NOT NULL,                                     -- Tipo do item
    quantity_item INTEGER NOT NULL,                              -- Quantidade do item
    buyed_at DATETIME NOT NULL,                                  -- Data de compra
    status_item TEXT NOT NULL,                                   -- Status do item
    location_item_id INTEGER NOT NULL,                           -- Localização do item
    FOREIGN KEY (location_item_id) REFERENCES locations(id_location)
);