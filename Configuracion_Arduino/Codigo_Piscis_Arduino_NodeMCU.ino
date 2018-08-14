
#include <ESP8266WiFi.h>
#include <FirebaseArduino.h>
#include <DHT.h>
#include <time.h>
#include <string.h>

//Se establecen las constantes de tipo y pin para el DHT11
#define DHTPIN 0
#define DHTTYPE DHT11

//Se configura el modulo DHT
DHT dht(DHTPIN,DHTTYPE);

// Se establecen las constantes del proyecto de firebase.
#define FIREBASE_HOST "firecodesapplication.firebaseio.com"
#define FIREBASE_AUTH "AOtY5WRQ8sunTvtS3D0rB9tIpKCi4DLc6uQDMQy6"
#define WIFI_SSID "Familia_Reyes_Jimenez"
#define WIFI_PASSWORD "@#H0h58I"

//Se definen las variables para el tiempo
int timezone = -6;
int dst = 0;
String meses[12] = {"Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"};
int hora = 0;
int minuto = 0;
int segundos = 0;
String mes="";
String privata_key_id="";
int ano = 0;
int dia = 0;

//se declaran las variables de temperatura del dht11
float temperatura,humedad;

void setup() {

  //Se inicializa el modulo dht y la salida Serial
  dht.begin();
  Serial.begin(9600);

  // Se conecta a la red wifi.
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("connecting");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  //Una vez ya conectado al wifi
  Serial.println();
  Serial.print("connected: ");
  Serial.println(WiFi.localIP());

  //Se inicializa firebase con sus configuraciones
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  
  //Se Inicia la configuracion del servidor udtp para el tiempo y se conecta al servidor
  configTime(-6 * 3600, 0, "pool.ntp.org", "time.nist.gov");
  Serial.println("\nWaiting for time");
  while (!time(nullptr)) {
    Serial.print(".");
    delay(1000);
  }
  Serial.println("");
  delay(2000);
}



void loop() {

  //Se leen las variables de temperatura y humedad del dht
  temperatura = dht.readTemperature();
  humedad = dht.readHumidity();

  //Se leen las variables y se construye la estructura para el tiempo
  time_t now = time(nullptr);
  struct tm* p_tm = localtime(&now);
  
  //Se muestran los datos del tiempo
  Serial.print(p_tm->tm_mday);
  dia = p_tm->tm_mday;
  Serial.print("/");
  Serial.print(meses[p_tm->tm_mon]);
  mes = meses[p_tm->tm_mon];
  Serial.print("/");
  Serial.print(p_tm->tm_year + 1900);
  ano = p_tm->tm_year + 1900;
  
  Serial.print(" ");

  Serial.print(p_tm->tm_hour);
  hora = p_tm->tm_hour;
  Serial.print(":");
  Serial.print(p_tm->tm_min);
  minuto = p_tm->tm_min;
  Serial.print(":");
  Serial.println(p_tm->tm_sec);
  segundos = p_tm->tm_sec;

  privata_key_id = "-"+mes+"-"+ano+","+hora+":"+minuto+":"+segundos;
  String nueva_key = dia+privata_key_id;
  Serial.println(nueva_key);

  // Se Muestran los datos en Serial de temperatura y humedad
        Serial.print("Humedad: "); 
        Serial.print(humedad);
        Serial.print(" %\t");
        Serial.print("Temperatura: "); 
        Serial.print(temperatura);
        Serial.print(" °C \n");

  //Se suben los datos a firebase
    StaticJsonBuffer<700> jsonBuffer;
        JsonObject& root = jsonBuffer.createObject();
        root["Temperatura"] = temperatura;
        root["Humidity"] = humedad;
        root["Año"] = p_tm->tm_year + 1900;
        root["Mes"] = meses[p_tm->tm_mon];
        root["Dia"] = p_tm->tm_mday;
        root["private_key_id"] = nueva_key;
        String setting = "Historial/"+nueva_key; 
        
        // append a new value to /logDHT
        //String name = Firebase.push("Historial", root);
        Firebase.set(setting, root);
        // handle error
        if (Firebase.failed()) {
            Serial.print("Firebase Pushing "+setting+" failed:");
            Serial.println(Firebase.error()); 
        }else{
            Serial.print("Firebase Pushed "+setting);
            //Serial.println(name);
        }
        if (Firebase.available()) {
          FirebaseObject event = Firebase.readEvent();
          String eventType = event.getString("type");
          if (eventType == "put") {
            Serial.print("value from stream: ");
            Serial.println(event.getInt("data"));
          }
        }

  //Todo este codigo se repetira cada vez en el tiempo que se establezca en el delay de abajo
  delay(60000*60);
}
