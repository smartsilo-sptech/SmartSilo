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

SELECT
    nomeSilo AS Silo,
    percentual_ocupacao AS 'Ocupação(%)',
    dt_registro AS 'Data/Hora',
    CASE
        WHEN ativo = 2 THEN 'Crítico'
        WHEN ativo = 1 THEN 'Alerta'
        ELSE 'Ideal'
    END AS 'Status'
FROM silos
JOIN sensor
ON idSilos = fkSilo
JOIN registro
ON idSensor = fkSensor;


-- VIEWS PARA DASHBOARD

CREATE VIEW vw_ultima_leitura_silo AS
SELECT
    s.idSilos,
    s.nomeSilo,
    r.percentual_ocupacao,
    r.dt_registro,
FROM silos s
JOIN sensor se
    ON s.idSilos = se.fkSilo
JOIN registro r
    ON se.idSensor = r.fkSensor
WHERE r.idRegistro IN (
    SELECT MAX(idRegistro)
    FROM registro
    GROUP BY fkSensor
);


CREATE VIEW vw_status_silos AS
SELECT
    CASE
        WHEN percentual_ocupacao >= 90 THEN 'Cheio'
        WHEN percentual_ocupacao >= 80 THEN 'Quase Cheio'
        ELSE 'Normal'
    END AS statusSilo,
    COUNT(*) AS quantidade
FROM vw_ultima_leitura_silo
GROUP BY statusSilo;


CREATE VIEW vw_ocupacao_fazenda AS
SELECT
    ROUND(AVG(percentual_ocupacao),1) AS ocupacaoMedia,
    COUNT(*) AS totalSilos
FROM vw_ultima_leitura_silo;


CREATE VIEW vw_alertas_recentes AS
SELECT
    nomeSilo,
    percentual_ocupacao,
    dt_registro,
FROM registro r
JOIN sensor se
    ON r.fkSensor = se.idSensor
JOIN silos s
    ON se.fkSilo = s.idSilos
WHERE percentual_ocupacao >= 80
ORDER BY dt_registro DESC;


CREATE VIEW vw_silos_monitoramento AS
SELECT
    COUNT(*) AS totalSilos,
    SUM(
        CASE
            WHEN percentual_ocupacao >= 90
            THEN 1
            ELSE 0
        END
    ) AS silosCheios,
    SUM(
        CASE
            WHEN percentual_ocupacao >= 80
             AND percentual_ocupacao < 90
            THEN 1
            ELSE 0
        END
    ) AS silosQuaseCheios
FROM vw_ultima_leitura_silo;