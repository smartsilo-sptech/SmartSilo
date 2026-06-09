const serialport = require("serialport");
const express = require("express");
const mysql = require("mysql2");

const SERIAL_BAUD_RATE = 9600;
const SERVIDOR_PORTA = 3300;

const HABILITAR_OPERACAO_INSERIR = true;

// CONFIG DO SILO
const config = {
  alturaCilindro: 0.156,
  alturaCone: 0.0568,
  raioSilo: 0.0426,
  pi: 3.14,
  percentualLimite: 85.0,
  percentualAlerta: 75.0,
};

function calcularSilo(distancia) {
  const areaCirculo = config.raioSilo * config.raioSilo * config.pi;

  const volumeCilindro = areaCirculo * config.alturaCilindro;

  const volumeCone = (1 / 3) * areaCirculo * config.alturaCone;

  const volumeTotal = volumeCilindro + volumeCone;

  let volumeGraos = 0;

  if (distancia >= config.alturaCilindro) {
    let alturaGraosCone = config.alturaCilindro + config.alturaCone - distancia;

    if (alturaGraosCone < 0) alturaGraosCone = 0;

    volumeGraos = (1 / 3) * areaCirculo * alturaGraosCone;
  } else {
    let alturaGraosCilindro = config.alturaCilindro - distancia;

    if (alturaGraosCilindro < 0) alturaGraosCilindro = 0;

    volumeGraos = volumeCone + alturaGraosCilindro * areaCirculo;
  }

  const percentual = (volumeGraos / volumeTotal) * 100;

  return {
    distancia,
    percentual
  };
}

const serial = async (valoresDistancia, valoresPercentual) => {
  const poolBancoDados = mysql
    .createPool({
      host: "10.18.32.44",
      user: "administrador",
      password: "Urubu@100",
      database: "sistema_silos",
      port: 3307,
    })
    .promise();

  const portas = await serialport.SerialPort.list();

  const portaArduino = portas.find(
    (porta) => porta.vendorId == 2341 && porta.productId == 43,
  );

  if (!portaArduino) {
    throw new Error("Arduino não encontrado");
  }

  const arduino = new serialport.SerialPort({
    path: portaArduino.path,
    baudRate: SERIAL_BAUD_RATE,
  });

  arduino.on("open", () => {
    console.log(`Leitura iniciada em ${portaArduino.path}`);
  });

  arduino
    .pipe(
      new serialport.ReadlineParser({
        delimiter: "\r\n",
      }),
    )
    .on("data", async (data) => {
      try {
        console.log("Recebido:", data);

        const distancia = parseFloat(data);

        if (isNaN(distancia)) {
          console.log("Valor inválido");
          return;
        }

        const resultado = calcularSilo(distancia);

        valoresDistancia.push(resultado.distancia);

        valoresPercentual.push(resultado.percentual);

        if (valoresDistancia.length > 100) {
          valoresDistancia.shift();
        }

        if (valoresPercentual.length > 100) {
          valoresPercentual.shift();
        }

        if (HABILITAR_OPERACAO_INSERIR) {
          await poolBancoDados.execute(
            `
                        INSERT INTO registro
                        (
                            distancia_sensor,
                            percentual_ocupacao,
                            fkSensor
                        )
                        VALUES
                        (?, ?, 1)
                        `,
            [resultado.distancia, resultado.percentual],
          );

          console.log(
            `Inserido -> Distância: ${resultado.distancia} | Percentual: ${resultado.percentual.toFixed(2)}%`,
          );
        }
      } catch (erro) {
        console.error("Erro ao inserir:", erro);
      }
    });

  arduino.on("error", (erro) => {
    console.error("Erro serial:", erro);
  });
};

const servidor = (valoresDistancia, valoresPercentual) => {
  const app = express();

  app.use((request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*");

    response.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept",
    );

    next();
  });

  app.get("/sensores/analogico", (_, response) => {
    response.json(valoresDistancia);
  });

  app.get("/sensores/digital", (_, response) => {
    response.json(valoresPercentual);
  });

  app.listen(SERVIDOR_PORTA, () => {
    console.log(`Servidor rodando na porta ${SERVIDOR_PORTA}`);
  });
};

(async () => {
  const valoresDistancia = [];
  const valoresPercentual = [];

  await serial(valoresDistancia, valoresPercentual);

  servidor(valoresDistancia, valoresPercentual);
})();
