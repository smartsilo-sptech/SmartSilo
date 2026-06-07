USE sistema_silos;

INSERT INTO dono (nome, email, senha, cpf, telefone) VALUES
('Claudio', 'claudio@sptech.school', 'senha123', '11122233344', '11912345678');

INSERT INTO empresa (idEmpresa, nome, cep, cnpj, fkDono) VALUES
(1, 'Yoki', '06753404', '12345678912345', 1);

INSERT INTO funcionario (tipoFuncionario, nome, email, senha, fkEmpresa) VALUES
('Gerente', 'Pedro Ablublé', 'senha123@sptech.school', 'senha123', 1),
('Analista', 'Maria Souza', 'maria@sptech.school', 'senha123', 1),
('Operador', 'Carlos Lima', 'carlos@sptech.school', 'senha123', 1);

INSERT INTO fazenda (nome, cep, tamanhoFazenda, fkEmpresaDona) VALUES
('Fazenda Norte', '12345678', '500 hectares', 1),
('Fazenda Sul', '87654321', '650 hectares', 1);

INSERT INTO silos (nomeSilo, volumeTotal, tipo_grao, limite_max, limite_min, fkFazenda) VALUES
('Alpha',   5000, 'Soja', 90, 80, 1),
('Bravo',   5000, 'Soja', 90, 80, 1),
('Charlie', 5000, 'Soja', 90, 80, 1),
('Delta',   5000, 'Milho', 90, 80, 1),
('Echo',    5000, 'Milho', 90, 80, 1),
('Foxtrot', 5000, 'Soja', 90, 80, 2),
('Golf',    5000, 'Soja', 90, 80, 2),
('Hotel',   5000, 'Milho', 90, 80, 2),
('India',   5000, 'Milho', 90, 80, 2),
('Juliet',  5000, 'Soja', 90, 80, 2);

INSERT INTO sensor (numSensor, fkSilo) VALUES
('Sensor1A', 1),
('Sensor2A', 2),
('Sensor3A', 3),
('Sensor4A', 4),
('Sensor5A', 5),
('Sensor6A', 6),
('Sensor7A', 7),
('Sensor8A', 8),
('Sensor9A', 9),
('Sensor10A', 10);

INSERT INTO registro (distancia_sensor, percentual_ocupacao, dt_registro, ativo, fkSensor) VALUES
(0.50, 95.0, NOW(), 2, 1),
(0.80, 88.0, NOW(), 1, 2),
(0.90, 84.0, NOW(), 1, 3),
(1.10, 77.0, NOW(), 0, 4),
(1.40, 65.0, NOW(), 0, 5),
(1.80, 58.0, NOW(), 0, 6),
(2.00, 54.0, NOW(), 0, 7),
(2.30, 47.0, NOW(), 0, 8),
(2.70, 35.0, NOW(), 1, 9),
(3.10, 18.0, NOW(), 2, 10);

INSERT INTO alerta (percentual_atingido, fkRegistro, fkSensor) VALUES
(95.0, 1, 1),
(88.0, 2, 2),
(84.0, 3, 3),
(35.0, 9, 9),
(18.0, 10, 10);


SELECT * FROM vw_ultima_leitura_silo;
SELECT * FROM vw_status_silos;
SELECT * FROM vw_ocupacao_fazenda;
SELECT * FROM vw_alertas_recentes;
SELECT * FROM vw_silos_monitoramento;