var database = require("../database/config");

function buscarResumoFazenda() {

    var instrucaoSql = `SELECT * FROM vw_ocupacao_fazenda;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMonitoramentoSilos() {

    var instrucaoSql = `SELECT * FROM vw_silos_monitoramento;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUltimaLeituraSilos() {

    var instrucaoSql = `SELECT * FROM vw_ultima_leitura_silo ORDER BY nomeSilo;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarAlertasRecentes() {

    var instrucaoSql = `SELECT * FROM vw_alertas_recentes ORDER BY dt_registro DESC;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarSiloMaisCritico() {

    var instrucaoSql = `
        SELECT
            nomeSilo,
            percentual_ocupacao
        FROM vw_ultima_leitura_silo
        ORDER BY percentual_ocupacao DESC
        LIMIT 1;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarPrevisaoEnchimento() {

    var instrucaoSql = `
        SELECT
            nomeSilo,
            percentual_ocupacao,
            ROUND((100 - percentual_ocupacao) / 2, 0) AS diasPrevisao
        FROM vw_ultima_leitura_silo
        ORDER BY percentual_ocupacao DESC
        LIMIT 1;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarResumoStatusSilos() {

    var instrucaoSql = `
        SELECT * FROM vw_resumo_status_silos;
    `;

    console.log(
        "Executando a instrução SQL: \n" +
        instrucaoSql
    );

    return database.executar(instrucaoSql);

}

module.exports = {
    buscarResumoFazenda,
    buscarMonitoramentoSilos,
    buscarUltimaLeituraSilos,
    buscarAlertasRecentes,
    buscarSiloMaisCritico,
    buscarPrevisaoEnchimento,
    buscarResumoStatusSilos
}