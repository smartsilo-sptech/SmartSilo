var alertas = [];

window.onload = function () {
    obterAlertas();
    atualizacaoPeriodica();
}

function obterAlertas() {

    fetch("/dashboard/alertas-recentes")
        .then(function (resposta) {

            if (resposta.ok) {

                resposta.json().then(function (resposta) {

                    console.log(
                        `Dados recebidos: ${JSON.stringify(resposta)}`
                    );

                    processarAlertas(resposta);

                });

            } else {

                console.error(
                    "Nenhum alerta encontrado ou erro na API"
                );

            }

        })

        .catch(function (erro) {

            console.error(
                `Erro ao obter alertas: ${erro.message}`
            );

        });

}

function processarAlertas(resposta) {

    alertas = [];

    for (var i = 0; i < resposta.length; i++) {

        var alertaAtual = resposta[i];

        var grauDeAviso = "";
        var classeCor = "";

        if (alertaAtual.ativo == 2) {

            grauDeAviso = "CRÍTICO";
            classeCor = "perigo";

        } else {

            grauDeAviso = "ALERTA";
            classeCor = "alerta";

        }

        alertas.push({

            nomeSilo: alertaAtual.nomeSilo,
            percentual: alertaAtual.percentual_ocupacao,
            dataHora: alertaAtual.dt_registro,
            grauDeAviso: grauDeAviso,
            classeCor: classeCor

        });
    }

    atualizarKPIs();

    exibirAlertas();
}

function atualizarKPIs() {

    var totalAlertas = alertas.length;

    var totalCriticos = 0;
    var totalModerados = 0;

    for (var i = 0; i < alertas.length; i++) {

        if (alertas[i].grauDeAviso == "CRÍTICO") {

            totalCriticos++;

        } else {

            totalModerados++;

        }

    }

    document.getElementById("kpiTotalAlertas").innerHTML =
        totalAlertas;

    document.getElementById("kpiCriticos").innerHTML =
        totalCriticos;

    document.getElementById("kpiModerados").innerHTML =
        totalModerados;

    if (alertas.length > 0) {

        document.getElementById("kpiUltimoAlerta").innerHTML =
            alertas[0].nomeSilo;

    } else {

        document.getElementById("kpiUltimoAlerta").innerHTML =
            "-";

    }
}

function exibirAlertas() {

    var listaAlertas = document.getElementById("listaAlertas");

    listaAlertas.innerHTML = "";

    for (var i = 0; i < alertas.length; i++) {

        var alertaAtual = alertas[i];

        listaAlertas.innerHTML += transformarEmCard(alertaAtual);

    }
}

function transformarEmLinha(alertaAtual) {

    return `
        <div class="linha-alerta">

            <span>${alertaAtual.nomeSilo}</span>

            <span>${alertaAtual.percentual}%</span>

            <span class="${alertaAtual.classeCor}">
                ${alertaAtual.grauDeAviso}
            </span>

            <span>
                ${new Date(alertaAtual.dataHora)
                    .toLocaleString("pt-BR")}
            </span>

        </div>
    `;
}

function atualizacaoPeriodica() {

    obterAlertas();

    setTimeout(
        atualizacaoPeriodica,
        10000
    );
}