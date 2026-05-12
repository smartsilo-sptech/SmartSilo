// Código novo só retornando a distância
float tempo;
float distancia;

int trig = 9;
int echo = 10;

void setup() {
  Serial.begin(9600);
  pinMode(trig, OUTPUT);
  pinMode(echo, INPUT);
}

void loop() {
  digitalWrite(trig, LOW);
  delayMicroseconds(2);
  digitalWrite(trig, HIGH);
  delayMicroseconds(10);
  digitalWrite(trig, LOW);

  tempo = pulseIn(echo, HIGH);
  distancia = ((tempo / 2.0) * 0.0343) / 100.0;

  Serial.println(distancia);

  delay(2000);
}

/*
-- Código antigo:

float tempo;
float distancia = 0;

int trig = 9;
int echo = 10;

//float alturaCilindro = 11.0;
//float alturaCone = 4.0;
//float raioSilo = 3.0;
//float pi = 3.14;

//float percentualLimite = 95.0;
//float percentualAlerta = 90.0;
//float percentualMinimo = 10.0;

float alturaCilindro = 0.156;
float alturaCone = 0.0568;
float raioSilo = 0.0426;
float pi = 3.14;

float percentualLimite = 85.0;
float percentualAlerta = 75.0;
float percentualMinimo = 10.0;

float areaCirculo;
float volumeCilindro;
float volumeCone;
float volumeTotal;
float volumeGraos = 0;

void setup() {
  Serial.begin(9600);
  
  pinMode(trig, OUTPUT);
  pinMode(echo, INPUT);
  
  areaCirculo = (raioSilo * raioSilo) * pi;
  volumeCilindro = areaCirculo * alturaCilindro;
  volumeCone = (1.0 / 3.0) * areaCirculo * alturaCone;
  volumeTotal = volumeCilindro + volumeCone;
}

void loop() {
  
// Disparo do sensor
digitalWrite(trig, LOW);
delayMicroseconds(2);

digitalWrite(trig, HIGH);
delayMicroseconds(10);

digitalWrite(trig, LOW);

tempo = pulseIn(echo, HIGH);

distancia = ((tempo / 2.0) * 0.0343) / 100.0;

if (distancia >= alturaCilindro) {
  
float alturaGraosCone = (alturaCilindro + alturaCone) - distancia;

if (alturaGraosCone < 0) alturaGraosCone = 0;

volumeGraos = (1.0 / 3.0) * areaCirculo * alturaGraosCone;

} else {
  
float alturaGraosCilindro = alturaCilindro - distancia;

if (alturaGraosCilindro < 0) alturaGraosCilindro = 0;

volumeGraos = volumeCone + (alturaGraosCilindro * areaCirculo);
}

float percentual = (volumeGraos / volumeTotal) * 100.0;

Serial.print(distancia);
Serial.print(';');
Serial.print(percentual);
Serial.print(';');

if (percentual >= percentualLimite) {
  Serial.print(2);
}
else if (percentual >= percentualAlerta) {
  Serial.print(1);
}
else {
  Serial.print(0);
}

Serial.println(";");

delay(2000);
}


-- Os mesmos cálculos só que prontos pra por na API:

const config = {
  alturaCilindro: 0.156,
  alturaCone: 0.0568,
  raioSilo: 0.0426,
  pi: 3.14,
  percentualLimite: 85.0,
  percentualAlerta: 75.0,
  percentualMinimo: 10.0,
}

function calcularSilo(distancia) {
  const areaCirculo = (config.raioSilo * config.raioSilo) * config.pi
  const volumeCilindro = areaCirculo * config.alturaCilindro
  const volumeCone = (1.0 / 3.0) * areaCirculo * config.alturaCone
  const volumeTotal = volumeCilindro + volumeCone

  let volumeGraos = 0

  if (distancia >= config.alturaCilindro) {
    let alturaGraosCone = (config.alturaCilindro + config.alturaCone) - distancia
    if (alturaGraosCone < 0) alturaGraosCone = 0
    volumeGraos = (1.0 / 3.0) * areaCirculo * alturaGraosCone
  } else {
    let alturaGraosCilindro = config.alturaCilindro - distancia
    if (alturaGraosCilindro < 0) alturaGraosCilindro = 0
    volumeGraos = volumeCone + (alturaGraosCilindro * areaCirculo)
  }

  const percentual = (volumeGraos / volumeTotal) * 100.0

  let status = 0
  if (percentual >= config.percentualLimite) status = 2
  else if (percentual >= config.percentualAlerta) status = 1

  return { distancia, percentual, status }
}
*/