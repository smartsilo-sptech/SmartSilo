float tempo;
float distancia = 0;

int trig = 9;
int echo = 10;

float alturaCilindro = 11.0;
float alturaCone = 4.0;
float raioSilo = 3.0;
float pi = 3.14;

float percentualLimite = 90.0;
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
    Serial.print(1);
  } 
  else if (percentual >= percentualMinimo) {
    Serial.print(0);
  } 
  else {
    Serial.print(1);
  }

  Serial.println(";");

  delay(2000);
}
