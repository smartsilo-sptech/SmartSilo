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

        document.getElementById("kpiSiloCritico").innerHTML =
        `${dados[0].nomeSilo} (${dados[0].percentual_ocupacao}%)`;

    });

}

function carregarPrevisao() {

    fetch("/dashboard/previsao-enchimento")
    .then(res => res.json())
    .then(dados => {

        document.getElementById("kpiPrevisao").innerHTML =
        `${dados[0].diasPrevisao} dias`;

    });

}

function carregarGraficoBarras() {

    fetch("/dashboard/monitoramento-silos")
    .then(res => res.json())
    .then(dados => {

        const info = dados[0];

        if(graficoBarras) {
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

                            "#c1121f",
                            "#fcbf49",
                            "#2a9d8f",
                            "#adb5bd"

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

                                precision: 0

                            }

                        }

                    }

                }

            }

        );

    });

    fetch("/dashboard/ultima-leitura")
    .then(res => res.json())
    .then(dados => {

        renderizarGridSilos(dados);

    });

}

function renderizarGridSilos(dados) {

    const container =
    document.getElementById("gridSilos");

    container.innerHTML = "";

    for(let i = 0; i < dados.length; i++) {

        let classe = "box-silo-green";
        let interna = "internal-box-green";
        let status = "Normal";

        if(dados[i].percentual_ocupacao >= 90) {

            classe = "box-silo-red";
            interna = "internal-box-red";
            status = "Crítico";

        } else if(dados[i].percentual_ocupacao >= 80) {

            classe = "box-silo-yellow";
            interna = "internal-box-yellow";
            status = "Alerta";
        }

        container.innerHTML += `

            <div class="${classe}">

                <div class="${interna}">

                    <span class="title-box">

                        ${dados[i].nomeSilo}

                        (${dados[i].percentual_ocupacao}%)

                        - ${status}

                    </span>

                </div>

            </div>

        `;
    }
}

function carregarRecomendacoes() {

    fetch("/dashboard/silo-mais-critico")
    .then(res => res.json())
    .then(dados => {

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