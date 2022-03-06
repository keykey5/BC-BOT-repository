ServerSocket.on("ChatRoomMessage", function (data) { ChatRoomMessageAdd(data); });

if (typeof ChatRoomMessageAdditionDict === 'undefined') {
  ChatRoomMessageAdditionDict = {}
}


function ChatRoomMessageAdd(data) {

	// Make sure the message is valid (needs a Sender and Content)
	if ((data != null) && (typeof data === "object") && (data.Content != null) && (typeof data.Content === "string") && (data.Content != "") && (data.Sender != null) && (typeof data.Sender === "number")) {

		// Make sure the sender is in the room
		var SenderCharacter = null;
		for (var C = 0; C < ChatRoomCharacter.length; C++)
			if (ChatRoomCharacter[C].MemberNumber == data.Sender) {
				SenderCharacter = ChatRoomCharacter[C]
				break;
			}

		// If we found the sender
		if (SenderCharacter != null) {

			// Replace < and > characters to prevent HTML injections
			var msg = data.Content;
			while (msg.indexOf("<") > -1) msg = msg.replace("<", "&lt;");
			while (msg.indexOf(">") > -1) msg = msg.replace(">", "&gt;");


      // This part is to append code react to certain message
      for (var key in ChatRoomMessageAdditionDict) {
        ChatRoomMessageAdditionDict[key](SenderCharacter, msg, data)
      }
    }
  }
}

// -----------------------------------------------------------------------------------------------

ChatRoomMessageAdditionDict["Ungarble"] = function(SenderCharacter, msg, data) {ChatRoomMessageUngarble(SenderCharacter, msg, data)}

function ChatRoomMessageUngarble(SenderCharacter, msg, data) {
  // This part is to display a chat message that shows the ungarbled message when someone is gagged.
  if (data.Type != null) {
    if ((data.Type == "Chat")) { // && (SenderCharacter.MemberNumber != Player.MemberNumber)) {

      var GagEffect = 0;
      GagEffect += SpeechGetGagLevel(SenderCharacter, "ItemMouth");
      GagEffect += SpeechGetGagLevel(SenderCharacter, "ItemMouth2");
      GagEffect += SpeechGetGagLevel(SenderCharacter, "ItemMouth3");
      GagEffect += SpeechGetGagLevel(SenderCharacter, "ItemHead");
      GagEffect += SpeechGetGagLevel(SenderCharacter, "ItemMouth");
      GagEffect += SpeechGetGagLevel(SenderCharacter, "ItemDevices");

      if (GagEffect>0) {
        msg = '<span class="ChatMessageName" style="color:' + (SenderCharacter.LabelColor || 'gray') + ';">' + SenderCharacter.Name + ':</span> ' + msg  //<span style="font-size: 0.5em;"> (gagged) ' + msg + '</span>'

        // Adds the message and scrolls down unless the user has scrolled up
        var enterLeave = "";

  // END OF CUSTOM CODE --------------------------------------------

        var div = document.createElement("div");
        div.setAttribute('class', 'ChatMessage ChatMessage' + data.Type + enterLeave);
        div.setAttribute('data-enterleave','smaller')
        //div.setAttribute('data-time', ChatRoomCurrentTime());
        //div.setAttribute('data-sender', data.Sender);
        div.setAttribute('style', 'padding-left: 0.8em; font-size: 0.6em; background-color:' + ChatRoomGetTransparentColor(SenderCharacter.LabelColor) + ';');
        div.innerHTML = msg;

        var Refocus = document.activeElement.id == "InputChat";
        var ShouldScrollDown = ElementIsScrolledToEnd("TextAreaChatLog");
        if (document.getElementById("TextAreaChatLog") != null) {
          document.getElementById("TextAreaChatLog").appendChild(div);
          if (ShouldScrollDown) ElementScrollToEnd("TextAreaChatLog");
          if (Refocus) ElementFocus("InputChat");
        }
      }
    }
  }
}

// -----------------------------------------------------------------------------------------------

class personMagicData {
  name = ''
  role = ''
	//rules = [] only present in prototypes
	points = 0
  totalPointsGained = 0
	lockCode = Math.floor(Math.random() * 9000+1000).toString()
	beingPunished = false
	strike = 0
	orgasmResisted = 0
	vulvaIntensity = 1
	buttIntensity = 1
  lastActivity = Date.now()
  allowedOrgasmNum = 0
}
if (personMagicData.prototype.rules == null) {
  personMagicData.prototype.rules = []
}

if (typeof customerList === 'undefined') {
	customerList = {}
  customerList[Player.MemberNumber] = new personMagicData()
  customerList[Player.MemberNumber].role = "Bot"
  customerList[Player.MemberNumber].rules = []
}

// -----------------------------------------------------------------------------------------------

function freeAll() {
	for (var R = 0; R < ChatRoomCharacter.length; R++) {
		removeRestrains(R)
		reapplyClothing(ChatRoomCharacter[R])
		ChatRoomCharacterUpdate(ChatRoomCharacter[R])
	}
	ServerSend("ChatRoomChat", { Content: "*Everyone has been freed.", Type: "Emote"} );
}

function removeRestrains(target){
	InventoryRemove(ChatRoomCharacter[target],"ItemVulva")
	InventoryRemove(ChatRoomCharacter[target],"ItemButt")
	InventoryRemove(ChatRoomCharacter[target],"ItemArms")
	InventoryRemove(ChatRoomCharacter[target],"ItemHands")
	InventoryRemove(ChatRoomCharacter[target],"ItemNeck")
	InventoryRemove(ChatRoomCharacter[target],"ItemMouth")
	InventoryRemove(ChatRoomCharacter[target],"ItemMouth2")
	InventoryRemove(ChatRoomCharacter[target],"ItemMouth3")
	InventoryRemove(ChatRoomCharacter[target],"ItemTorso")
	InventoryRemove(ChatRoomCharacter[target],"ItemLegs")
	InventoryRemove(ChatRoomCharacter[target],"ItemFeet")
	InventoryRemove(ChatRoomCharacter[target],"ItemBoots")
	InventoryRemove(ChatRoomCharacter[target],"ItemNipplesPiercings")
	InventoryRemove(ChatRoomCharacter[target],"ItemPelvis")
	InventoryRemove(ChatRoomCharacter[target],"ItemHead")
	InventoryRemove(ChatRoomCharacter[target],"ItemDevices")
}

function removeClothes(target, removeUnderwear = true){
	InventoryRemove(ChatRoomCharacter[target],"Cloth")
	InventoryRemove(ChatRoomCharacter[target],"ClothLower")
	InventoryRemove(ChatRoomCharacter[target],"ClothAccessory")
	InventoryRemove(ChatRoomCharacter[target],"Suit")
	InventoryRemove(ChatRoomCharacter[target],"SuitLower")
	InventoryRemove(ChatRoomCharacter[target],"Gloves")
	InventoryRemove(ChatRoomCharacter[target],"Shoes")
	InventoryRemove(ChatRoomCharacter[target],"Hat")
	if (removeUnderwear) {
		InventoryRemove(ChatRoomCharacter[target],"Socks")
		InventoryRemove(ChatRoomCharacter[target],"Bra")
		InventoryRemove(ChatRoomCharacter[target],"Panties")
	}
}

function dollify(targetMemberNumber, mustKneel=false, mustStand = false) {
	dressLike(targetMemberNumber,dress="doll")
	for (var R = 0; R < ChatRoomCharacter.length; R++) {
		if (ChatRoomCharacter[R].MemberNumber == targetMemberNumber) {

			// Pose
			if (mustKneel) {CharacterSetActivePose(ChatRoomCharacter[R],"Kneel")}
			if (mustStand) {CharacterSetActivePose(ChatRoomCharacter[R],null)}
			//InventoryWear(ChatRoomCharacter[R], "OneBarPrison","ItemDevices",hairColor)

			// Update Restrain to server
			ChatRoomCharacterUpdate(ChatRoomCharacter[R])

		}
	}
}

function dressLike(targetMemberNumber, dress = "doll", dressColor = "default", removeUnderwear = true, update = true) {
	for (var R = 0; R < ChatRoomCharacter.length; R++) {
		if (ChatRoomCharacter[R].MemberNumber == targetMemberNumber) {

			// remove all previous restrains
			// removeRestrains(R)
			memorizeClothing(ChatRoomCharacter[R])
			removeClothes(R, removeUnderwear)

			// Get the hair color
			if (dressColor == "hair" || dress == "doll" || dress == "talkingDoll") {
				for (var ii = 0; ii < ChatRoomCharacter[R].Appearance.length; ii++) {
					if (ChatRoomCharacter[R].Appearance[ii].Asset.Group.Name == 'HairBack') {
						dressColor = ChatRoomCharacter[R].Appearance[ii].Color
						break;
					}
				}
			} else if (!dressColor.startsWith("#")) {
				dressColor = "default"
			}

			if (dress == "doll" || dress == "talkingDoll") {


				// remove all previous restrains
				removeRestrains(R)

				// Restrain
				//InventoryWear(ChatRoomCharacter[R], "LatexSkirt2","BodyLower",dressColor) //ass
				//InventoryWear(ChatRoomCharacter[R], "Catsuit","Suit",baseBlack)
				//InventoryWear(ChatRoomCharacter[R], "Catsuit","SuitLower",baseBlack)
				//InventoryWear(ChatRoomCharacter[R], "LatexSkirt2","BodyLower",dressColor) // nipple
				InventoryWear(ChatRoomCharacter[R], "LatexSocks1","Socks",dressColor)
				InventoryWear(ChatRoomCharacter[R], "LatexCorset1","Bra",dressColor)
				InventoryWear(ChatRoomCharacter[R], "ThighHighLatexHeels","ItemBoots",dressColor)
				//InventoryWear(ChatRoomCharacter[R], "Catsuit","Gloves",dressColor)
				InventoryWear(ChatRoomCharacter[R], "BoxTieArmbinder","ItemArms",dressColor,100)
				//InventoryWear(ChatRoomCharacter[R], "LatexSkirt2","BodyLower",dressColor) //ItemHands
        if (dress != "talkingDoll") {
  				InventoryWear(ChatRoomCharacter[R], "ClothStuffing","ItemMouth",dressColor)
  				InventoryWear(ChatRoomCharacter[R], "HarnessPanelGag","ItemMouth2",dressColor)
  				InventoryWear(ChatRoomCharacter[R], "LatexPostureCollar","ItemMouth3",dressColor)
        }
				InventoryWear(ChatRoomCharacter[R], "LatexBlindfold","ItemHead",dressColor)
				InventoryWear(ChatRoomCharacter[R], "LatexSkirt1","ClothLower",dressColor)

				InventoryWear(ChatRoomCharacter[R], "SpreaderMetal","ItemFeet",dressColor)
				//InventoryWear(ChatRoomCharacter[R], "LeatherLegCuffs","ItemFeet",dressColor)


			} else if (dress == "maid") {
				InventoryWear(ChatRoomCharacter[R], "Socks5","Socks","#d2d2d2")
				InventoryWear(ChatRoomCharacter[R], "Shoes4","Shoes")
				InventoryWear(ChatRoomCharacter[R], "MaidOutfit1","Cloth")
				InventoryWear(ChatRoomCharacter[R], "FrillyApron","ClothAccessory")
				InventoryWear(ChatRoomCharacter[R], "MaidHairband1","Hat")
				InventoryWear(ChatRoomCharacter[R], "MaidCollar","ItemNeck")


			} else if (dress == "cow") {
        //InventoryWear(ChatRoomCharacter[R], "CowPrintedBra","Bra")
        InventoryWear(ChatRoomCharacter[R], "CowPrintedPanties","Panties")
				InventoryWear(ChatRoomCharacter[R], "Horns2","HairAccessory1","#FFFFFF")
				InventoryWear(ChatRoomCharacter[R], "LeatherArmbinder","ItemArms","default", 50)
				InventoryWear(ChatRoomCharacter[R], "PonyBoots","Shoes")
				InventoryWear(ChatRoomCharacter[R], "CowPrintedSocks","Socks")
				InventoryWear(ChatRoomCharacter[R], "CowPrintedGloves","Gloves")
				InventoryWear(ChatRoomCharacter[R], "Cowtail","ItemButt")
				InventoryWear(ChatRoomCharacter[R], "LeatherStrapHarness","ItemTorso")
				//InventoryGet(ChatRoomCharacter[R], "ItemArms").Property = {Type: "Strap", Difficulty: 3}

			} else if (dress == "pony") {
				InventoryWear(ChatRoomCharacter[R], "HorsetailPlug","ItemButt",dressColor) //HorsetailPlug1
				InventoryWear(ChatRoomCharacter[R], "LeatherArmbinder","ItemArms",dressColor,50)
				InventoryWear(ChatRoomCharacter[R], "HarnessPonyBits","ItemMouth",dressColor)
				InventoryWear(ChatRoomCharacter[R], "PonyBoots","Shoes",dressColor)
				InventoryWear(ChatRoomCharacter[R], "LeatherHarness","ItemTorso",dressColor)

			} else if (dress == "cat"|| dress == "kitty") {
				InventoryWear(ChatRoomCharacter[R], "TailButtPlug","ItemButt",dressColor)
				InventoryWear(ChatRoomCharacter[R], "BitchSuit","ItemArms",dressColor)
				InventoryWear(ChatRoomCharacter[R], "KittyGag","ItemMouth2",dressColor)
				//InventoryWear(ChatRoomCharacter[R], "ClothStuffing","ItemMouth")
				InventoryWear(ChatRoomCharacter[R], "LeatherChoker","ItemNeck")
				InventoryWear(ChatRoomCharacter[R], "CollarBell","ItemNeckAccessories")
				//InventoryWear(ChatRoomCharacter[R], "HarnessBallGag","ItemMouth",dressColor)
				InventoryWear(ChatRoomCharacter[R], "Ears2","HairAccessory1",dressColor)

			} else if (dress == "puppy" || dress == "dog") {
				InventoryWear(ChatRoomCharacter[R], "WolfTailStrap3","TailStraps",dressColor) //PuppyTailStrap1 PuppyTailStrap WolfTailStrap3
				InventoryWear(ChatRoomCharacter[R], "BitchSuit","ItemArms",dressColor)
				//InventoryWear(ChatRoomCharacter[R], "KittyGag","ItemMouth2",dressColor)
				//InventoryWear(ChatRoomCharacter[R], "DogMuzzleExposed","ItemMouth",dressColor)
				//InventoryWear(ChatRoomCharacter[R], "XLBoneGag","ItemMouth",dressColor)
				InventoryWear(ChatRoomCharacter[R], "LeatherChoker","ItemNeck",dressColor)
				//InventoryWear(ChatRoomCharacter[R], "CollarBell","ItemNeckAccessories")
				//InventoryWear(ChatRoomCharacter[R], "HarnessBallGag","ItemMouth",dressColor)
				InventoryWear(ChatRoomCharacter[R], "PuppyEars1","HairAccessory1",dressColor)

			} else if (dress == "trainer") {
        InventoryWear(ChatRoomCharacter[R], "Jeans1", "ClothLower", "#bbbbbb");
        InventoryWear(ChatRoomCharacter[R], "Boots1", "Shoes", "#3d0200");
        InventoryWear(ChatRoomCharacter[R], "Gloves1", "Gloves", "#cccccc");
        InventoryWear(ChatRoomCharacter[R], "TShirt1", "Cloth", "#aa8080");
        InventoryWear(ChatRoomCharacter[R], "Beret1", "Hat", "#202020");

			} else if (dress == "mistress") {
        InventoryWear(ChatRoomCharacter[R], "MistressBoots", "Shoes", dressColor);
        InventoryWear(ChatRoomCharacter[R], "MistressGloves", "Gloves", dressColor);
        InventoryWear(ChatRoomCharacter[R], "MistressTop", "Cloth", dressColor);
        InventoryWear(ChatRoomCharacter[R], "MistressBottom", "ClothLower", dressColor);
			}

			// Update Restrain to server
			if (update) { ChatRoomCharacterUpdate(ChatRoomCharacter[R]) }

		}
	}
}


function OnlineReputationGet(target,RepType) {
	for (var R = 0; R < target.Reputation.length; R++) {
		if (target.Reputation[R].Type == RepType)
		return parseInt(target.Reputation[R].Value);
	}
	return 0;
}


function free(targetMemberNumber, update = true, reapplyCloth = true) {
	//punishList.splice( punishList.indexOf(targetMemberNumber), 1 );
	for (var R = 0; R < ChatRoomCharacter.length; R++) {
		if (ChatRoomCharacter[R].MemberNumber == targetMemberNumber) {
			removeRestrains(R)
			if (reapplyCloth) {reapplyClothing(ChatRoomCharacter[R])}
			if (update) { ChatRoomCharacterUpdate(ChatRoomCharacter[R]) }
			//ServerSend("ChatRoomChat", { Content: "*" + ChatRoomCharacter[R].Name + ", your punishment is over. From now on, try to behave like a good girl.", Type: "Emote", Target: ChatRoomCharacter[R].MemberNumber} );
		}
	}
}


function dollifyAll(excludeMemberNumber = -1) {
	for (jj = 0; jj < ChatRoomCharacter.length; jj++) {
		if (ChatRoomCharacter[jj].MemberNumber != Player.MemberNumber && ChatRoomCharacter[jj].MemberNumber != excludeMemberNumber) {
			dollify(ChatRoomCharacter[jj].MemberNumber)
		}
	}
}

function isExposed(C, ignoreItemArray = []) {
  if (InventoryAllow(C, ["AccessBreast", "AccessVulva"]) && !customInventoryGroupIsBlocked(C, "ItemBreast") && !customInventoryGroupIsBlocked(C, "ItemNipples") && !customInventoryGroupIsBlocked(C, "ItemVulva", ignoreItemArray)) {
    return true
  }
  return false
}


function customInventoryGroupIsBlocked(C, GroupName, ignoreItemArray = []) {

	// Items can block each other (hoods blocks gags, belts blocks eggs, etc.)
	for (var E = 0; E < C.Appearance.length; E++) {
    if (ignoreItemArray.includes(C.Appearance[E].Asset.Name)) continue;
		if (!C.Appearance[E].Asset.Group.Clothing && (C.Appearance[E].Asset.Block != null) && (C.Appearance[E].Asset.Block.includes(GroupName))) return true;
		if (!C.Appearance[E].Asset.Group.Clothing && (C.Appearance[E].Property != null) && (C.Appearance[E].Property.Block != null) && (C.Appearance[E].Property.Block.indexOf(GroupName) >= 0)) return true;
	}

	// Nothing is preventing the group from being used
	return false;

}

//-------------------------------------------------------------------------------------------------------------------------
clothMemoryList = {}

function memorizeClothing(char) {
	clothMemoryList[char.MemberNumber] = char.Appearance.slice(0)
}


function reapplyClothing(char, update=true) {
	if (char.MemberNumber in clothMemoryList) {
		char.Appearance = clothMemoryList[char.MemberNumber].slice(0)
		if (update) {
			CharacterRefresh(char);
			ChatRoomCharacterUpdate(char)
		}
		delete clothMemoryList[char.MemberNumber]
	}
}

function getCharByName(name) {
	for (var i = 0; i < ChatRoomCharacter.length; i++) {
		if (ChatRoomCharacter[i].Name == name) {
			return ChatRoomCharacter[i]
		}
	}
	return false
}
