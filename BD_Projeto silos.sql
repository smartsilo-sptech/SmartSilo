/*Grupo 3 
 Ana Carolina RA: 01261104;
 Gabriel Ortiz RA: 01261144;
 Giovanna Esteves RA: 01261068;
 Jefferson Watabe RA: 01261036;
 Livia Faccin RA: 01261118;
 Matheus Lopes RA: 01261099;
 Nicolás Wleklinski RA: 01261061;
*/

CREATE DATABASE db_smarthSilo;
USE db_smarthSilo;
CREATE TABLE users(
id INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(255) NOT NULL UNIQUE,
email VARCHAR(255) NOT NULL UNIQUE,
senha VARCHAR(255) NOT NULL
);
alter table users add constraint chkemail check (email like '%@%');
insert into users (nome,email,senha)values
('Gerson Almeida','Gerson.almeida@gmail.com','lili26'),
('Lucas Rangel','Lucas.rangel@gmail.com','leite123'),
('Carina Ferreira','Carina.ferreira@hotmail.com','fazenda432'),
('Reginaldo Andrade','Regis.andrade@hotmail.com','gaviao091'),
('Fabiana Oliveira','fabi.oliveira@hotmail.com','farm#454');
select * from users;

CREATE TABLE fazenda(
id INT PRIMARY KEY AUTO_INCREMENT,
cnpj VARCHAR(50) NOT NULL,
nome VARCHAR(255) NOT NULL,
endereco_cep VARCHAR(255) NOT NULL,
tamanho VARCHAR(255) NOT NULL
);
insert into fazenda(cnpj,nome,endereco_cep,tamanho) values
(52654856214598,'Fazenda Valinhos',	'56894052','500.000 m^2'),
(25548596542568	,'Fazenda Somelia','85478555','600.000m^2'),
(89654859657965,'Fazenda Valinhos',	'85475282',	'700.000m^2'),
(12548596857458,'Moreiras','24878961','550.000m^2'),
(85965265859654,'Laranja`s' ,'24878861','800.000m^2');
alter table fazenda modify endereco_cep int;
alter table fazenda rename column endereco_cep to CEP;

CREATE TABLE silos(
id INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(255) NOT NULL,
diametro FLOAT NOT NULL,
altura FLOAT NOT NULL,
perimetro FLOAT NOT NULL,
tipo_de_grao VARCHAR(255) NOT NULL,
nome_fazenda varchar(225)
);
alter table silos add constraint chknumeros check (diametro > 0 and altura > 0 and perimetro > 0);
insert into silos(nome, diametro, altura, perimetro, tipo_de_grao,nome_fazenda) values
('Silo Milho', 15,20,62.83,'milho','Fazenda Somelia'),
('Silo Ervilhas',5,10,31.4,'ervilha', 'Laranja`s' ),
('Silo Trigo',20,25,78.5,'trigo','Fazenda Valinhos'),
('Silo Milho',8,16,50.24,'milho','Fazenda Valinhos'),
('Silo Arroz',7,14,43.96,'arroz','Moreiras');
select * from silos;

CREATE TABLE silosRegistros(
id INT PRIMARY KEY AUTO_INCREMENT,
data_hora DATETIME NOT NULL,
volume FLOAT NOT NULL,
dt_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
valor_max int,
valor_min int
);
alter table silosRegistros add constraint chkvolume check (volume > 0);
insert into SilosRegistros(data_hora,volume,dt_registro,valor_max,valor_min) values
('2026-02-02 14:05:13',	4712,	'2023-05-23',	20	,80),
('2026-02-02 14:05:13',	393.7,	'2024-10-02',	15	,85),
('2026-02-02 14:05:13',	9818,	'2025-01-12',	10	,80),
('2026-02-02 14:05:13',	1609,	'2022-09-19',	15	,50),
('2026-02-02 14:05:13',	1078,	'2024-02-02',	10	,80);
select * from users;

