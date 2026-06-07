document.getElementById('div_username').innerHTML = sessionStorage.NOME_USUARIO;
document.getElementById('div_bemVindo').innerHTML =
    `Bem vindo(a) ${sessionStorage.NOME_USUARIO}!`;

let graficoBarras;
let graficoLinhas;

window.onload = function () {
    carregarKPIs();
    carregarGraficoBarras();
    carregarGraficoLinhas();
    carregarGridSilos();
};

function carregarKPIs() {

    fetch("/dashboard/resumo-fazenda")
        .then(res => res.json())
        .then(dados => {

            document.querySelector(".data-kpi-qtdsilos").innerHTML =
                dados[0].totalSilos;

        });

    fetch("/dashboard/monitoramento")
        .then(res => res.json())
        .then(dados => {

            const alertas =
                Number(dados[0].silosCriticos) +
                Number(dados[0].silosAlerta);

            document.querySelector(".data-kpi-alertas").innerHTML =
                alertas;

            let status = "IDEAL";

            if (dados[0].silosCriticos > 0) {
                status = "CRÍTICO";
            } else if (dados[0].silosAlerta > 0) {
                status = "ALERTA";
            }

            document.querySelector(".data-kpi-status").innerHTML =
                status;
        });
}

function carregarGraficoBarras() {

    fetch("/dashboard/ultima-leitura")
        .then(res => res.json())
        .then(dados => {

            let labels = [];
            let valores = [];
            let cores = [];

            for (let i = 0; i < dados.length; i++) {

                labels.push(dados[i].nomeSilo);
                valores.push(dados[i].percentual_ocupacao);

                const ocupacao = dados[i].percentual_ocupacao;

                if (ocupacao >= 90) {
                    cores.push("#AB0F0F");
                } else if (ocupacao >= 80) {
                    cores.push("#FFCD04");
                } else {
                    cores.push("#0eac50");
                }
            }

            graficoBarras = new Chart(
                document.getElementById("barras_tempo_real"),
                {
                    type: "bar",
                    data: {
                        labels,
                        datasets: [{
                            label: "Ocupação (%)",
                            data: valores,
                            backgroundColor: cores
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                display: false
                            }
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                max: 100
                            }
                        }
                    }
                }
            );
        });
}

function carregarGraficoLinhas() {

    fetch("/dashboard/ultima-leitura")
        .then(res => res.json())
        .then(dados => {

            const labels = [];

            for (let i = 0; i < dados.length; i++) {
                labels.push(dados[i].nomeSilo);
            }

            graficoLinhas = new Chart(
                document.getElementById("linhas_alerta"),
                {
                    type: "line",
                    data: {
                        labels: labels,
                        datasets: [{
                            label: "Ocupação Atual (%)",
                            data: dados.map(item => item.percentual_ocupacao),
                            borderColor: "#0eac50",
                            backgroundColor: "#0eac50",
                            tension: 0.3
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                beginAtZero: true,
                                max: 100
                            }
                        }
                    }
                }
            );
        });
}

function carregarGridSilos() {

    fetch("/dashboard/ultima-leitura")
        .then(res => res.json())
        .then(dados => {

            const container =
                document.querySelector(".silos");

            container.innerHTML = "";

            for (let i = 0; i < dados.length; i++) {

                const silo = dados[i];

                let status = "Normal";
                let classeExterna = "box-silo-green";
                let classeInterna = "internal-box-green";

                if (silo.percentual_ocupacao >= 90) {

                    status = "Crítico";
                    classeExterna = "box-silo-red";
                    classeInterna = "internal-box-red";

                } else if (silo.percentual_ocupacao >= 80) {

                    status = "Alerta";
                    classeExterna = "box-silo-yellow";
                    classeInterna = "internal-box-yellow";
                }

                container.innerHTML += `
                    <div class="${classeExterna}">
                        <div class="${classeInterna}">
                            <span class="title-box">
                                ${silo.nomeSilo}: ${status}
                            </span>
                        </div>
                    </div>
                `;
            }
        });
}