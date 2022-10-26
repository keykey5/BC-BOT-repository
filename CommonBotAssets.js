// AUTORELOG -------------------------------------------------------------------------------------
// This code allows you to autorelog after a disconnection. 

// You need to uncomment the following lines and write the required information.
// BOTAccountDict = {}
// BOTAccountDict[<MemeberNumber>] = {}
// BOTAccountDict[<MemeberNumber>].AccountName = "<accountname>"
// BOTAccountDict[<MemeberNumber>].Password = "<password>"


ServerSocket.on("connect", ServerConnect); //ServerConnect modified below for auto-relog

function ServerConnect() {
	ServerSetConnected(true);
	ServerSend("AccountLogin", { AccountName: BOTAccountDict[Player.MemberNumber].AccountName, Password: BOTAccountDict[Player.MemberNumber].Password });
}


// -----------------------------------------------------------------------------------------------


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
	vulvaIntensity = 3
	buttIntensity = 1
	lastActivity = Date.now()
	allowedOrgasmNum = 0
}
if (personMagicData.prototype.rules == null) {
  personMagicData.prototype.rules = []
}

if (typeof customerList === 'undefined') {
  resetCustomerList()
}

function resetCustomerList() {
	customerList = {}
  customerList[Player.MemberNumber] = new personMagicData()
  customerList[Player.MemberNumber].role = "Bot"
  customerList[Player.MemberNumber].rules = []
}

// -----------------------------------------------------------------------------------------------

restrainsLocationList = ["ItemVulva","ItemVulvaPiercings","ItemButt","ItemArms","ItemHands","ItemNeck","ItemMouth","ItemMouth2","ItemMouth3","ItemTorso","ItemBreast","ItemLegs",
  "ItemFeet","ItemBoots","ItemNipples","ItemNipplesPiercings","ItemPelvis","ItemHead","ItemDevices","ItemEars"]

clothesLocationList = ["Cloth","ClothLower","ClothAccessory","Suit","SuitLower","Corset","Gloves","Shoes","Hat","Socks","Bra","Panties","Necklace","RightAnklet","LeftAnklet","Mask","HairAccessory1",
  "HairAccessory2","HairAccessory3"]

function freeAll(reapplyCloth = false) {
	for (var R = 0; R < ChatRoomCharacter.length; R++) {
		removeRestrains(R)
		if (reapplyCloth) {reapplyClothing(ChatRoomCharacter[R])}
		ChatRoomCharacterUpdate(ChatRoomCharacter[R])
	}
	ServerSend("ChatRoomChat", { Content: "*Everyone has been freed.", Type: "Emote"} );
}

function removeRestrains(char){
  target = getCharacterObject(char)

	InventoryRemove(target,"ItemVulva")
 	InventoryRemove(target,"ItemVulvaPiercings")
	InventoryRemove(target,"ItemButt")
	InventoryRemove(target,"ItemArms")
	InventoryRemove(target,"ItemHands")
	InventoryRemove(target,"ItemNeck")
	InventoryRemove(target,"ItemMouth")
	InventoryRemove(target,"ItemMouth2")
	InventoryRemove(target,"ItemMouth3")
	InventoryRemove(target,"ItemTorso")
	InventoryRemove(target,"ItemBreast")
	InventoryRemove(target,"ItemLegs")
	InventoryRemove(target,"ItemFeet")
	InventoryRemove(target,"ItemBoots")
	InventoryRemove(target,"ItemNipples")
	InventoryRemove(target,"ItemNipplesPiercings")
	InventoryRemove(target,"ItemPelvis")
	InventoryRemove(target,"ItemHead")
	InventoryRemove(target,"ItemDevices")
  InventoryRemove(target,"ItemEars")
}

function removeClothes(char, removeUnderwear = true, removeCosplay = false){
  target = getCharacterObject(char)
	InventoryRemove(target,"Cloth")
	InventoryRemove(target,"ClothLower")
	InventoryRemove(target,"ClothAccessory")
	InventoryRemove(target,"Suit")
	InventoryRemove(target,"SuitLower")
	InventoryRemove(target,"Gloves")
	InventoryRemove(target,"Shoes")
	InventoryRemove(target,"Hat")
	InventoryRemove(target,"Necklace")
	InventoryRemove(target,"RightAnklet")
	InventoryRemove(target,"LeftAnklet")
  InventoryRemove(target,"Mask")
	if (removeUnderwear) {
		InventoryRemove(target,"Socks")
		InventoryRemove(target,"Bra")
		InventoryRemove(target,"Panties")
  	InventoryRemove(target,"Corset")
	}
  if (removeCosplay) {
    // Hair accessory 1: Ears & Accessories
	  // Hair accessory 2: Ears only
	  // Hair accessory 3: Accessories only
    InventoryRemove(target,"HairAccessory1")
    InventoryRemove(target,"HairAccessory2")
    InventoryRemove(target,"HairAccessory3")
    InventoryRemove(target,"TailStraps")
    InventoryRemove(target,"Wings")
  }
}

function dollify(char, mustKneel=false, mustStand = false) {
  target = getCharacterObject(char)
	dressLike(target, dress="doll")
	// Pose
	if (mustKneel) {CharacterSetActivePose(target,"Kneel")}
	if (mustStand) {CharacterSetActivePose(target,null)}
	//InventoryWear(ChatRoomCharacter[R], "OneBarPrison","ItemDevices",hairColor)

	// Update Restrain to server
	ChatRoomCharacterUpdate(target)
}


function dressLike(char, dress = "doll", dressColor = "default", removeUnderwear = true, removeCosplay = false, update = true) {
  target = getCharacterObject(char)

	// remove all previous restrains
	removeRestrains(target)
	memorizeClothing(target)
	removeClothes(target, removeUnderwear, removeCosplay)

	// Get the hair color
	if (dressColor == "hair" || dress == "doll" || dress == "talkingDoll") {
		for (var ii = 0; ii < target.Appearance.length; ii++) {
			if (target.Appearance[ii].Asset.Group.Name == 'HairFront') {
				dressColor = target.Appearance[ii].Color
        if (!(typeof dressColor === 'string')) {
            dressColor = dressColor[0];
        }
				break;
			}
		}
	} else if (!dressColor.startsWith("#")) {
		dressColor = "default"
	}

  if (dress == "doll") {

    InventoryWear(target, "Irish8Cuffs","ItemFeet",dressColor,24)
    //{"Group":"ItemLegs","Name":"SeamlessHobbleSkirt","Color":"#222222","Difficulty":24
    InventoryWear(target, "SeamlessHobbleSkirt","ItemLegs",dressColor,24)
    //{"Group":"ItemBoots","Name":"BalletWedges","Color":"Default","Difficulty":16
    InventoryWear(target, "BalletWedges","ItemBoots",dressColor,16)
    //{"Group":"ItemMouth","Name":"DeepthroatGag","Color":"#404040","Difficulty":15
    InventoryWear(target, "DeepthroatGag","ItemMouth",dressColor,15)
    //{"Group":"ItemMouth2","Name":"HarnessPanelGag","Color":"#404040","Difficulty":16
    InventoryWear(target, "HarnessPanelGag","ItemMouth2",dressColor,16)
    //{"Group":"ItemMouth3","Name":"StitchedMuzzleGag","Color":"Default","Difficulty":15
    InventoryWear(target, "StitchedMuzzleGag","ItemMouth3",dressColor,15)
    //{"Group":"ItemArms","Name":"ArmbinderJacket","Color":["#B23E46","#0A0A0A","Default"],"Difficulty":22
    InventoryWear(target, "ArmbinderJacket","ItemArms",[dressColor,"#0A0A0A","Default"],22)
    //console.log(target.MemberNumber + " - Arms - " + InventoryGet(target, "ItemArms").Color)
    //{"Group":"ItemHood","Name":"KirugumiMask","Color":["#9A7F76","Default","Default","#cc33cc"],"Difficulty":25,"Property":{"Type":"e2m3b1br0op2ms0","Difficulty":15,"Block":["ItemMouth","ItemMouth2","ItemMouth3","ItemHead","ItemNose","ItemEars"],"Effect":["BlindHeavy","Prone","BlockMouth"],"Hide":["Glasses","ItemMouth","ItemMouth2","ItemMouth3","Mask","ItemHead"],"HideItem":["ItemHeadSnorkel"]}}]
    InventoryWear(target, "KirugumiMask","ItemHood",["#9A7F76","Default","Default",dressColor],25)
    //console.log(target.MemberNumber + " - Hood - " + InventoryGet(target, "ItemHood").Color)
    InventoryGet(target, "ItemHood").Property = {"Type":"e2m3b1br0op2ms0","Difficulty":15,"Effect":["BlindHeavy","Prone","BlockMouth"],"Hide":["Glasses","ItemMouth","ItemMouth2","ItemMouth3","Mask","ItemHead"],"HideItem":["ItemHeadSnorkel"]}


  } else if (dress == "doll2" || dress == "talkingDoll") {

		// Restrain
		//InventoryWear(target, "LatexSkirt2","BodyLower",dressColor) //ass
		//InventoryWear(target, "Catsuit","Suit",baseBlack)
		//InventoryWear(target, "Catsuit","SuitLower",baseBlack)
		//InventoryWear(target, "LatexSkirt2","BodyLower",dressColor) // nipple
		InventoryWear(target, "LatexSocks1","Socks",dressColor)
		InventoryWear(target, "LatexCorset1","ItemTorso",dressColor)
		InventoryWear(target, "ThighHighLatexHeels","ItemBoots",dressColor)
		//InventoryWear(target, "Catsuit","Gloves",dressColor)
		InventoryWear(target, "BoxTieArmbinder","ItemArms",dressColor,100)
		//InventoryWear(target, "LatexSkirt2","BodyLower",dressColor) //ItemHands
    if (dress != "talkingDoll") {
			InventoryWear(target, "ClothStuffing","ItemMouth",dressColor)
			InventoryWear(target, "HarnessPanelGag","ItemMouth2",dressColor)
			InventoryWear(target, "LatexPostureCollar","ItemMouth3",dressColor)
    }
		InventoryWear(target, "LatexBlindfold","ItemHead",dressColor)
		InventoryWear(target, "LatexSkirt1","ClothLower",dressColor)

		InventoryWear(target, "SpreaderMetal","ItemFeet",dressColor)
		//InventoryWear(target, "LeatherLegCuffs","ItemFeet",dressColor)


	} else if (dress == "maid") {
		InventoryWear(target, "Socks5","Socks","#d2d2d2")
		InventoryWear(target, "Shoes4","Shoes")
		InventoryWear(target, "MaidOutfit1","Cloth")
		InventoryWear(target, "FrillyApron","ClothAccessory")
		InventoryWear(target, "MaidHairband1","Hat")
		InventoryWear(target, "MaidCollar","ItemNeck")


	} else if (dress == "cow") {
    //InventoryWear(target, "CowPrintedBra","Bra")
    InventoryWear(target, "CowPrintedPanties","Panties")
		InventoryWear(target, "CowHorns","HairAccessory1")
		InventoryWear(target, "BoxTieArmbinder","ItemArms","default", 50)
		InventoryWear(target, "PonyBoots","Shoes")
		InventoryWear(target, "CowPrintedSocks","Socks")
		InventoryWear(target, "CowPrintedGloves","Gloves")
		InventoryWear(target, "Cowtail","ItemButt")
		InventoryWear(target, "LeatherStrapHarness","ItemTorso")
		//InventoryGet(target, "ItemArms").Property = {Type: "Strap", Difficulty: 3}

	} else if (dress == "pony") {
		InventoryWear(target, "HorsetailPlug","ItemButt",dressColor) //HorsetailPlug1
		InventoryWear(target, "LeatherArmbinder","ItemArms",dressColor,50)
		InventoryWear(target, "HarnessPonyBits","ItemMouth",dressColor)
		InventoryWear(target, "PonyBoots","Shoes",dressColor)
		InventoryWear(target, "LeatherHarness","ItemTorso",dressColor)

  	} else if (dress == "pony elegant") {
		InventoryWear(target, "HorsetailPlug","ItemButt",dressColor) //HorsetailPlug1
		InventoryWear(target, "LeatherArmbinder","ItemArms",dressColor,50)
		InventoryWear(target, "HarnessPonyBits","ItemMouth",dressColor)
		InventoryWear(target, "PonyBoots","Shoes",dressColor)
		InventoryWear(target, "Corset5","Corset",dressColor)
		InventoryWear(target, "PonyEars1","HairAccessory2",dressColor)
		InventoryWear(target, "LatexSocks1","Socks",dressColor)

 	} else if (dress == "pony race") {
		InventoryWear(target, "HorsetailPlug","ItemButt",dressColor) //HorsetailPlug1
		InventoryWear(target, "LeatherArmbinder","ItemArms",dressColor,50)
		InventoryWear(target, "HarnessPonyBits","ItemMouth",dressColor)
		InventoryWear(target, "PonyBoots","Shoes",dressColor)
		InventoryWear(target, "Corset4","Corset",dressColor)
		InventoryWear(target, "PonyEars1","HairAccessory2",dressColor)
		InventoryWear(target, "HarnessPanties2","ItemPelvis",dressColor)
	  InventoryWear(target, "HarnessBra2","Bra",dressColor)

	} else if (dress == "cat"|| dress == "kitty") {
		InventoryWear(target, "TailButtPlug","ItemButt",dressColor)
		InventoryWear(target, "BitchSuit","ItemArms",dressColor)
		InventoryWear(target, "KittyGag","ItemMouth2",dressColor)
		//InventoryWear(target, "ClothStuffing","ItemMouth")
		InventoryWear(target, "LeatherChoker","ItemNeck")
		InventoryWear(target, "CollarBell","ItemNeckAccessories")
		//InventoryWear(target, "HarnessBallGag","ItemMouth",dressColor)
		InventoryWear(target, "Ears2","HairAccessory1",dressColor)

	} else if (dress == "puppy" || dress == "dog") {
		InventoryWear(target, "WolfTailStrap3","TailStraps",dressColor) //PuppyTailStrap1 PuppyTailStrap WolfTailStrap3
		InventoryWear(target, "BitchSuit","ItemArms",dressColor)
		//InventoryWear(target, "KittyGag","ItemMouth2",dressColor)
		//InventoryWear(target, "DogMuzzleExposed","ItemMouth",dressColor)
		//InventoryWear(target, "XLBoneGag","ItemMouth",dressColor)
		InventoryWear(target, "LeatherChoker","ItemNeck",dressColor)
		//InventoryWear(target, "CollarBell","ItemNeckAccessories")
		//InventoryWear(target, "HarnessBallGag","ItemMouth",dressColor)
		InventoryWear(target, "PuppyEars1","HairAccessory1",dressColor)

	} else if (dress == "office") {

		if (ReputationCharacterGet(target,"Dominant")>=50) {
			InventoryWear(target, "PencilSkirt","ClothLower","#202020")
		} else {
			InventoryWear(target, "ShortPencilSkirt","ClothLower","#202020")
		}

		if (ReputationCharacterGet(target,"Dominant")>=90) {
			InventoryWear(target, "AdmiralTop","Cloth",["#202020","#808080","Default"])
		} else {
			rnd = Math.floor(Math.random() * 3 + 1)
			if (rnd == 1) {
				InventoryWear(target, "LeatherCropTop","Cloth")
			} else if (rnd == 2) {
				InventoryWear(target, "ShoulderlessTop","Cloth")
			} else if (rnd == 3) {
				InventoryWear(target, "ComfyTop","Cloth")
			}
		}

		rnd = Math.floor(Math.random() * 3 + 1)
		if (rnd == 1) {
			InventoryWear(target, "AnkleStrapShoes","Shoes","#090000")
		} else if (rnd == 2) {
			InventoryWear(target, "Heels2","Shoes","#090000")
		} else if (rnd == 3) {
			InventoryWear(target, "Shoes5","Shoes","#0A0A0A")
		}


	} else if (dress == "trainer") {
		InventoryWear(target, "Jeans1", "ClothLower", "#bbbbbb");
		InventoryWear(target, "Boots1", "Shoes", "#3d0200");
		InventoryWear(target, "TShirt1", "Cloth", "#aa8080");
		InventoryWear(target, "Beret1", "Hat", "#202020");
		InventoryWear(target, "Bandana", "Necklace");

	} else if (dress == "trainer sub") {
		InventoryWear(target, "JeansShorts", "ClothLower", "#838383");
		InventoryWear(target, "Boots1", "Shoes", "#3d0200");
		InventoryWear(target, "Beret1", "Hat", "#202020");
		InventoryWear(target, "SexyBeachPanties1", "Panties");
		InventoryWear(target, "SexyBeachBra1", "Bra");
		InventoryWear(target, "Bandana", "Necklace");

	} else if (dress == "mistress") {
		InventoryWear(target, "MistressBoots", "Shoes", dressColor);
		InventoryWear(target, "MistressGloves", "Gloves", dressColor);
		InventoryWear(target, "MistressTop", "Cloth", dressColor);
		InventoryWear(target, "MistressBottom", "ClothLower", dressColor);

	} else if (dress == "concubine" || dress == "temple offering" || dress == "temple") {
		InventoryWear(target, "HaremBra", "Bra", dressColor);
		InventoryWear(target, "HaremPants", "ClothLower", dressColor);

		if (dress == "concubine" || dress == "temple offering") {
			InventoryWear(target, "FaceVeil", "Mask", dressColor);
			InventoryWear(target, "BarefootSandals1", "Shoes", dressColor);
		} else {
			InventoryWear(target, "Dress2", "Cloth", dressColor);
			InventoryWear(target, "Sandals", "Shoes", dressColor);
		}
	}

	// Update Restrain to server
	if (update) { ChatRoomCharacterUpdate(target) }

}



function free(char, update = true, reapplyCloth = true) {
  target = getCharacterObject(char)
	//punishList.splice( punishList.indexOf(targetMemberNumber), 1 );
	removeRestrains(target)
	if (reapplyCloth) {reapplyClothing(target)}
	if (update) { ChatRoomCharacterUpdate(target) }
	//ServerSend("ChatRoomChat", { Content: "*" + ChatRoomCharacter[R].Name + ", your punishment is over. From now on, try to behave like a good girl.", Type: "Emote", Target: ChatRoomCharacter[R].MemberNumber} );

}


function dollifyAll(excludeMemberNumber = -1) {
	for (jj = 0; jj < ChatRoomCharacter.length; jj++) {
		if (ChatRoomCharacter[jj].MemberNumber != Player.MemberNumber && ChatRoomCharacter[jj].MemberNumber != excludeMemberNumber) {
			dollify(ChatRoomCharacter[jj])
		}
	}
}


function isExposed(C, ignoreItemArray = []) {
  // in this case C is ChatRoomCharacter
  if (InventoryPrerequisiteMessage(C, "AccessBreast")==="" && InventoryPrerequisiteMessage(C, "AccessVulva")==="" && !customInventoryGroupIsBlocked(C, "ItemBreast") && !customInventoryGroupIsBlocked(C, "ItemNipples") && !customInventoryGroupIsBlocked(C, "ItemVulva", ignoreItemArray)) {
    return true
  }
  return false
}


function customInventoryGroupIsBlocked(C, GroupName, ignoreItemArray = []) {
  // in this case C is ChatRoomCharacter
	// Items can block each other (hoods blocks gags, belts blocks eggs, etc.)
	for (var E = 0; E < C.Appearance.length; E++) {
    if (ignoreItemArray.includes(C.Appearance[E].Asset.Name)) continue;
		if (!C.Appearance[E].Asset.Group.Clothing && (C.Appearance[E].Asset.Block != null) && (C.Appearance[E].Asset.Block.includes(GroupName))) return true;
		if (!C.Appearance[E].Asset.Group.Clothing && (C.Appearance[E].Property != null) && (C.Appearance[E].Property.Block != null) && (C.Appearance[E].Property.Block.indexOf(GroupName) >= 0)) return true;
	}

	// Nothing is preventing the group from being used
	return false;

}

function copyDress(char){
  target = getCharacterObject(char)

  copiedDress = {}
  for (var i = 0; i < target.Appearance.length; i++) {
    if (restrainsLocationList.indexOf(target.Appearance[i].Asset.Group.Name) >=0 || clothesLocationList.indexOf(target.Appearance[i].Asset.Group.Name) >=0 ) {
      copiedDress[target.Appearance[i].Asset.Group.Name] = {}
      copiedDress[target.Appearance[i].Asset.Group.Name]["Name"] = target.Appearance[i].Asset.Name
      copiedDress[target.Appearance[i].Asset.Group.Name]["Color"] = target.Appearance[i].Color
    }
  }
  console.log(copiedDress)
}

function pasteDress(char, color = "original"){
  target = getCharacterObject(char)


  removeRestrains(target)
  removeClothes(target)


  dressColor = false
  if (color == "original") {
    dressColor = false
  } else if (color == "default") {
    dressColor = "default"
  } else if (color == "hair") {
    for (var ii = 0; ii < target.Appearance.length; ii++) {
      if (target.Appearance[ii].Asset.Group.Name == 'HairFront') {
        dressColor = target.Appearance[ii].Color
        break;
      }
    }
  } else {
    dressColor = color
  }

  for (i in copiedDress) {
    InventoryWear(target, copiedDress[i]["Name"], i, (dressColor ? dressColor : copiedDress[i]["Color"]))
  }
  ChatRoomCharacterUpdate(target)
}

function getCharacterObject(char){
  // If char is a number it gets processed to be transformed into a char
  // If 0-9 it is assumed to be the position in the room.
  // If >9 it is assumed to be the MemeberNumber
  // If not a number it is returned as it is

  if (isNaN(char)) {
    return char
  } else if (char <= 9) {
    return ChatRoomCharacter[char]
  } else {
    for (var R = 0; R < ChatRoomCharacter.length; R++) {
      if (ChatRoomCharacter[R].MemberNumber == char) {
        return ChatRoomCharacter[R]
      }
    }
  }
}


function charFromMemberNumber(memberNumber) {
  var char = null;
  for (let C = 0; C < ChatRoomCharacter.length; C++) {
    if (ChatRoomCharacter[C].MemberNumber == memberNumber) {
      char = ChatRoomCharacter[C];
      break;
    }
  }
  return char
}

function charFromName(charName) {
  var char = null;
  for (let C = 0; C < ChatRoomCharacter.length; C++) {
    if (ChatRoomCharacter[C].Name == charName) {
      char = ChatRoomCharacter[C];
      break;
    }
  }
  return char
}

function charname(charObject){
	if (charObject.Nickname) {
		return charObject.Nickname
	} else {
		return charObject.Name
	}
}


//-------------------------------------------------------------------------------------------------------------------------
clothMemoryList = {}

function memorizeClothing(char) {
  // in this case char is ChatRoomCharacter
	clothMemoryList[char.MemberNumber] = char.Appearance.slice(0)
}


function reapplyClothing(char, update=true) {
  // in this case char is ChatRoomCharacter
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
		if (ChatRoomCharacter[i].Name == name || ChatRoomCharacter[i].Nickname == name) {
			return ChatRoomCharacter[i]
		}
	}
	return false
}

function InventoryBlockedOrLimitedCustomized(C, ItemAsset, ItemType) {
  // slight variation of the official function InventoryBlockedOrLimited
  Item = {"Asset": ItemAsset}
	let Blocked = InventoryIsPermissionBlocked(C, Item.Asset.DynamicName(Player), Item.Asset.DynamicGroupName, ItemType);
	let Limited = !InventoryCheckLimitedPermission(C, Item, ItemType);
	return Blocked || Limited;
}
