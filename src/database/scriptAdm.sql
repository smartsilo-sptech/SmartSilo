CREATE DATABASE sistema_silos;

USE sistema_silos;

CREATE TABLE dono (
idDono INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45) NOT NULL,
email VARCHAR(45) NOT NULL,
senha VARCHAR(45) NOT NULL,
dt_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
cpf CHAR(11) NOT NULL,
telefone CHAR(11)
);

INSERT INTO dono (nome, email, senha, CPF, telefone) VALUES
('Claudio', 'claudio@sptech.school', 'senha123', 11122233344, 11912345678);

SELECT * FROM dono;

CREATE TABLE empresa (
idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45) NOT NULL,
cep CHAR(8) NOT NULL,
telefone CHAR(11),
cnpj CHAR(14) NOT NULL,
fkDono INT,
CONSTRAINT fk_dono_const FOREIGN KEY (fkDono) REFERENCES dono(idDono)
);

INSERT INTO empresa (nome, cep, cnpj, fkDono) VALUES
('Yoki', '06753404', '12345678912345', 1);

SELECT * FROM empresa;

CREATE TABLE funcionario (
idFuncionario INT PRIMARY KEY AUTO_INCREMENT,
tipoFuncionario VARCHAR(45) NOT NULL,
nome VARCHAR(45) NOT NULL,
email VARCHAR(45) NOT NULL,
senha VARCHAR(45) NOT NULL,
dt_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
fkEmpresa INT,
CONSTRAINT fk_empresa_const FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa)
);

INSERT INTO funcionario (tipoFuncionario, nome, email, senha, fkEmpresa) VALUES
('Gerente', 'Pedro Ablublé', 'pedro@sptech.school', 'senha123', 1);

SELECT * FROM funcionario;

CREATE TABLE fazenda (
idFazenda INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45) NOT NULL,
cep CHAR(8) NOT NULL,
tamanhoFazenda VARCHAR(45),
fkEmpresaDona INT,
CONSTRAINT fk_empresadona_const FOREIGN KEY (fkEmpresaDona) REFERENCES empresa(idEmpresa)
);

INSERT INTO fazenda (nome, cep, fkEmpresaDona) VALUES
('Abelinha', '12345678', 1);

SELECT * FROM fazenda;

CREATE TABLE silos (
idSilos INT PRIMARY KEY AUTO_INCREMENT,
nomeSilo VARCHAR(45) NOT NULL,
volumeTotal FLOAT,
dt_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
tipo_grao VARCHAR(45),
localSilo VARCHAR(45),
limite_max DECIMAL(3,1),
limite_min DECIMAL(3,1),
fkFazenda INT,
CONSTRAINT fk_fazenda_const FOREIGN KEY (fkFazenda) REFERENCES fazenda(idFazenda)
);

INSERT INTO silos (nomeSilo, fkFazenda) VALUES
('Alpha', 1);

SELECT * FROM silos;

CREATE TABLE sensor (
idSensor INT PRIMARY KEY AUTO_INCREMENT,
numSensor VARCHAR(45) NOT NULL,
fkSilo INT,
CONSTRAINT fk_silo_const FOREIGN KEY (fkSilo) REFERENCES silos(idSilos)
);

SELECT * FROM sensor;

CREATE TABLE registro (
idRegistro INT AUTO_INCREMENT,
distancia_sensor FLOAT,
percentual_ocupacao DECIMAL (3,1),
dt_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
ativo TINYINT,
fkSensor INT,
PRIMARY KEY (idRegistro, fkSensor),
CONSTRAINT fk_sensor_const FOREIGN KEY (fkSensor) REFERENCES sensor(idSensor)
);

SELECT * FROM registro;
TRUNCATE registro;


CREATE TABLE alerta (
idAlerta INT AUTO_INCREMENT,
percentual_atingido DECIMAL(3,1) NOT NULL,
dt_ocorrencia DATETIME DEFAULT CURRENT_TIMESTAMP,
fkRegistro INT,
fkSensor INT,
PRIMARY KEY (idAlerta, fkRegistro, fkSensor),
CONSTRAINT fk_sensorAlerta_const FOREIGN KEY (fkSensor) REFERENCES sensor(idSensor),
CONSTRAINT fk_registroAlerta_const FOREIGN KEY (fkRegistro) REFERENCES registro(idRegistro)
);

SELECT * FROM alerta;

SHOW DATABASES;
