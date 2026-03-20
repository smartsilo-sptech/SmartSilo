// Declarando as variáveis
float tempo;
float distancia=0;
int trig=9;
int echo=10;

float alturaCilindro = 11;
float alturaCone = 4;
float raioSilo = 3;
float pi = 3.14;

float percentualLimite = 90;
float percentualMinimo = 10;


float areaCirculo = (raioSilo*raioSilo)* pi;

float volumeCilindro = areaCirculo * alturaCilindro;
float volumeCone = (1.0/3.0) * areaCirculo * alturaCone;

float volumeTotal = volumeCilindro + volumeCone;
float volumeGraos = 0;



float distanciaMinima = alturaCilindro - (alturaCilindro * percentualLimite / 100);
float distanciaMaxima = alturaCilindro - (alturaCilindro * percentualMinimo / 100);

void setup() {
  Serial.begin(9600);
  pinMode(trig, OUTPUT);
  pinMode(echo, INPUT);
}

void loop() {

  digitalWrite(trig, LOW);
  delayMicroseconds(2);
  digitalWrite (trig, HIGH);
  delayMicroseconds(10);
  digitalWrite (trig, LOW);

  tempo=pulseIn(echo, HIGH);

  distancia= (tempo/2)*0.0343 ;

  if(distancia >= alturaCilindro){

    float a = (alturaCilindro + alturaCone) - distancia;
    volumeGraos = (1.0/3.0) * areaCirculo * a;

  }else{

    float b = (alturaCilindro - distancia) * areaCirculo;
    volumeGraos = volumeCone + b;

  }
  Serial.print("distancia : ");
  Serial.print(distancia);
  Serial.println(" Metros");
  float percentual = volumeGraos/volumeTotal * 100;

  Serial.print("Volume de graos: ");
  Serial.print(volumeGraos);
  Serial.println(" metros cubicos");

  Serial.print("Volume total: ");
  Serial.print(volumeTotal);
  Serial.println(" metros cubicos");

  Serial.print("Percentual: ");
  Serial.print(percentual);
  Serial.println("%");

  if (percentual >= percentualLimite){
    Serial.println("SILO ACIMA DO LIMITE, VOCE PRECISA ESVAZIAR");
  }else if(percentual >= percentualMinimo){
    Serial.println("SILO DENTRO DO LIMITE");
  }else{
    Serial.println("SILO ABAIXO DO LIMITE, VOCE PRECISA ENCHER");
  }
  Serial.println("");
  
  delay(5000);
}
