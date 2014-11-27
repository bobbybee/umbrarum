#include <SoftwareSerial.h>

SoftwareSerial mySerial(2, 3);

void setup() {
   mySerial.begin(19200);
   delay(1000);
   mySerial.write(12);
   mySerial.write(17);
   
   mySerial.write(128);
   mySerial.print("Hello, World!");
   
   mySerial.write(148);
   mySerial.print("+backlight");
}

void loop() {

}
