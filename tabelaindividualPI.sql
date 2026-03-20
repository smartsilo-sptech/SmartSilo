CREATE DATABASE tabela_pi;
USE tabela_pi;


-- função: coletar quem tem acesso ao sistema -- 
CREATE TABLE usuario (
idUsuario INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(100) NOT NULL,
email VARCHAR(100) NOT NULL,
tipoUsuario VARCHAR(40),
CONSTRAINT chkTipoUsuario CHECK (tipoUsuario IN ('administrador','usuario')),
dtCadastro DATE
);

INSERT INTO usuario VALUES
(default, 'Maria', 'maria@smartsilo.com', 'administrador', '2026-03-09'),
(default, 'Patricia', 'patriciasilva@smartsilo.com', 'usuario','2026-01-01'),
(default, 'Livia', 'livia@smartsilo.com', 'usuario','2026-06-01'),
(default, 'Marta', 'martasantos@smartsilo.com', 'usuario','2026-07-11'),
(default, 'Lavinia', 'lavinia@smartsilo.com', 'administrador','2026-01-01');

SELECT * FROM usuario;

-- Função: guarda informações dos silos cadastrados --
CREATE TABLE silosCadastro (
idSilo INT PRIMARY KEY AUTO_INCREMENT,
nomeSilo VARCHAR(50) NOT NULL,
altura INT,
capacidadeTotal INT,
capacidadeMin INT,
capacidadeMax INT
);

INSERT INTO silosCadastro VALUES
(default, 'Silo Milho Moreiras', 10, 60, 15, 50),
(default, 'Silo Arroz Moreiras', 15, 55, 15, 50),
(default, 'Silo Milho Silva', 8, 50, 15, 50),
(default, 'Silo Arroz Faccin', 10, 45, 15, 40);

SELECT * FROM silosCadastro;

-- registra os dados que foram coletados relacionados ao nível dos grãos -- 
CREATE TABLE medicao (
idMedicao INT PRIMARY KEY AUTO_INCREMENT,
nivelGraos INT,
porcentagemOcupacao INT,
dtMedicao DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO medicao (nivelGraos, porcentagemOcupacao) VALUES
(8, 80),
(6, 60),
(7, 70),
(5, 50),
(9, 90);

SELECT * FROM medicao;
