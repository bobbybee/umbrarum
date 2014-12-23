/*

HARDWARE:
 - Arduino UNO R3
 - Arduino Ethernet Shield for UNO
 - Parallax Serial LCD (#27977)
 
HARDWARE SETTINGS:
 - Serial LCD: SW1 off, SW2 on
   
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

SoftwareSerial LCDdisplay(2, 3);

void setup() {
  
   // Begin serial communication with LCD
   LCDdisplay.begin(9600);
   delay(1000);
   
   // Startup jingle
   LCDdisplay.write(208);
   beep(100);
   beep(100, 3);
   beep(100, 7);
   
   //setCustomChars();
   
   // Clear LCD and display startup message:
   delay(500);
   clearLCD();
   delay(1000);
   LCDdisplay.write("|  | |^/| |-]\x94");
   LCDdisplay.write("|__| |  | |==] #");
   delay(3000);
   
   clearLCD();
   delay(1000);
   // Clear LCD and display "plug into netwrk" message
   LCDdisplay.write("plug into netwrk\x94in: 10s");
   
   // Wait 10 seconds to allow time for plugging peripheral into ethernet + display countdown
   int i = 9;
   while(i >= 0) {
     delay(1000);
     LCDdisplay.print("\x97 " + String(i) + "s" + String(' '));
     i--;
   }
   
   clearLCD();
   // Beep twice to signal "connecting to server" + display message
   beep(133);
   delay(62);
   beep(133);
   LCDdisplay.write("connecting...");
   
   // Connect to internet via Ethernet
   Ethernet.begin(mac, ip); // DHCP configuration
   delay(1000);
   
   // Connect to server. (ai.umbrarum.com:1234)
   client.connect(server, 1234);
   
   clearLCD();
   delay(500);
   if ( client.connected() ) {
     
     // Send evil clue "signature" for the server to identify the peripheral
     client.println("evil clue\n");
     
   } else {
     
     LCDdisplay.write("couldn't connect\x94to ai.umbrarum!");
     
   }
   
}

void loop() {
  LCDdisplay.write(208);
  
  if(client.available()) {
     char c = client.read();
          
     beep(62);
     
     LCDdisplay.write(c);

  }
  
  if (!client.connected())
     client.stop();
}

void clearLCD() {
   LCDdisplay.write(12);
   delay(5); // required after "Form Feed" command (see serial LCD documentation)
   LCDdisplay.write(17);
   LCDdisplay.write(128);
}

void beep(int length) {
  beep(length, 0);
}

void beep(int length, int note) {
   // `note` key: [A 0][A# 1][B 2][C 3][C# 4][D 5][D# 6][E 7][F 8][F# 9][G 10][G# 11] 
   LCDdisplay.write(220 + note);
   delay(length);
   LCDdisplay.write("");
}

void setCustomChars() {
  // why doesn't it work? I should ask A...
  LCDdisplay.write("\xFF %1110,%0,%1110,%1,%1111,%10001,%1111");
}
