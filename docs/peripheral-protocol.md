Interal Peripheral Protocol
=======

This page describes the protocol used internally to control peripherals connected to the game. This applies to the server extensions (specifically, the spell request), and the microcontrollers which host the peripherals themselves.

Handshake
=====

The handshake is performed by the peripheral sending to the server its peripheral ID in string form. As of the time of writing, this ID is simply the name of the clue (that is, the ID of the evil clue is "evil clue\n") The server should disconnect peripherals that do not conform to this handshake, and as such, the client should assume that once it is successfully connected, it may begin to read and write data.

Data
====

As the various peripherals vary dramatically in their needs, there is no requirement on the structure of the data once the handshake is performed.