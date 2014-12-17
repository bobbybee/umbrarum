/*

HARDWARE:
 - Arduino UNO R3
 - Arduino Ethernet Shield for UNO
 - Parallax Serial LCD
   
Connections:
 [ Arduino ] [ Serial LCD ]
 -   GND   to   GND
 -   5V    to   5V
 -   Pin 3 to   RX
 
*/

// Parallax Serial LCD documentation at http://elmicro.com/files/parallax/seriallcd-v20.pdf

#include <SoftwareSerial.h>
#include <SPI.h>
#include <Ethernet.h>

byte mac[] = {0xDA, 0xED, 0xBF, 0x7F, 0xFE, 0xED };
char server[] = "ai.umbrarum.com";
EthernetClient client;
IPAddress ip(192, 168, 1, 178);

SoftwareSerial mySerial(2, 3);

void setup() {
  
   // Beep once to signal setup
   beep(62);
  
   // Begin serial communication with LCD
   mySerial.begin(9600);
   
   // Wait a second and setup LCD
   delay(1000);
   clearLCD();
   
   // Wait 10 seconds to allow time for plugging peripheral into router
   delay(10000);
   
   // Beep twice to signal "connecting to server"
   beep(133);
   delay(62);
   beep(133);
   
   // Connect to internet via Ethernet
   Ethernet.begin(mac, ip); // DHCP configuration
   
   delay(1000);
   clearLCD();
   
   // Connect to server. (ai.umbrarum.com:1234)
   client.connect(server, 1234);
   // Send evil clue "signature" for the server to identify the peripheral
   client.println("evil clue\n");
}

void loop() {
  mySerial.write(208);
  
  if(client.available()) {
     char c = client.read();
          
     beep(62);
     
     mySerial.write(c);

  }
  
  if (!client.connected())
     client.stop();
}

void beep(int length) {
   mySerial.write(220);
   delay(length);
   mySerial.write("");
}

void clearLCD() {
   mySerial.write(12);
   delay(5); // required after "Form Feed" command (see serial LCD documentation)
   mySerial.write(17);
   mySerial.write(128);
}
