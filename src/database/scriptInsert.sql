USE sistema_silos;

INSERT INTO dono (nome, email, senha, CPF, telefone) VALUES
('Claudio', 'claudio@sptech.school', 'senha123', 11122233344, 11912345678);

INSERT INTO empresa (nome, cep, cnpj, fkDono) VALUES
('Yoki', '06753404', '12345678912345', 1);

INSERT INTO funcionario (tipoFuncionario, nome, email, senha, fkEmpresa) VALUES
('Gerente', 'Pedro Ablublé', 'pedro@sptech.school', 'senha123', 1);

INSERT INTO fazenda (nome, cep, fkEmpresaDona) VALUES
('Abelinha', '12345678', 1);

INSERT INTO silos (nomeSilo, fkFazenda) VALUES
('Alpha', 1);

INSERT INTO sensor (numSensor, fkSilo) VALUES
('Sensor1A', 1);

INSERT INTO registro (distancia_sensor, percentual_ocupacao, ativo, fkSensor) VALUES 
(2.1, 89.9, 2, 1);