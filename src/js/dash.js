var tempoReal = new Chart(document.getElementById('barras_tempo_real').getContext('2d'), {
    type: 'bar',
    data: {
    labels: ['Silo 1', 'Silo 2', 'Silo 3', 'Silo 4', 'Silo 5', 'Silo 6', 'Silo 7', 'Silo 8', 'Silo 9', 'Silo 10'],
    datasets: [{
        label: 'Ocupação dos Silos em Tempo Real',
        data: [99, 12, 89, 3, 56, 91, 93, 65, 40, 8],
        backgroundColor: function(context) {
            var valor = context.dataset.data[context.dataIndex];
            if (valor >= 95) {
                return '#AB0F0F';
            } else if (valor >= 90) {
                return '#FFCD04';
            } else {
                return '#0eac50';
            }
        }
    }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Silos'
                },
                beginAtZero: true,
            },
            y: {
                title: {
                    display: true,
                    text: 'Porcentagem de Ocupação'
                },
                beginAtZero: true
            }
        }
    }
});

var alertaCritico = new Chart(document.getElementById('linhas_alerta').getContext('2d'), {
    type: 'line',
    data: {
    labels: ['11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
    datasets: [{
        label: 'Silo 1',
        data: [7, 23, 45, 62, 81, 99, 99],
        backgroundColor: ['#ff0404'],
        borderColor: ['#ff0404']
    }, {
        label: 'Silo 2',
        data: [3, 18, 34, 56, 77, 90, 91],
        backgroundColor: ['#189D50'],
        borderColor: ['#189D50']
    }, {
        label: 'Silo 3',
        data: [12, 29, 41, 68, 84, 100, 93],
        backgroundColor: ['#189D50'],
        borderColor: ['#189D50']
    }, {
        label: 'Silo 4',
        data: [3, 17, 28, 46, 72, 89, 93],
        backgroundColor: ['#189D50'],
        borderColor: ['#189D50']
    }, {
        label: 'Silo 5',
        data: [6, 14, 35, 51, 68, 94, 93],
        backgroundColor: ['#189D50'],
        borderColor: ['#189D50']
    }, {
        label: 'Silo 6',
        data: [1, 22, 39, 57, 75, 97, 93],
        backgroundColor: ['#FFCD04'],
        borderColor: ['#FFCD04']
    }, {
        label: 'Silo 7',
        data: [9, 26, 44, 63, 81, 100, 93],
        backgroundColor: ['#FFCD04'],
        borderColor: ['#FFCD04']
    }, {
        label: 'Silo 8',
        data: [5, 19, 31, 54, 77, 92, 93],
        backgroundColor: ['#189D50'],
        borderColor: ['#189D50']
    }, {
        label: 'Silo 9',
        data: [2, 24, 38, 59, 83, 96, 93],
        backgroundColor: ['#189D50'],
        borderColor: ['#189D50']
    }, {
        label: 'Silo 10',
        data: [8, 21, 47, 66, 79, 90, 93],
        backgroundColor: ['#189D50'],
        borderColor: ['#189D50']
    }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'Porcentagem de Ocupação'
                },
                beginAtZero: true
            },
            x: {
                title: {
                    display: true,
                    text: 'Horas'
                },
                beginAtZero: false
            }
        }
    }
});

if (false) {
    var paginacao = {};
    var tempo = {};
    
    function obterDados(grafico, endpoint) {
        fetch('http://localhost:3300/sensores/' + endpoint)
            .then(response => response.json())
            .then(valores => {
                if (paginacao[endpoint] == null) {
                    paginacao[endpoint] = 0;
                }
                if (tempo[endpoint] == null) {
                    tempo[endpoint] = 0;
                }
                var ultimaPaginacao = paginacao[endpoint];
                paginacao[endpoint] = valores.length;
                valores = valores.slice(ultimaPaginacao);
                valores.forEach((valor) => {
                    if (grafico.data.labels.length == 10 && grafico.data.datasets[0].data.length == 10) {
                        grafico.data.labels.shift();
                        grafico.data.datasets[0].data.shift();
                    }
                    grafico.data.labels.push(tempo[endpoint]++);
                    grafico.data.datasets[0].data.push(parseFloat(valor));
                    grafico.update();
                });
            })
            .catch(error => console.error('Erro ao obter dados:', error));
    }
    
    function obterDadosAlerta(grafico) {
        fetch('http://localhost:3300/sensores/digital')
            .then(response => response.json())
            .then(percentuais => {
                fetch('http://localhost:3300/sensores/status')
                    .then(response => response.json())
                    .then(statusValues => {
                        if (paginacao['alerta'] == null) {
                            paginacao['alerta'] = 0;
                        }
                        if (tempo['alerta'] == null) {
                            tempo['alerta'] = 0;
                        }
                        var ultimaPaginacao = paginacao['alerta'];
                        paginacao['alerta'] = percentuais.length;
                        var i = ultimaPaginacao;
                        while (i < percentuais.length) {
                            var percentual = percentuais[i];
                            var status = statusValues[i];
                            i++;
                            tempo['alerta']++;
                            if (status == 0) {
                                continue;
                            }
                            if (grafico.data.labels.length == 10 && grafico.data.datasets[0].data.length == 10) {
                                grafico.data.labels.shift();
                                grafico.data.datasets[0].data.shift();
                            }
                            grafico.data.labels.push(tempo['alerta']);
                            grafico.data.datasets[0].data.push(parseFloat(percentual));
                            if (status == 2) {
                                grafico.data.datasets[0].borderColor = '#AB0F0F';
                            } else {
                                grafico.data.datasets[0].borderColor = '#FFCD04';
                            }
                            grafico.update();
                        }
                    });
            })
            .catch(error => console.error('Erro ao obter dados:', error));
    }
    
    setInterval(() => {
        obterDados(tempoReal, 'digital');
        obterDadosAlerta(alertaCritico);
    }, 2000);
}