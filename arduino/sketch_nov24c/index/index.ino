#include <ArduinoJson.h>
#include <ArduinoJson.hpp>

#include <ArduinoWiFiServer.h>
#include <BearSSLHelpers.h>
#include <CertStoreBearSSL.h>
#include <ESP8266WiFi.h>
#include <ESP8266WiFiAP.h>
#include <ESP8266WiFiGeneric.h>
#include <ESP8266WiFiGratuitous.h>
#include <ESP8266WiFiMulti.h>
#include <ESP8266WiFiSTA.h>
#include <ESP8266WiFiScan.h>
#include <ESP8266WiFiType.h>
#include <WiFiClient.h>
#include <WiFiClientSecure.h>
#include <WiFiClientSecureBearSSL.h>
#include <WiFiServer.h>
#include <WiFiServerSecure.h>
#include <WiFiServerSecureBearSSL.h>
#include <WiFiUdp.h>

#include <ESP8266HTTPClient.h>

const char *ssid = "Alpha";
const char *password = "jeongsumin0701";
const char *deviceId = "3";
String host = "http://arduino.pukkuk.pp.ua";
const long interval = 2000;
unsigned long previousMillis = 0;

WiFiClient client;
HTTPClient http;

int state = 1;
const int relayPin = 14;

void setup()
{
  pinMode(relayPin, OUTPUT);
  // put your setup code here, to run once:
  Serial.begin(115200);
  delay(100);

  Serial.println();
  Serial.print("CONNECTING TO ");
  Serial.println(ssid);

  WiFi.begin(ssid, password); // 와이파이 이름과 비밀번호를 통해 WIFI연결을 시작하겠다 // WL_CONNECTED라는 값을 돌려준다

  while (WiFi.status() != WL_CONNECTED)
  { // 네트워크의 연결 상태, 8개의 리턴값 / STATUS와 WL_CONNECTED 값이 같은지를 통해 제대로 연결이 되있는지를 확인할 수 있다
    delay(500);
    Serial.print(".");
  }
  Serial.println();
  Serial.println("Wifi connected!");
}

void loop()
{
  // 센서값 DB 전송 부분
  unsigned long currentMillis = millis();
  if (currentMillis - previousMillis >= interval)
  {
    previousMillis = currentMillis;
    heartbeat();
    getParam();
    Serial.println(state);
    if (state == 1)
    {
      digitalWrite(relayPin, 1);
    }
    else
    {
      digitalWrite(relayPin, 0);
    }
  }
}

void heartbeat()
{
  String heartbeatHost = host + "/api/device/heartbeat/" + deviceId;
  Serial.print("heartBeating.....");
  Serial.println(heartbeatHost);

  http.begin(client, heartbeatHost);
  http.setTimeout(1000);
  int httpCode = http.GET();

  if (httpCode > 0)
  {
    Serial.println("heartbeat success!");
  }
  else
  {
    Serial.printf("heartbeat failed, error: %s\n", http.errorToString(httpCode).c_str());
    Serial.println();
  }

  http.end();
}

void getParam()
{
  String getParam = host + "/api/device/" + deviceId;
  http.begin(client, getParam);
  http.setTimeout(3000);

  int httpCode = http.GET();

  if (httpCode > 0)
  {
    Serial.printf("GET code : %d\n\n", httpCode);
    Serial.println();
    if (httpCode == HTTP_CODE_OK)
    {
      String payloads = http.getString();
      Serial.println(payloads);
      state = getState(payloads);
    }
  }
  else
  {
    Serial.printf("GET param failed, error: %s\n", http.errorToString(httpCode).c_str());
    Serial.println();
  }

  http.end();
}

int getState(String input)
{
  StaticJsonDocument<0> filter;
  filter.set(true);

  StaticJsonDocument<256> doc;

  DeserializationError error = deserializeJson(doc, input, DeserializationOption::Filter(filter));

  if (error)
  {
    Serial.print(F("deserializeJson() failed: "));
    Serial.println(error.f_str());
    return -1;
  }

  bool success = doc["success"]; // true

  JsonObject data = doc["data"];
  int data_state = data["state"]; // 0
  return data_state;
}
