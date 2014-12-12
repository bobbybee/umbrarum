int state = false;

void setup() {
  Keyboard.begin(); 
  pinMode(9, INPUT_PULLUP);
  pinMode(2, INPUT);
  state = digitalRead(9);
}

void loop() {
  int nstate = digitalRead(9);
  if(state != nstate) {
     if(digitalRead(2) == HIGH) {
         state = nstate;
         if(state == LOW) {
            Keyboard.write(' ');
            delay(100);
            Keyboard.write(' ');
            delay(100);
            Keyboard.write('0');
            delay(100);
            Keyboard.write('0');
            delay(100);
            Keyboard.write('0');
            delay(100);
            Keyboard.write('0');
            delay(100);
            Keyboard.write('\n');

         }
     }
  }
}
