# BC-BOT-repository

Currently available BOTs:
* Denial Bar
* Casino
* Office
* Pony Contest
* Strange Room


## Quick Instructions

To use the BOT in this repository:
1) Log into BC with the character that you will use as a BOT
2) Create a room in "private" state so that you can work without anyone entering too soon.
3) Select the name/description/background of the room
4) Open the command line (F15 or Ctrl + Shift +K). WARNING: copy-pasting code into the command line can be dangerous, you should only copy-paste code that you can understand and that comes from a trusted source.
5) Copy the content of CommonBotAssets.js into the command window and press ENTER.
6) Copy the content of the BOT .js file that you want to use into the command window and press ENTER. 
7) Enjoy.



## CommonBotAssets.js

This file contains some assets useful to create the BOTs.

* Code to autorelog after a disconnetion (thanks to Jessica Lane)
* Code needed to intercept the message in the chat
* Code to understand garbled messages (not actually needed for the bot to understand messages)
* Code to recover the character object (getCharacterObject()) starting from anything: player position in the room (0-9), the player MemberNumber or the character Object
* Code to rapidly free players from all restrains and undress them: removeRestrains(char), removeClothes(char), free(char), freeAll()
	
	char: can be the player position in the room (0-9), the player MemberNumber or the character Object. 

* Code to dress/restrain players into specific clothes: dressLike(char, dress, dressColor)

	dress: can be doll, doll2, talkingDoll, maid, cow , pony, pony elegant, pony race, cat, dog, trainer, trainer sub, mistress.

* And more functions that you can find inside the code.



## LICENSE

BSD Zero Clause License
(You can do whatever you want with this code)
