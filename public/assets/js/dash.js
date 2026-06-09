document.getElementById("div_username").innerHTML =
sessionStorage.NOME_USUARIO.toUpperCase();

document.getElementById("div_bemVindo").innerHTML =
`Bem vindo(a) ${sessionStorage.NOME_USUARIO}!`;

let graficoBarras;

function carregarResumo() {

    fetch("/dashboard/resumo-fazenda")
    .then(res => res.json())
    .then(dados => {

        document.getElementById("kpiOcupacaoMedia").innerHTML =
        `${dados[0].ocupacaoMedia}%`;

    });

    fetch("/dashboard/monitoramento-silos")
    .then(res => res.json())
    .then(dados => {

        document.getElementById("kpiTotalSilos").innerHTML =
        dados[0].totalSilos;

    });

    fetch("/dashboard/resumo-status-silos")
    .then(res => res.json())
    .then(dados => {

        document.getElementById("kpiAlertas").innerHTML =
        Number(dados[0].silosCheios)
        +
        Number(dados[0].silosQuaseCheios);

    });

}

function carregarSiloCritico() {

    fetch("/dashboard/silo-mais-critico")
    .then(res => res.json())
    .then(dados => {

        if (dados.length > 0) {

            document.getElementById("kpiSiloCritico").innerHTML =
            `${dados[0].nomeSilo} (${dados[0].percentual_ocupacao}%)`;

        }

    });

}

function carregarPrevisao() {

    fetch("/dashboard/previsao-enchimento")
    .then(res => res.json())
    .then(dados => {

        if (dados.length > 0) {

            document.getElementById("kpiPrevisao").innerHTML =
            `${dados[0].diasPrevisao} dias`;

        }

    });

}

function carregarGraficoBarras() {

    fetch("/dashboard/resumo-status-silos")

    .then(res => res.json())

    .then(dados => {

        console.log("Resumo Status:", dados);

        const info = dados[0];

        if (graficoBarras) {

            graficoBarras.destroy();

        }

        graficoBarras = new Chart(

            document.getElementById("barras_tempo_real"),

            {

                type: "bar",

                data: {

                    labels: [

                        "Cheios",
                        "Quase Cheios",
                        "Normais",
                        "Vazios"

                    ],

                    datasets: [{

                        label: "Quantidade de Silos",

                        data: [

                            Number(info.silosCheios),
                            Number(info.silosQuaseCheios),
                            Number(info.silosNormais),
                            Number(info.silosVazios)

                        ],

                        backgroundColor: [

                            "#AB0F0F",
                            "#FFCD04",
                            "#0EAC50",
                            "#BDBDBD"

                        ]

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

                            ticks: {

                                stepSize: 1

                            }

                        }

                    }

                }

            }

        );

    })

    .catch(erro => {

        console.error(
            "Erro gráfico:",
            erro
        );

    });

}

function carregarRecomendacoes() {

    fetch("/dashboard/silo-mais-critico")

    .then(res => res.json())

    .then(dados => {

        if (dados.length === 0) return;

        const silo = dados[0];

        document.getElementById(
            "acoesContainer"
        ).innerHTML = `

            <div class="card-recomendacao critico">

                <strong>
                    ${silo.nomeSilo}
                </strong>

                atingiu

                <strong>
                    ${silo.percentual_ocupacao}%
                </strong>

            </div>

            <div class="card-recomendacao">
                Planejar escoamento da carga
            </div>

            <div class="card-recomendacao">
                Verificar disponibilidade do próximo silo
            </div>

            <div class="card-recomendacao">
                Avaliar comercialização do lote
            </div>

        `;

    });

}

carregarResumo();
carregarSiloCritico();
carregarPrevisao();
carregarGraficoBarras();
carregarRecomendacoes();