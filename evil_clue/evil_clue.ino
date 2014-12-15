#include <SoftwareSerial.h>
#include <SPI.h>
#include <Ethernet.h>

byte mac[] = {0xDA, 0xED, 0xBF, 0x7F, 0xFE, 0xED };
char server[] = "ai.umbrarum.com";
EthernetClient client;
IPAddress ip(192, 168, 1, 178);

SoftwareSerial mySerial(2, 3);

void setup() {  
   mySerial.begin(9600);
   Serial.begin(9600);
   
   delay(1000);
   mySerial.write(12);
   mySerial.write(17);
   mySerial.write(128);
   
   Ethernet.begin(mac, ip); // DHCP configuration
   delay(1000);
   client.connect(server, 1234);
   client.println("evil clue\n");
}


void loop() {
  mySerial.write(208);
  
  if(client.available()) {
     char c = client.read();
     
     Serial.println();
     Serial.write(c);
          
     mySerial.write(220);
     delay(62);
     
     mySerial.write(c);

  }
}

