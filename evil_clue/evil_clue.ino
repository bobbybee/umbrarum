#include <SoftwareSerial.h>
#include <SPI.h>
#include <Ethernet.h>

byte mac[] = {0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };
IPAddress ip(10, 0, 1, 177);
IPAddress server(10, 0, 1, 9);
EthernetClient client;

SoftwareSerial mySerial(2, 3);

void setup() {
   mySerial.begin(19200);
   delay(1000);
   mySerial.write(12);
   mySerial.write(17);
   mySerial.write(128);
   
   Ethernet.begin(mac, ip);
   delay(1000);
   client.connect(server, 1234);
}


void loop() {
  if(client.available()) {
     char c = client.read();
     mySerial.write(c);
  }
}
