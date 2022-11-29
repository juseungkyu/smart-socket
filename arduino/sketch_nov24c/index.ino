#include <ESP8266HTTPClient.h>

#include <ESP8266WiFi.h>

const char *ssid = "test_ap";
const char *password = "1q2w3e4r";
const char *deviceid = "1";
// 일단 서버주소/heartbeat/deviceId
// 127.0.0.1/heartbeat/1 / if(deviceid>0) { hearbeat = "127.0.0.1/heartbeat/" + deviceId; }
// 3초에 한번씩 저 위의 heartbeat 주소로 접속해서 살아있음을 보내줘야함 / delay(1000);
// 서버주소/deviceId
// 우리가 저 서버로 접속해서
// 장치의 상태값(장치 이름, 장치 켜짐 상태) 
// 받아와서 만약 현재의 값과 다르다면 변경 / if(기본값 != 가져온값){ 기본값은 = 가져온값; }
// 저거는 대충 2초에 한번씩 되도록 1초에 한번씩  delay(1000);
const char* host = "Host 주소";

WiFiClient client;
HTTPClient http;


int ledPin = 2;

void setup()
{
  // put your setup code here, to run once:
  Serial.begin(115200);
  delay(100);

  pinMode(ledPin, OUTPUT);
  digitalWrite(ledPin, LOW);

  Serial.println();
  Serial.print("CONNECTING TO ");
  Serial.println(ssid);

  WiFi.begin(ssid, password); // 와이파이 이름과 비밀번호를 통해 WIFI연결을 시작하겠다
  // WL_CONNECTED라는 값을 돌려준다

  while (WiFi.status() != WL_CONNECTED)
  { // 네트워크의 연결 상태, 8개의 리턴값
    // STATUS와 WL_CONNECTED 값이 같은지를 통해 제대로 연결이 되있는지를 확인할 수 있다
            delay(500);
    Serial.print(".");
  }
  Serial.println();
  Serial.println("Wifi connected!");

  server.begin();
  Serial.println("Server started");

  Serial.print("device IP Address : ");
  Serial.print(WiFi.localIP());
  // 서버 IP주소를 알려준다. 브라우저의 주소란에 치면 NODE MCU가 서버로 있는 것으로 접근할 수 있다.
  Serial.println("/");
  Serial.println("");
}

void loop()
{
  Serial.printf("Connect to %s\n", host);
  http.begin(client, host);
  http.setTimeout(1000);
  int httpCode = http.GET();
 
  if(httpCode > 0) {
    Serial.printf("GET code : %d\n\n", httpCode);
    
    if (httpCode == HTTP_CODE_OK) {
      String payload = http.getString();
      Serial.println(payload);
    }
  } 
  else {
    Serial.printf("GET failed, error: %s\n", http.errorToString(httpCode).c_str());
  }
  http.end();
 
  delay(5000);  Serial.printf("Connect to %s\n", host);
  http.begin(client, host);
  http.setTimeout(1000);
  int httpCode = http.GET();
 
  if(httpCode > 0) {
    Serial.printf("GET code : %d\n\n", httpCode);
    
    if (httpCode == HTTP_CODE_OK) {
      String payload = http.getString();
      Serial.println(payload);
    }
  } 
  else {
    Serial.printf("GET failed, error: %s\n", http.errorToString(httpCode).c_str());
  }
  http.end();
 
  delay(5000);
}