#include <SPI.h>
#include <Ethernet.h>

byte mac[] = {0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };
IPAddress ip(192, 168, 1, 177);
IPAddress server(192, 168, 1, 14);
EthernetClient client;

void setup() {
 pinMode(8, OUTPUT);
 Ethernet.begin(mac, ip);
   delay(1000);
  client.connect(server, 1234);
}

void loop() {
  if(client.available()) {
     char c = client.read();
    if(c == '1') {
       digitalWrite(8, HIGH);
    } else if(c == '0') {
       digitalWrite(8, LOW); 
    }
  }
}
