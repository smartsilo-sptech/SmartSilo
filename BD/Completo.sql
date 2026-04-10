-- Criação do banco

CREATE DATABASE sistema_silos;

USE sistema_silos;

-- Criação e configuração das tabelas

CREATE TABLE Usuario (
    idUsuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(45),
    email VARCHAR(45),
    senha VARCHAR(45),
    tipoUsuario VARCHAR(45),
    dt_criacao DATE
);

ALTER TABLE Usuario AUTO_INCREMENT = 1;

CREATE TABLE Fazenda (
    idFazenda INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(45),
    cnpj CHAR(14),
    cep CHAR(8),
    tamanhoFazenda VARCHAR(45),
    fk_usuario INT
);

ALTER TABLE Fazenda AUTO_INCREMENT = 100;

ALTER TABLE Fazenda
ADD CONSTRAINT fk_usuario_fazenda
FOREIGN KEY (fk_usuario)
REFERENCES Usuario(idUsuario);

CREATE TABLE Silos (
    idSilos INT AUTO_INCREMENT PRIMARY KEY,
    nomeSilo VARCHAR(45),
    alturaTotal FLOAT,
    volumeTotal FLOAT,
    dt_cadastro DATE,
    tipo_grao VARCHAR(45),
    fk_fazenda INT
);

ALTER TABLE Silos AUTO_INCREMENT = 1000;

ALTER TABLE Silos
ADD CONSTRAINT fk_fazenda_silos
FOREIGN KEY (fk_fazenda)
REFERENCES Fazenda(idFazenda);

CREATE TABLE Registro (
    idRegistro INT,
    fk_silos INT,
    distancia_sensor FLOAT,
    percentual_ocupacao DECIMAL(5,2),
    dt_registro DATETIME,
    PRIMARY KEY (idRegistro, fk_silos)
);

ALTER TABLE Registro
ADD CONSTRAINT fk_silos_registro
FOREIGN KEY (fk_silos)
REFERENCES Silos(idSilos);

CREATE TABLE Alerta (
    idAlerta INT AUTO_INCREMENT PRIMARY KEY,
    percentual_minimo DECIMAL(5,2),
    percentual_maximo DECIMAL(5,2),
    ativo TINYINT,
    fk_registro INT,
    fk_silos INT
);

ALTER TABLE Alerta AUTO_INCREMENT = 10000;

ALTER TABLE Alerta
ADD CONSTRAINT fk_alerta_registro
FOREIGN KEY (fk_registro, fk_silos)
REFERENCES Registro(idRegistro, fk_silos);

-- Inserts 

-- Usuario
INSERT INTO Usuario (nome, email, senha, tipoUsuario, dt_criacao) VALUES
('Claudio', 'claudio@gmail.com', '123', 'admin', '2026-01-01'),
('Frizza', 'frizza@gmail.com', '321', 'user', '2026-02-01');

-- Fazenda
INSERT INTO Fazenda (nome, cnpj, cep, tamanhoFazenda, fk_usuario) VALUES
('Fazenda A', '12345678901234', '11111111', '320', 1),
('Fazenda B', '98765432109876', '22222222', '200', 2);

-- Silos
INSERT INTO Silos (nomeSilo, alturaTotal, volumeTotal, dt_cadastro, tipo_grao, fk_fazenda) VALUES
('Silo 1', 10, 500, '2024-03-01', 'Milho', 100),
('Silo 2', 12, 600, '2024-03-02', 'Soja', 101);

-- Registro
INSERT INTO Registro (idRegistro, fk_silos, distancia_sensor, percentual_ocupacao, dt_registro) VALUES
(1, 1000, 2.5, 70.00, NOW()),
(2, 1001, NULL, NULL, NOW());

-- Alerta
INSERT INTO Alerta (percentual_minimo, percentual_maximo, ativo, fk_registro, fk_silos) VALUES
(20, 80, 1, 1, 1000),
(10, 90, 1, 2, 1001);

-- Selects 

SELECT Usuario.nome AS Usuario,
Fazenda.nome AS Fazenda
FROM Usuario
JOIN Fazenda
ON Fazenda.fk_usuario = Usuario.idUsuario;

SELECT Usuario.nome AS Usuario,
Fazenda.nome AS Fazenda,
Silos.nomeSilo AS Silo
FROM Usuario
JOIN Fazenda
ON Fazenda.fk_usuario = Usuario.idUsuario
JOIN Silos
ON Silos.fk_fazenda = Fazenda.idFazenda;

SELECT Usuario.nome AS Usuario,
Silos.nomeSilo AS Silo,
Silos.tipo_grao AS Grao
FROM Usuario
JOIN Fazenda
ON Fazenda.fk_usuario = Usuario.idUsuario
JOIN Silos
ON Silos.fk_fazenda = Fazenda.idFazenda
WHERE Usuario.nome = 'Claudio';

SELECT idRegistro,
IFNULL(distancia_sensor, 'Sensor com defeito') AS Status
FROM Registro;

SELECT idRegistro,
percentual_ocupacao,
CASE
    WHEN percentual_ocupacao < 20 THEN 'Baixo'
    WHEN percentual_ocupacao BETWEEN 20 AND 80 THEN 'Normal'
    WHEN percentual_ocupacao BETWEEN 81 AND 100 THEN 'Alto'
    ELSE 'Erro'
END AS Status
FROM Registro;

SELECT Usuario.nome AS Usuario,
Fazenda.nome AS Fazenda,
Silos.nomeSilo AS Silo,
IFNULL(distancia_sensor, 'Sensor com defeito') AS Status,
Registro.percentual_ocupacao AS Ocupacao,
CASE
	WHEN percentual_ocupacao IS NULL THEN 'Sem leitura'
    WHEN Registro.percentual_ocupacao < Alerta.percentual_minimo THEN 'Abaixo'
    WHEN Registro.percentual_ocupacao > Alerta.percentual_maximo THEN 'Acima'
    ELSE 'Normal'
END AS Status
FROM Usuario
LEFT JOIN Fazenda
ON Fazenda.fk_usuario = Usuario.idUsuario
LEFT JOIN Silos
ON Silos.fk_fazenda = Fazenda.idFazenda
LEFT JOIN Registro
ON Registro.fk_silos = Silos.idSilos
LEFT JOIN Alerta
ON Alerta.fk_registro = Registro.idRegistro
AND Alerta.fk_silos = Registro.fk_silos;
