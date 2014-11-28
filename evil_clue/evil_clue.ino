#include <SoftwareSerial.h>
#include <SPI.h>
#include <Ethernet.h>

byte mac[] = {0xDA, 0xED, 0xBF, 0x7F, 0xFE, 0xED };
char server[] = "184.153.184.113";
EthernetClient client;

SoftwareSerial mySerial(2, 3);

void setup() {
   pinMode(9, OUTPUT);
  
   mySerial.begin(9600);
   delay(1000);
   mySerial.write(12);
   mySerial.write(17);
   mySerial.write(128);
   
   Ethernet.begin(mac); // DHCP configuration
   delay(1000);
   client.connect(server, 1234);
   client.println("evil clue");
}


void loop() {
  if(client.available()) {
     char c = client.read();
     
     unsigned short i = 1000;
     while(i--) {
         digitalWrite(9, HIGH);
         delayMicroseconds(25);
         digitalWrite(9, LOW);
         delayMicroseconds(25); 
     }
     
     mySerial.write(c);

  }
}
