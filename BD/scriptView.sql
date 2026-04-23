USE sistema_silos;

SELECT * FROM dono;

SELECT * FROM empresa;

SELECT * FROM funcionario;

SELECT * FROM fazenda;

SELECT * FROM silos;

SELECT * FROM sensor;

SELECT * FROM registro;

SELECT * FROM alerta;

SELECT nomeSilo, percentual_ocupacao, dt_registro, ativo, distancia_sensor 
FROM registro AS r
LEFT JOIN sensor 
ON r.fkSensor = sensor.idSensor
LEFT JOIN silos
ON sensor.fkSilo = silos.idSilos;

SELECT nomeSilo, r.*
FROM registro AS r
LEFT JOIN sensor 
ON r.fkSensor = sensor.idSensor
LEFT JOIN silos
ON sensor.fkSilo = silos.idSilos;