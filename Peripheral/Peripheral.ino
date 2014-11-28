#include <SPI.h>
#include <Ethernet.h>

/* CONFIGURE */

byte mac[] = {0xDA, 0xED, 0xBF, 0x7F, 0xFE, 0xED };
char server[] = "184.153.184.113";
uint16_t port = 1234;

/* END CONFIGURE */

class Peripheral {
  public:
    Peripheral(char* name) : m_name(name) {
      Ethernet.begin(mac);
      delay(1000);
      m_client.connect(server, port);  
      delay(1000);
      m_client.println(m_name);  
}
    
    void loop() {
       if(m_client.available()) {
          char d = m_client.read();
          onData(d);
       } 
    }
   
    virtual void onData(char d) {
      
    }
  private:
    char* m_name;
    EthernetClient m_client;
};

void setup() {
  
}

void loop() {
	
}
