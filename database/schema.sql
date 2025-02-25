-- Tabela de Usuários
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,                       -- Chave primária, identificador exclusivo auto-incrementado
    user_name VARCHAR(255) NOT NULL,                         -- Nome do usuário (obrigatório)
    email VARCHAR(255) NOT NULL UNIQUE,                      -- Email do usuário (obrigatório, unico)
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,           -- Data de criação (obrigatório)
    user_password VARCHAR(255) NOT NULL,                     -- Senha do usuário (obrigatório)
    user_status VARCHAR(20) NOT NULL DEFAULT 'active',       -- Status do usuário (obrigatório)
    cellphone_number VARCHAR(20) NOT NULL,                   -- Celular do usuário (obrigatório)
    user_departament_id INT NOT NULL,                        -- ID do departamento do usuário (obrigatório)
    FOREIGN KEY (user_departament_id) REFERENCES departaments(id_departament),
    ramal_user_number INT NOT NULL,                          -- Ramal do usuário (obrigatório)
    FOREIGN KEY (ramal_user_number) REFERENCES ramals(ramal_number),
    id_user_location INT NOT NULL,                           -- Localização do usuário (obrigatório)
    FOREIGN KEY (id_user_location) REFERENCES locations(id_location)
) ENGINE=InnoDB;

-- Tabela de Técnicos
CREATE TABLE IF NOT EXISTS technicians (
    technician_id INT PRIMARY KEY,                          -- Chave primária
    FOREIGN KEY (technician_id) REFERENCES users(id)        -- Referência ao usuário
) ENGINE=InnoDB;

-- Tabela de Administradores
CREATE TABLE IF NOT EXISTS admins (
    admin_id INT PRIMARY KEY,                               -- Chave primária
    FOREIGN KEY (admin_id) REFERENCES users(id)             -- Referência ao usuário
) ENGINE=InnoDB;

-- Tabela de Tickets
CREATE TABLE IF NOT EXISTS tickets (
    protocol INT AUTO_INCREMENT PRIMARY KEY,                 -- Chave primária, identificador exclusivo auto-incrementado
    ticket_category VARCHAR(255) NOT NULL,                   -- Tipo de ticket
    description_ticket TEXT NOT NULL,                        -- Descrição do ticket
    created_at_ticket DATETIME DEFAULT CURRENT_TIMESTAMP,    -- Data de criação
    problem_category VARCHAR(255) NOT NULL,                  -- Categoria do problema
    problem_at DATETIME DEFAULT CURRENT_TIMESTAMP,           -- Data do problema
    user_id_requester INT NOT NULL,                          -- ID do usuário
    FOREIGN KEY (user_id_requester) REFERENCES users(id),
    location_id_requester INT NOT NULL,                      -- Localização do usuário
    FOREIGN KEY (location_id_requester) REFERENCES locations(id_location),
    status_ticket VARCHAR(50) NOT NULL,                      -- Status do ticket
    conclusion_at DATETIME DEFAULT CURRENT_TIMESTAMP,        -- Data da conclusão
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,           -- Data das atualizações
    solution_description TEXT NOT NULL,                      -- Descrição da solução
    technician_id_solver INT NOT NULL,                       -- ID do técnico
    FOREIGN KEY (technician_id_solver) REFERENCES users(id),
    item_is_used BOOLEAN NOT NULL DEFAULT FALSE,             -- Itens usados
    item_id_used INT,                                        -- ID do item usado
    CHECK (item_is_used = FALSE OR item_id_used IS NOT NULL),
    FOREIGN KEY (item_id_used) REFERENCES inventory_items(id_item)
) ENGINE=InnoDB;

-- Trigger para gerar o código de validação ao inserir um novo ticket
DELIMITER //
CREATE TRIGGER IF NOT EXISTS validate_code_trigger 
AFTER INSERT ON tickets
FOR EACH ROW
BEGIN
    UPDATE tickets 
    SET validate_code = UPPER(HEX(RAND() * 1000000))         -- Gera um código hexadecimal aleatório
    WHERE protocol = NEW.protocol;
END;
//
DELIMITER ;

-- Tabela de Localizações
CREATE TABLE IF NOT EXISTS locations (
    id_location INT AUTO_INCREMENT PRIMARY KEY,
    address_location VARCHAR(255) NOT NULL,                   -- Endereço
    address_number INT NOT NULL,                              -- Número do endereço
    neighborhood VARCHAR(255) NOT NULL,                       -- Bairro
    department VARCHAR(255) NOT NULL,                         -- Departamento
    room VARCHAR(255) NOT NULL,                               -- Sala
    ramal_number INT NOT NULL,                                -- Ramal
    FOREIGN KEY (ramal_number) REFERENCES ramals(ramal_number)
) ENGINE=InnoDB;

-- Tabela de Departamentos
CREATE TABLE IF NOT EXISTS departaments (
    id_departament INT AUTO_INCREMENT PRIMARY KEY,           -- Chave primária
    name_departament VARCHAR(255) NOT NULL,                   -- Nome do departamento
    departament_location_id INT NOT NULL,                     -- Localização do departamento
    departament_ramal INT NOT NULL,                           -- Ramal do departamento
    FOREIGN KEY (departament_location_id) REFERENCES locations(id_location),
    FOREIGN KEY (departament_ramal) REFERENCES ramals(ramal_number)
) ENGINE=InnoDB;

-- Tabela de Ramais
CREATE TABLE IF NOT EXISTS ramals (
    ramal_number INT AUTO_INCREMENT PRIMARY KEY,             -- Ramal
    ramal_name VARCHAR(255) NOT NULL,                         -- Nome do ramal
    ramal_location INT NOT NULL,                              -- Localização do ramal
    ramal_departament INT NOT NULL,                           -- Departamento do ramal
    FOREIGN KEY (ramal_location) REFERENCES locations(id_location),
    FOREIGN KEY (ramal_departament) REFERENCES departaments(id_departament)
) ENGINE=InnoDB;

-- Tabela de Itens de Inventário
CREATE TABLE IF NOT EXISTS inventory_items (
    id_item INT AUTO_INCREMENT PRIMARY KEY,                  -- Chave primária
    name_item VARCHAR(255) NOT NULL,                          -- Nome do item
    type_item VARCHAR(255) NOT NULL,                          -- Tipo do item
    quantity_item INT NOT NULL,                               -- Quantidade do item
    buyed_at DATETIME NOT NULL,                               -- Data de compra
    status_item VARCHAR(50) NOT NULL,                         -- Status do item
    location_item_id INT NOT NULL,                            -- Localização do item
    FOREIGN KEY (location_item_id) REFERENCES locations(id_location)
) ENGINE=InnoDB;
