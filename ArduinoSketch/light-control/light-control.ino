// the setup function runs once when you press reset or power the board
void setup() {
  Serial.begin(9600);
  // initialize digital pin 13 as an output.
  pinMode(13, OUTPUT);
}

// the loop function runs over and over again forever
void loop() {
    while (Serial.available()) {
      Serial.println("serial is available");
      int input = Serial.read()-'0';
      Serial.println(input);
      if(input == 1){ // end character for led
       digitalWrite(13, HIGH);   // turn the LED on (HIGH is the voltage level)
       Serial.println('Y');  
      }else if(input == 0){
        digitalWrite(13, LOW);   // turn the LED on (LOW is the voltage level)
        Serial.println('N');  
      }
   }
}
