/*

HARDWARE:
 - Arduino UNO R3
 - Arduino Ethernet Shield for UNO
 - Parallax Serial LCD (#27977)
 - ...
 
HARDWARE SETTINGS:
 - Serial LCD: SW1 off, SW2 on
 - ...
   
Connections:
 [ Arduino ] [ Serial LCD ]
 -   GND   to   GND
 -   5V    to   5V
 -   Pin 3 to   RX
 -   ...
 
*/

// Parallax Serial LCD documentation at http://elmicro.com/files/parallax/seriallcd-v20.pdf
// ...

#include <SoftwareSerial.h>

// [GLOBAL VARIABLES ARE DECLARED HERE]

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
   
   // Clear LCD and display startup message:
   delay(500);
   clearLCD();
   delay(1000);
   LCDdisplay.write("|  | |^/| |-]\x94");
   LCDdisplay.write("|__| |  | |==] #");
   delay(3000);
   
   // [SETUP GOES HERE]
   
   
   // Clear LCD
   clearLCD();
   delay(1000);
   
}

void loop() {
  
  //
  
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
