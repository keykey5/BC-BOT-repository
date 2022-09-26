RoomName = "Ki and Ky Office"
RoomDescription = "RP System - Read the OFFICE POLICY in the BIO!"
// -----------------------------------------------------------------------------

/* 
TODO:
- check if someone touched the IDCard
*/

OfficeManagerCheckInterval = 30*60*1000
if (typeof timeoutHandle === 'undefined') {
  timeoutHandle = setTimeout(OfficeManagerCheck, OfficeManagerCheckInterval)
  nextCheckTime = Date.now()+OfficeManagerCheckInterval
}


// Update Room Data
ChatRoomData.Background = "Office2"
ChatRoomData.Name = RoomName
ChatRoomData.Description = RoomDescription
ServerSend("ChatRoomAdmin", { MemberNumber: Player.ID, Room: ChatRoomData, Action: "Update" });
ChatAdminMessage = "UpdatingRoom";


// new line in chat - BEGIN
nl = `
`
// new line in chat - END


ChatRoomMessageAdditionDict["EnterLeave"] = function(sender, msg, data) {ChatRoomMessageEnterLeave(sender, msg, data)}
ChatRoomMessageAdditionDict["Office"] = function(sender, msg, data) {ChatRoomMessageOffice(sender, msg, data)}

Player.Description = `Code available here: https://github.com/keykey5/BC-BOT-repository

------------------------------------------------

IN DEVELOPMENT: I wanted to try creating a setting with a loose guideline for people to enjoy. We'll see if this work.
There are only a couple of mechanics to create the setting everything else will have to be role played by you!

Remember: this is just a settings, it's on you to make it kinky^^.

------------------------------------------------

Welcome to the Ki&Ky Corporation.

OFFICE POLICIES: 
- Every employee must wear their ID card at all time. Removing or changing any ID card will get your FIRED (kicked out).
- The Manager (NPC) is in charge of the office productivity. Luckily your manager is a pervert, enjoys a kinky office and will normally close an eye if she sees something out of the ordinary happening: just keep the productivity up and she will be happy! Still every now and then she will make sure that things don't go too crazy (everyone is freed and redressed every 20-30 min.)

ID CARDs: Everyone in the office has an ID Card. The color of the card represent the employee role.
- SENIOR (orange): they should be the ones with more authority
- ASSISTANT (light blue): usually gets to do the grunt work
- OFFICE SECRETARY (pink): she is like an assistant but there is only one (IN DEV)


RP GUIDELINES and SUGGESTIONS:
Senior > Assistant > Secretary.

The Ki&Ky Company produce and sells a wide variety of item: from mugs and pens to clothes and even furniture. 
Sometimes the items are custom made under request of particular clients.
The office handles everything from contracts and customer care to product evaluation.

-Locations-
Desk: you can check customers data and orders, send data to other employee. But not all data is digitalized, sometimes you may have to use the archive cabinets.
Archive cabinets: positioned near the secretary desk. Anyone can access the cabinets, but if available you could ask for the secretary help.
Printer: the printer is at the end of office, near the break room.
Break room: here you can find a sofa and chairs, a vending machine, a coffee maker and some of the company products...

-Works and scenarios examples-
Contracts: needs to be printed > manually filled > signed (by a senior)
Employee evaluation: continuous evaluation of the new employees is extremely important. As a senior you can submit evaluation reports to management.
Product evaluation: a new (or defective) product needs to be checked...
Relax: sometimes it's important to relax while working. Someone should bring you a drink or something to eat. 
Doll: a client requested a human size doll but you are out of stock... 
Pet: it's always nice to have a pet in the office
B-out day: sometimes seniors like to invent special days like the B-out day and who can contradict them? What is B-out day? Well it's "Boobs out" day! (or you can create your own kinky day)

Also remember that this is a just the setting and some loose guideline/suggestion. You can create and play whatever kinky scenario you desire.
(create interesting ideas and I may add them here as suggestions)

------------------------------------------------
COMMANDS: all commands must be whispered.

!leave - you will be freed and kicked out of the room.
!dress - automatically get appropriate clothes for the office environment (or you can create your own outfit)
!time - how much time until the manager makes her round check

` // end of description
ServerSend("AccountUpdate", { Description: Player.Description });
ChatRoomCharacterUpdate(Player)


function ChatRoomMessageEnterLeave(sender, msg, data) {
  if ((data.Type == "Action") && (msg.startsWith("ServerEnter"))) {
    setTimeout(enterLeaveEvent,1*1000,sender,msg)
  } else if ((msg.startsWith("ServerLeave")) || (msg.startsWith("ServerDisconnect")) || (msg.startsWith("ServerBan")) || (msg.startsWith("ServerKick"))) {
    // nothing here
  } else if (data.Type != null && sender.MemberNumber != Player.MemberNumber) {
    if ((data.Type == "Chat") || (data.Type == "Whisper")) {
      if (msg.includes("!leave")) {
        free(sender.MemberNumber, update = false)
        ChatRoomCharacterUpdate(sender)
        ChatRoomAdminChatAction("Kick", sender.MemberNumber.toString())
      }
    }
  }
}

function ChatRoomMessageOffice(sender, msg, data) {
  if (data.Type != null && sender.MemberNumber != Player.MemberNumber && customerList[sender.MemberNumber] != null) {

    if (!(sender.MemberNumber in customerList)) {return}

    if (((data.Type == "Chat") || (data.Type == "Whisper")) && msg.startsWith("!")) {
      
      if (msg.includes("!dress")) {
        dressLike(sender,"office",dressColor = "default", update = false)
        assignIDCard(sender) // this function updates the appearance too
      } else if (msg.includes("!time")) {
        nextManagerCheckTime(sender)
      }

    } else if ((data.Type == "Activity")) {
      //
    } else if ((data.Type == "Action")) {
      // console.log("msg :" + msg)
      // console.log("Dictionary :" + data.Dictionary)
      // if (data.Dictionary[0]) {console.log("Dictionary 0 :" + data.Dictionary[0].MemberNumber)} 
      // if (data.Dictionary[1]) {console.log("Dictionary 1 :" + data.Dictionary[1].MemberNumber)} 
      // if (data.Dictionary[2]) {console.log("Dictionary 2 :" + data.Dictionary[2].MemberNumber)} 
      // if (data.Dictionary[3]) {console.log("Dictionary 3 :" + data.Dictionary[3].MemberNumber)}
      // if (data.Dictionary[4]) {console.log("Dictionary 4 :" + data.Dictionary[4].MemberNumber)}
      // if (msg.includes("ChangeClothes") || msg.includes("ActionUse") || msg.includes("ActionSwap") || msg.includes("ActionChangeColor") || msg.includes("ActionLock") || msg.includes("ActionAddLock") || msg.includes("ActionRemove") || msg.includes("ActionUnlock") || msg.includes("ActionPick") || msg.includes("ActionUnlockAndRemove")) {

        // check if the action was performed on the IDCard

      //}
    }	else if ((data.Type == "Emote")) {
      //
    } else if ((data.Type == "Whisper")) {
      //
    }
  }
}



function enterLeaveEvent(sender,msg) {
  if (isExposed(sender) || sender.IsRestrained() || CharacterIsInUnderwear(sender) || sender.IsShackled() || sender.IsBlind() || !sender.CanTalk() || sender.IsEnclose() || sender.IsMounted() || sender.IsDeaf()) {
    ServerSend("ChatRoomChat", { Content: "*[To play here you have to be UNRESTRAINED and fully DRESSED (check your panties too). You will be kicked in 10 seconds. You can change and comeback if you want.]", Type: "Emote", Target: sender.MemberNumber} );
    setTimeout(function(sender) {ChatRoomAdminChatAction("Kick", sender.MemberNumber.toString())}, 10*1000, sender)
  }
  if (sender.ItemPermission>2) {
    ServerSend("ChatRoomChat", { Content: "*[To play here you have to lower your PERMISSION. You will be kicked in 10 seconds. You can change and comeback if you want.]", Type: "Emote", Target: sender.MemberNumber} );
    setTimeout(function(sender) {ChatRoomAdminChatAction("Kick", sender.MemberNumber.toString())}, 10*1000, sender)
  } else {
		ServerSend("ChatRoomChat", { Content: "*[ROOM EXPLANATION in " + Player.Name + " Bio. READ IT]", Type: "Emote", Target: sender.MemberNumber} );
		ServerSend("ChatRoomChat", { Content: "*[Say or whisper '!leave' and all the locks on you will be unlocked, but you will also be kicked out.]", Type: "Emote", Target: sender.MemberNumber} );
		if (sender.MemberNumber in customerList) {
			assignIDCard(sender)
		} else {
			newCustomer(sender)
		}
	}
  //console.log(sender.Name + "ENTERED")
}


function assignRole(sender) {
  reputation = (ReputationCharacterGet(sender,"Dominant")/4)+50 // between 25 and 75
  out = (Math.random()*100-50)+reputation
  if (out>=50) {
    customerList[sender.MemberNumber].role = "senior"
  } else if (out>=20 ) {
    customerList[sender.MemberNumber].role = "assistant"
  } else {
    customerList[sender.MemberNumber].role = "assistant"  // TODO: secretary
  }
  assignIDCard(sender)
}


function newCustomer(sender) {
	customerList[sender.MemberNumber] = new personMagicData()
  customerList[sender.MemberNumber].name = sender.Name
  assignRole(sender)
}

function checkRoomForCustomer() {
  for (var D = 0; D < ChatRoomCharacter.length; D++) {
    if (!(ChatRoomCharacter[D].MemberNumber in customerList)) {
      newCustomer(ChatRoomCharacter[D])
      console.log("Added " + ChatRoomCharacter[D].Name + " as customer.")
    }
  }
}



function assignIDCard(sender) {
  if (customerList[sender.MemberNumber].role == "secretary") {
    InventoryWear(sender, "IDCard","Necklace","#cc33cc")
  } else if (customerList[sender.MemberNumber].role == "assistant") {
    InventoryWear(sender, "IDCard","Necklace","#357DDA")
  } else if (customerList[sender.MemberNumber].role == "senior") {
    InventoryWear(sender, "IDCard","Necklace","#A45200")
  } else if (customerList[sender.MemberNumber].role == "junior") {
    InventoryWear(sender, "IDCard","Necklace","Default")
  } else if (customerList[sender.MemberNumber].role == "manager") {
    InventoryWear(sender, "IDCard","Necklace","#39B501")
  } else if (customerList[sender.MemberNumber].role == "intern") {
    InventoryWear(sender, "IDCard","Necklace","#A45200")
  }
  ChatRoomCharacterUpdate(sender)
}


function OfficeManagerCheck() {
  freeAll()

  for (var D = 0; D < ChatRoomCharacter.length; D++) {
    if (isExposed(ChatRoomCharacter[D]) || CharacterIsInUnderwear(ChatRoomCharacter[D])) {dressLike(sender,dress='office')}
  }

  ServerSend("ChatRoomChat", { Content: "Everyone don't slack too much, there is a lot of work to do.", Type: "Chat"} );
  
  timeoutHandle = setTimeout(OfficeManagerCheck, OfficeManagerCheckInterval)
  nextCheckTime = Date.now() + OfficeManagerCheckInterval
  
}

function nextManagerCheckTime(sender) {
  ServerSend("ChatRoomChat", { Content: "*Next Manager check in " +  (Math.ceil((nextCheckTime-Date.now())/1000/60)) + " min.", Type: "Emote", Target: sender.MemberNumber} );
}

