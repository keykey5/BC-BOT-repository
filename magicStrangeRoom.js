// SCRIPTED - Work together to reach the end - TIP: talk to each other!
// -----------------------------------------------------------------------------

activateStoryRoom()

Player.Description = `Code available here: https://discord.com/channels/554377975714414605/557728347468070912/805068547612737577
` // end of description
ServerSend("AccountUpdate", { Description: Player.Description });
ChatRoomCharacterUpdate(Player)


function activateStoryRoom() {
  resetRoom()
  storyActive = true
}

function deactivateStoryRoom() {
    resetRoom()
    storyActive = false
}

ChatRoomMessageAdditionDict["StrangeRoom"] = function(SenderCharacter, msg, data) {ChatRoomMessageStrangeRoom(SenderCharacter, msg, data)}

function ChatRoomMessageStrangeRoom(SenderCharacter, msg, data) {
  if (storyActive) {
  	if ((data.Type == "Action") && (msg.startsWith("ServerEnter"))) {
      storyStart(SenderCharacter)
    } else if ((msg.startsWith("ServerLeave")) || (msg.startsWith("ServerDisconnect")) || (msg.startsWith("ServerBan")) || (msg.startsWith("ServerKick"))) {
      if (imprisonedList.includes(SenderCharacter.MemberNumber)) {
        imprisonedList.splice(imprisonedList.indexOf(SenderCharacter.MemberNumber),1);
      } else if (charList.includes(SenderCharacter.MemberNumber)) {
        if (!imprisonedList.includes(charList[0])) {free(charList[0])}
        if (!imprisonedList.includes(charList[1])) {free(charList[1])}
        ServerSend("ChatRoomChat", { Content: "*[RESET: sorry one player left the game. It needs to be resetted.]", Type: "Emote"} );
        resetRoom()
      } else {
        storyStart(SenderCharacter)
      }
    }

    if (data.Type != null) {
      if ((data.Type == "Chat") && storyProgress == 0 && msg.toLowerCase().includes("i wish to surrender") && charList.includes(SenderCharacter.MemberNumber)) {
        if (SenderCharacter.IsKneeling()) {
          if (InventoryIsWorn(SenderCharacter, "HarnessBallGag", "ItemMouth") && InventoryIsWorn(SenderCharacter, "LeatherArmbinder", "ItemArms")) {
            partnerName = SenderCharacter.MemberNumber == charList[0] ? charDict[charList[1]].Name : charDict[charList[0]].Name
            ServerSend("ChatRoomChat", { Content: "Oh, You are so cute! And what do you think " + partnerName + "? Do you wish it too? [SAY: I wish to surrender]", Type: "Chat"} );
          } else {
            ServerSend("ChatRoomChat", { Content: "Well, that's something every good submissive wishes *giggles*. And since I promised to give you some help: you can find some nice restraints on the desk, just put them on. Have fun!", Type: "Chat"} );
          }
        } else {
          ServerSend("ChatRoomChat", { Content: "Okay, but I want you to kneel while you say that. *giggles*", Type: "Chat"} );
        }
      } else if ((data.Type == "Chat") && storyProgress == 10 && SenderCharacter.IsKneeling() && isExposed(SenderCharacter) && charList.includes(SenderCharacter.MemberNumber) && msg.toLowerCase().includes('i am sorry that i was not a true mistress and i deserve this shameful punishment')) {
        ServerSend("ChatRoomChat", { Content: "Hihi. You are so cute! Of course I will give you the code. You are such a nice pet. *giggles*", Type: "Chat"} );
        ServerSend("ChatRoomChat", { Content: "The code is: " + lockCode + ".", Type: "Whisper", Target: SenderCharacter.MemberNumber} );
      }	else if ((data.Type == "Emote") || (data.Type == "Action") || (data.Type == "Hidden" && msg.startsWith("ChatRoomBot"))) {
        commandHandler(SenderCharacter,msg)
      } else if ((data.Type == "Whisper") && InventoryIsWorn(SenderCharacter, "HarnessBallGag", "ItemMouth")) {
        if (msg.toLowerCase().includes("save me")) {
          if (storyProgress > 0) {
            ServerSend("ChatRoomChat", { Content: "Ahaha! NOW you want to be saved? Too late sweety, enjoy your new life.", Type: "Whisper", Target: SenderCharacter.MemberNumber} );
          } else {
            partnerName = SenderCharacter.MemberNumber == charList[0] ? charDict[charList[1]].Name : charDict[charList[0]].Name
            ServerSend("ChatRoomChat", { Content: "You will save yourself, but " + partnerName + " will receive the punishment in your place. Don't you want to be a good submissive for " + partnerName + "? Are you sure of your decision? If you want to think about it you can answer 'no', but don't take too much time or it may be too late. [whisper: yes or no]", Type: "Whisper", Target: SenderCharacter.MemberNumber} );
            saveSlave = 1
          }
        } else if ((msg.toLowerCase().includes("yes") && saveSlave == 1)) {
          saveSlave = 2
          ServerSend("ChatRoomChat", { Content: "Then, you will be spared sweety. Poor " + partnerName + ", seems you didn't find her worthy of your submission.", Type: "Whisper", Target: SenderCharacter.MemberNumber} );
        } else if ((msg.toLowerCase().includes("no") && saveSlave == 1)) {
          saveSlave = 0
          ServerSend("ChatRoomChat", { Content: "Hihi, it's always a pleasure seeing a good submissive understanting her place. Have fun!", Type: "Whisper", Target: SenderCharacter.MemberNumber} );
        } else if ((msg.toLowerCase().includes("yes") && saveSlave == 3)) {
          saveSlave = 0
          ServerSend("ChatRoomChat", { Content: "Oh, well. You will soon be freed then. *kiss*", Type: "Whisper", Target: SenderCharacter.MemberNumber} );
        } else if ((msg.toLowerCase().includes("no") && saveSlave == 3)) {
          saveSlave = 2
          ServerSend("ChatRoomChat", { Content: "Good, seems that " + partnerName + " has earned your devotion. You may become good slave for her.", Type: "Whisper", Target: SenderCharacter.MemberNumber} );
        }
      }
    }
  }
}



function storyStart(sender) {

  // check if all imprisoned people are in room. Sometimes they are not. Don't know why.
  tempList = imprisonedList.slice()
  for (ii = 0; ii < tempList.length; ii++) {
    check = false
    for (jj = 0; jj < ChatRoomCharacter.length; jj++) {
      if (tempList[ii] == ChatRoomCharacter[jj].MemberNumber) {
        check = true
      }
    }
    if (!check) {imprisonedList.splice(imprisonedList.indexOf(tempList[ii]),1);}
  }

  if (isExposed(sender) || sender.IsRestrained() || CharacterIsInUnderwear(sender) || sender.IsChaste() || sender.IsShackled() || sender.IsBlind() || !sender.CanTalk() || sender.IsEnclose() || sender.IsMounted() || sender.IsEgged() || sender.IsDeaf()) {
    ServerSend("ChatRoomChat", { Content: "*[To play here you have to be UNRESTRAINED and fully DRESSED. You will be kicked in 10 seconds. You can change and comeback if you want.]", Type: "Emote", Target: sender.MemberNumber} );
    console.log()
    setTimeout(function(sender) {ChatRoomAdminChatAction("Kick", sender.MemberNumber.toString())}, 10*1000, sender)
    //imprisonedList.push(sender.MemberNumber)
  } else if (sender.ItemPermission>2) {
    ServerSend("ChatRoomChat", { Content: "*[To play here you have to lower your PERMISSION. You will be kicked in 10 seconds. You can change and comeback if you want.]", Type: "Emote", Target: sender.MemberNumber} );
    setTimeout(function(sender) {ChatRoomAdminChatAction("Kick", sender.MemberNumber.toString())}, 10*1000, sender)
    //imprisonedList.push(sender.MemberNumber)
  } else if (InventoryBlockedOrLimitedCustomized(sender, AssetGet("Female3DCG","ItemDevices","SmallWoodenBox")) || InventoryBlockedOrLimitedCustomized(sender,AssetGet("Female3DCG","ItemPelvis", "PolishedChastityBelt"))) {
    ServerSend("ChatRoomChat", { Content: "**[To play here you have to give PERMISSION to use the SMALL WOODEN BOX and POLISHED CHASTITY BELT. You will be kicked in 10 seconds. You can change and comeback if you want.]", Type: "Emote", Target: sender.MemberNumber} );
    setTimeout(function(sender) {ChatRoomAdminChatAction("Kick", sender.MemberNumber.toString())}, 10*1000, sender)
  } else if (InventoryBlockedOrLimitedCustomized(sender, AssetGet("Female3DCG","ItemMisc","CombinationPadlock")))  {
    ServerSend("ChatRoomChat", { Content: "**[To play here you have to give PERMISSION to use the COMBINATION PADLOCK. You will be kicked in 10 seconds. You can change and comeback if you want.]", Type: "Emote", Target: sender.MemberNumber} );
    setTimeout(function(sender) {ChatRoomAdminChatAction("Kick", sender.MemberNumber.toString())}, 10*1000, sender)
  } else {
    ServerSend("ChatRoomChat", { Content: "*As you enter the room you feel watched. You look around but you cannot find the source of that feeling.", Type: "Emote", Target: sender.MemberNumber} );
  }
  if (ChatRoomCharacter.length - 1 - imprisonedList.length != 2) {
    ServerSend("ChatRoomChat", { Content: "*Other than the strange feeling you have, nothing is happening at the moment. For now at least.", Type: "Emote"} );
  } else if (ChatRoomCharacter.length - 1 - imprisonedList.length == 2) {
    closeRoomStory()
    ServerSend("ChatRoomChat", { Content: "*You hear the door shutting down. The two of you are now locked inside.", Type: "Emote"} );
    ServerSend("ChatRoomChat", { Content: "*You can only (explore) the room. [NOTE: use the '*' to make actions. You can also use the command '/bot']", Type: "Emote"} );
    ServerSend("ChatRoomChat", { Content: "Remember that if you are lost you can always surrender. Just say 'I wish to surrender'. Have fun!", Type: "Chat"} );
    for (ii = 0; ii < ChatRoomCharacter.length; ii++) {
      if (ChatRoomCharacter[ii].MemberNumber != Player.MemberNumber && !imprisonedList.includes(ChatRoomCharacter[ii].MemberNumber)) {
        charList.push(ChatRoomCharacter[ii].MemberNumber)
        charDict[ChatRoomCharacter[ii].MemberNumber] = ChatRoomCharacter[ii]
        charPos[ChatRoomCharacter[ii].MemberNumber] = "room1"
        mirrorInspectDict[ChatRoomCharacter[ii].MemberNumber] = 4
      }
    }
  }
}


function canMove(sender, msg) {

  // return true when player can move
  if (sender.IsKneeling() && !msg.toLowerCase().includes("crawl")) {
    ServerSend("ChatRoomChat", { Content: "*Private: You cannot walk while kneeling, you will have to (crawl to) or (crawl back).", Type: "Emote", Target: sender.MemberNumber} )
    return false
  } else if (!sender.CanWalk() && !msg.toLowerCase().includes("hop")) {
    ServerSend("ChatRoomChat", { Content: "*Private: You cannot walk, you will have to (hop to) or (hop back).", Type: "Emote", Target: sender.MemberNumber} )
    return false
  }
  return true

}


function commandHandler(sender, msg) {

  if (!charList.includes(sender.MemberNumber)) { return }
  partnerMemberNumber = sender.MemberNumber == charList[0] ? charDict[charList[1]].MemberNumber : charDict[charList[0]].MemberNumber

  if (msg.toLowerCase().includes("i wish to surrender")) {
    ServerSend("ChatRoomChat", { Content: "*Private: you have to SAY it.", Type: "Emote", Target: sender.MemberNumber} );
    return
  }

  switch (charPos[sender.MemberNumber]) {

    case "room1":
      if (msg.toLowerCase().includes("explore")) {
        ServerSend("ChatRoomChat", { Content: "*" + sender.Name + " explores the room.", Type: "Emote"} );
        backToRoom1(sender, msg)
      } else if (msg.toLowerCase().includes("desk")) {
        if (!canMove(sender,msg)) { return }
        charPos[sender.MemberNumber] = "desk"
        ServerSend("ChatRoomChat", { Content: "*" + sender.Name + " moves to the desk.", Type: "Emote"} );
        gagNum = 2
        armbinderNum = 2
        if (InventoryIsWorn(sender, "HarnessBallGag", "ItemMouth")) { gagNum = gagNum - 1 }
        if (InventoryIsWorn(charDict[partnerMemberNumber], "HarnessBallGag", "ItemMouth")) { gagNum = gagNum - 1 }
        if (InventoryIsWorn(sender, "LeatherArmbinder", "ItemArms")) { armbinderNum = armbinderNum - 1 }
        if (InventoryIsWorn(charDict[partnerMemberNumber], "LeatherArmbinder", "ItemArms")) { armbinderNum = armbinderNum - 1 }
        outMsg = "*Private: You see"
        if (gagNum || armbinderNum) {
          outMsg = outMsg + ((armbinderNum == 2) ? " two armbinders" : ((armbinderNum == 1) ? " one armbinder" : "")) + ((gagNum && armbinderNum) ? " and" : "") + ((gagNum == 2) ? " two gags" : ((gagNum == 1) ? " one gag" : "")) + "."
          outMsg = outMsg + " There are also"
        }
        outMsg = outMsg + " three drawers. You can check the one on the (left), (middle) or (right)."
        if (gagNum || armbinderNum) {
          outMsg = outMsg + " You can also" + ((armbinderNum) ? " (wear the armbinder)" : "") + ((gagNum && armbinderNum) ? " and" : "") + ((gagNum) ? " (wear the gag)" : "") + "."
        }
        outMsg = outMsg + " Or you can go (back)."
        ServerSend("ChatRoomChat", { Content: outMsg, Type: "Emote", Target: sender.MemberNumber} );
      } else if (msg.toLowerCase().includes("mirror")) {
        if (!canMove(sender,msg)) { return }
        charPos[sender.MemberNumber] = "mirror"
        ServerSend("ChatRoomChat", { Content: "*Private: It's a tall and large mirror that can reflect more than one person. What secrets may it hold? You can (inspect) it, (look) at yourself or go (back).", Type: "Emote", Target: sender.MemberNumber} );
      } else if (msg.toLowerCase().includes("plaque")) {
        if (!canMove(sender,msg)) { return }
        ServerSend("ChatRoomChat", { Content: "*Private: It is a bronze plaque with a writing: ONE HAS TO SERVE AND ONE HAS TO DOMINATE. There are also some stylized restrains drawn on the plaque.", Type: "Emote", Target: sender.MemberNumber} );
      } else if (msg.toLowerCase().includes("wooden box") && storyProgress == 50) {
        if (!canMove(sender,msg)) { return }
        charPos[sender.MemberNumber] = "wooden boxes 2"
        ServerSend("ChatRoomChat", { Content: "*Private: some of the boxes are now open. You see that they are empty... and you could easily fit inside. You can either (step inside) or you can go (back).", Type: "Emote", Target: sender.MemberNumber} );
      } else if (msg.toLowerCase().includes("wooden box")) {
        if (!canMove(sender,msg)) { return }
        charPos[sender.MemberNumber] = "wooden boxes"
        ServerSend("ChatRoomChat", { Content: "*" + sender.Name + " moves to the wooden boxes.", Type: "Emote"} );
        if (woodenBoxOpen) {
          ServerSend("ChatRoomChat", { Content: "*Private: The boxes are roughly one meter tall, one meter wide and one meter long. A person on her knees could easily fit inside. One of the boxes door is open and you can see a small tablet attached in the inside. You can either (step inside) to examine it or you can go (back).", Type: "Emote", Target: sender.MemberNumber} );
        } else {
          ServerSend("ChatRoomChat", { Content: "*Private: The boxes are roughly one meter tall, one meter wide and one meter long. A person on her knees could easily fit inside. The boxes are all closed. You can either try to (open) one or you can go (back).", Type: "Emote", Target: sender.MemberNumber} );
        }
      } else if ((msg.toLowerCase().includes("device") && deviceAvailable)) {
        if (!canMove(sender,msg)) { return }
        charPos[sender.MemberNumber] = "device"
        partnerName = sender.MemberNumber == charList[0] ? charDict[charList[1]].Name : charDict[charList[0]].Name
        if (dildoInside == 0) {
          ServerSend("ChatRoomChat", { Content: "*Private: You see three colored buttons on the wall: you can (press the red button), (press the blue button) or (press the green button). There is also a thick dildo near them. The sex toy is connected to a short chain and cannot be taken around. You can either (use the dildo on myself) or (use the dildo on " + partnerName + ").", Type: "Emote", Target: sender.MemberNumber} );
        } else if (InventoryIsWorn(charDict[dildoInside],"PolishedChastityBelt","ItemPelvis")) {
          ServerSend("ChatRoomChat", { Content: "*Private: You see three colored buttons on the wall: you can (press the red button), (press the blue button) or (press the green button). " + charDict[dildoInside].Name + " has a thick dildo stuck between her legs. The dildo is connected to a short chain, so she cannot walk away with it.", Type: "Emote", Target: sender.MemberNumber} );
        } else {
          ServerSend("ChatRoomChat", { Content: "*Private: You see three colored buttons on the wall: you can (press the red button), (press the blue button) or (press the green button).", Type: "Emote", Target: sender.MemberNumber} );
        }
      } else if (msg.toLowerCase().includes("door") && (storyProgress == 10 || storyProgress == 20)) {
        if (!canMove(sender,msg)) {
          ServerSend("ChatRoomChat", { Content: "*You cannot move.", Type: "Emote", Target: sender.MemberNumber} );
          return
         }
        partnerName = sender.MemberNumber == charList[0] ? charDict[charList[1]].Name : charDict[charList[0]].Name
        ServerSend("ChatRoomChat", { Content: "*The door of the room is now open. You can stay for a bit if you want. When you are ready you can (leave) and abandon " + partnerName + " to her destiny. [You will leave the room]", Type: "Emote", Target: sender.MemberNumber} );
      } else if (msg.toLowerCase().includes("door") && storyProgress == 30) {
        if (!canMove(sender,msg)) {
          ServerSend("ChatRoomChat", { Content: "*You cannot move.", Type: "Emote", Target: sender.MemberNumber} );
          return
         }
        if (imprisonedList.includes(sender.MemberNumber)) {
          imprisonedList.splice(imprisonedList.indexOf(sender.MemberNumber),1)
        } else if (imprisonedList.includes(charDict[partnerMemberNumber].MemberNumber) && !InventoryIsWorn(charDict[partnerMemberNumber].MemberNumber, "SmallWoodenBox", "ItemDevices")) {
          imprisonedList.splice(imprisonedList.indexOf(partnerMemberNumber),1)
        }
        if (imprisonedList.includes(charDict[partnerMemberNumber].MemberNumber)) {
          ServerSend("ChatRoomChat", { Content: "*The door of the room is now open. " + charDit[partnerMemberNumber].Name + " is still inside inside the box, have you decided to leave her here? Then if you are ready you can (leave) and abandon " + partnerName + " to her destiny. [You will leave the room]", Type: "Emote", Target: sender.MemberNumber} );
        } else {
          ServerSend("ChatRoomChat", { Content: "*The door of the room is now open. When you are ready you can both (leave) and enjoy your time together in another room. [You will leave the room]", Type: "Emote", Target: sender.MemberNumber} );
        }
      } else if (msg.toLowerCase().includes("leave") && (storyProgress == 10 || storyProgress == 20 || storyProgress == 30) && !imprisonedList.includes(sender.MemberNumber)) {
        ChatRoomAdminChatAction("Kick", sender.MemberNumber.toString())
        if (imprisonedList.includes(partnerMemberNumber)) {
          ServerSend("ChatRoomChat", { Content: "*" + charDict[partnerMemberNumber].Name + " closes the door behind her leaving you alone, forever restrained in this room.", Type: "Emote"} );
        } else {
          ServerSend("ChatRoomChat", { Content: "*" + sender.Name + " left the room.", Type: "Emote"} );
        }
        if (ChatRoomCharacter.length == imprisonedList.length + 1) {
          resetRoom()
        }
      }

      break;


    case "inside box":
        if (msg.toLowerCase().includes("crawl outside")) {
          charPos[sender.MemberNumber] = "wooden boxes"
          InventoryRemove(sender,"ItemDevices")
          ChatRoomCharacterUpdate(sender)
          if (tabletActive) {
            tabletActive = false
            ServerSend("ChatRoomChat", { Content: "*Private: When you crawl out you notice the tablet turning off. Now you can either (step inside) or (crawl inside) again or you can go (back).", Type: "Emote", Target: sender.MemberNumber} );
          } else {
            ServerSend("ChatRoomChat", { Content: "*Private: You crawl out. Now you can either (step inside) or (crawl inside) again or you can go (back).", Type: "Emote", Target: sender.MemberNumber} );
          }
        } else if (msg.toLowerCase().includes("tablet")) {
          if (!sender.CanInteract()) {
            ServerSend("ChatRoomChat", { Content: "*The tablet is turned off. Since her hands are restrained, " + sender.Name + " tries to use it pushing with her mouth. After few tries the tablet is covered in drool, but she was unable to push the power button.", Type: "Emote"} )
          } else if (dildoIntensity != 3) {
            ServerSend("ChatRoomChat", { Content: "*Private: the tablet needs power.", Type: "Emote", Target: sender.MemberNumber} )
          } else {
            ServerSend("ChatRoomChat", { Content: "*BEEP!", Type: "Emote", Target: sender.MemberNumber} );
            tabletActive = true
            setTimeout(function() {
              nextColor = correctCode[0] == 0 ? "red" : (correctCode[0] == 1 ? "blue" : "green")
              ServerSend("ChatRoomChat", { Content: "*Private: The tablet turned on and a message appeared: 'Five colors sequence needed'. The screen is now " + nextColor + ".  -waiting for input-", Type: "Emote", Target: sender.MemberNumber} );
            },2*1000)
          }
        } else if (msg.toLowerCase().includes("look around")) {
          ServerSend("ChatRoomChat", { Content: "*Private: You look around yourself. There is actually not much to see. The wooden walls are just against you and with every small movement you press against their rough surfaces. Being in such a restricted space scares you a little, but the door is open. Still, if it would close... ", Type: "Emote", Target: sender.MemberNumber} );
        }
      break;


    case "wooden boxes":
      if (msg.toLowerCase().includes("back") || msg.toLowerCase().includes("explore")) {
        backToRoom1(sender, msg)
      } else if (woodenBoxOpen && (msg.toLowerCase().includes("step inside"))) {
        if (sender.IsKneeling()) {
          ServerSend("ChatRoomChat", { Content: "*Private: you have to (crawl inside).", Type: "Emote", Target: sender.MemberNumber} );
        } else {
          ServerSend("ChatRoomChat", { Content: "*Private: the box is too small. You have get down and crawl inside.", Type: "Emote", Target: sender.MemberNumber} );
        }
      } else if (woodenBoxOpen && sender.IsKneeling() && (msg.toLowerCase().includes("crawl inside"))) {
        charPos[sender.MemberNumber] = "inside box";
        ServerSend("ChatRoomChat", { Content: "*Private: You crawl inside the box while a shiver runs down your spine. The tablet is now in front of you but it's switched off and you don't know how to turn it on. You can (crawl outside), use the (tablet) or (look around).", Type: "Emote", Target: sender.MemberNumber} );
        InventoryWear(sender, "SmallWoodenBox","ItemDevices","Default",100)
        InventoryLock(sender, InventoryGet(sender, "ItemDevices"), { Asset: AssetGet("Female3DCG", "ItemMisc", "CombinationPadlock")}, Player.MemberNumber)
        InventoryGet(sender, "ItemDevices").Property.CombinationNumber = lockCode
        ChatRoomCharacterUpdate(sender)
      } else if (!woodenBoxOpen && (msg.toLowerCase().includes("open"))) {
        if (!sender.CanInteract()) {
          ServerSend("ChatRoomChat", { Content: "*Private: you arms are restrained so you can only try to push the boxes with your body. You try for a bit, but then you see that it is useless.", Type: "Emote", Target: sender.MemberNumber} );
        } else {
          ServerSend("ChatRoomChat", { Content: "*Private: You try to open one of the doors pulling with all your strength, but the door is firmly shut. You now know that you will never be able to open it. All you can do is surrender and accept it.", Type: "Emote", Target: sender.MemberNumber} );
        }
        setTimeout(function(sender) {
          ServerSend("ChatRoomChat", { Content: "*A-ah...", Type: "Emote", Target: sender.MemberNumber} );
        }, 3*1000, sender)
      } else if (msg.toLowerCase().includes("desk") || msg.toLowerCase().includes("mirror") || msg.toLowerCase().includes("device") || msg.toLowerCase().includes("wooden box")) {
        ServerSend("ChatRoomChat", { Content: "*Private: you must go (back) before you can do that.", Type: "Emote", Target: sender.MemberNumber} );
      }
      break;

    case "wooden boxes 2":
      if (msg.toLowerCase().includes("back") || msg.toLowerCase().includes("explore")) {
        backToRoom1(sender, msg)
      } else if (msg.toLowerCase().includes("step inside")) {
        if (sender.IsKneeling()) {
          ServerSend("ChatRoomChat", { Content: "*Private: you have to (crawl inside).", Type: "Emote", Target: sender.MemberNumber} );
        } else {
          ServerSend("ChatRoomChat", { Content: "*Private: the box is too small. You have get down and crawl inside.", Type: "Emote", Target: sender.MemberNumber} );
        }
      } else if (sender.IsKneeling() && (msg.toLowerCase().includes("crawl inside"))) {
        charPos[sender.MemberNumber] = "imprisoned"
        ServerSend("ChatRoomChat", { Content: "*Private: in the end you can only obendiently accept your fate. You crawl inside the box and let the door close behind. When you finally hear the locks shutting you know that there is no escape for you.", Type: "Emote", Target: sender.MemberNumber} );
        InventoryWear(sender, "SmallWoodenBox","ItemDevices","Default",100)
        InventoryLock(sender, InventoryGet(sender, "ItemDevices"), { Asset: AssetGet("Female3DCG", "ItemMisc", "CombinationPadlock")}, Player.MemberNumber)
        InventoryGet(sender, "ItemDevices").Property.CombinationNumber = lockCode
        ChatRoomCharacterUpdate(sender)
        if (charPos[partnerMemberNumber] == "imprisoned") {
          if (!imprisonedList.includes(charList[0])) imprisonedList.push(charList[0])
          if (!imprisonedList.includes(charList[1])) imprisonedList.push(charList[1])
          console.log("Ending - 'Will of Submission' for " + sender.Name + " (" + sender.MemberNumber + ") & " + charDict[partnerMemberNumber].Name + " (" + partnerMemberNumber + ").")
          setTimeout(function () {
            ServerSend("ChatRoomChat", { Content: "*Both of you demonstrated a will for submission: your fate is now sealed and your freedom is lost.", Type: "Emote"} );
            ServerSend("ChatRoomChat", { Content: "Ending - 'Will of Submission' for " + sender.Name + " (" + sender.MemberNumber + ") & " + charDict[partnerMemberNumber].Name + " (" + partnerMemberNumber + ").", Type: "Chat"} );
            setTimeout(resetRoom, 10*1000);
          }, 5*1000)
        }
      }
      break;

    case "right_drawer_open":
      if (msg.toLowerCase().includes("turn")) {
        if (!sender.CanInteract()) {
          ServerSend("ChatRoomChat", { Content: "*Private: You cannot do that, your arms are restrained.", Type: "Emote", Target: sender.MemberNumber} );
          return
        } else {
          ServerSend("ChatRoomChat", { Content: "*" + sender.Name + " turns the power control by one notch.", Type: "Emote"} );
        }

        if (dildoInside) {
          dildoIntensity = dildoIntensity + 1

          partnerName = sender.MemberNumber == charList[0] ? charDict[charList[1]].Name : charDict[charList[0]].Name
          dildoAsset = InventoryGet(charDict[partnerMemberNumber], "ItemVulva")

          if (dildoAsset == null || dildoAsset.Asset.Name != "VibratingDildo") {
            console.log('Error?')
          }

          switch (dildoIntensity) {

            case 0:
              ServerSend("ChatRoomChat", { Content: "*The dildo inside you begins to vibrate lightly.", Type: "Emote", Target: partnerMemberNumber} );
              dildoAsset.Property.Intensity = dildoIntensity
              dildoAsset.Property.Effect = ["Vibrating"]
              CharacterLoadEffect(partnerAsset)
              ChatRoomCharacterUpdate(partnerAsset)
              break;

            case 1:
              ServerSend("ChatRoomChat", { Content: "*The dildo inside you begins to vibrate moderately.", Type: "Emote", Target: partnerMemberNumber} );
              dildoAsset.Property.Intensity = dildoIntensity
              dildoAsset.Property.Effect = ["Vibrating"]
              CharacterLoadEffect(partnerAsset)
              ChatRoomCharacterUpdate(partnerAsset)
              break;

            case 2:
              ServerSend("ChatRoomChat", { Content: "*The dildo inside you begins to vibrate strongly.", Type: "Emote", Target: partnerMemberNumber} );
              dildoAsset.Property.Intensity = dildoIntensity
              dildoAsset.Property.Effect = ["Vibrating"]
              CharacterLoadEffect(partnerAsset)
              ChatRoomCharacterUpdate(partnerAsset)
              break;

            case 3:
              ServerSend("ChatRoomChat", { Content: "*The dildo inside you begins to vibrate at MAXIMUM speed.", Type: "Emote", Target: partnerMemberNumber} );
              dildoAsset.Property.Intensity = dildoIntensity
              dildoAsset.Property.Effect = ["Vibrating"]
              CharacterLoadEffect(partnerAsset)
              ChatRoomCharacterUpdate(partnerAsset)
              // if (!woodenBoxOpen) { setTimeout(openWoodenBox, 5*1000) }
              break;

            case 4:
              woodenBoxCloseMessage = ""
              // if (woodenBoxOpen) {
              //   woodenBoxCloseMessage =  " and the wooden box immediately closes";
              //   woodenBoxOpen = false
              // }
              ServerSend("ChatRoomChat", { Content: "*The dildo inside you stops" + woodenBoxCloseMessage + ".", Type: "Emote", Target: partnerMemberNumber} );
              dildoIntensity = -1
              dildoAsset.Property.Intensity = dildoIntensity
              dildoAsset.Property.Effect = []
              dildoAsset.Asset.Effect = []
              CharacterLoadEffect(partnerAsset)
              ChatRoomCharacterUpdate(partnerAsset)
              break;

          }
        } else if (deviceAvailable) {
          ServerSend("ChatRoomChat", { Content: "*You hear some noises from the dildo near the wall.", Type: "Emote"} );
        }

        if (sender.CanInteract() && (!deviceAvailable || dildoInside)) {
          ServerSend("ChatRoomChat", { Content: "*Private: ...did something happen?", Type: "Emote", Target: sender.MemberNumber} );
        }

      }
      // No "Break" so it can check also the options below.

      // TODO:
    case "middle_drawer_open":
      // if (msg.toLowerCase().includes("wear") && msg.toLowerCase().includes("dildo chastity belt")) {
      //   InventoryWear(sender, "VibratingDildo","ItemVulva","Default")
      //   InventoryGet(sender,"ItemVulva").Property = { Intensity: -1, Effect: [] }
      //   InventoryGet(sender,"ItemVulva").Asset.Effect = []
      //   InventoryWear(sender, "PolishedChastityBelt", "ItemPelvis","Default",100)
      //   InventoryGet(sender,"ItemPelvis").Property = {Restrain: null}
      //   InventoryLock(sender, InventoryGet(sender, "ItemPelvis"), { Asset: AssetGet("Female3DCG", "ItemMisc", "CombinationPadlock")}, Player.MemberNumber)
      //   InventoryGet(sender, "ItemPelvis").Property.CombinationNumber = lockCode
      //   ChatRoomCharacterUpdate(sender)
      //   ServerSend("ChatRoomChat", { Content: sender.Name + " inserts the dildo inside her pussy. Locks immediately block the item on her.", Type: "Emote", } );
      //}

      if (msg.toLowerCase().includes("button")) {
        if (dildoIntensity == 3 && charPos[sender.MemberNumber] == "middle_drawer_open") {
          if (woodenBoxOpen) {
            ServerSend("ChatRoomChat", { Content: "*Private: You press the button but nothing happens. The wooden box has already been opened.", Type: "Emote", Target: sender.MemberNumber} )
          } else {
            openWoodenBox()
          }
        } else {
          ServerSend("ChatRoomChat", { Content: "*Private: You press the button but nothing happens. It needs more power.", Type: "Emote", Target: sender.MemberNumber} )
        }
      }


    case "desk":
      if (msg.toLowerCase().includes("back") || msg.toLowerCase().includes("explore")) {
        backToRoom1(sender, msg)
      } else if (msg.toLowerCase().includes("left")) {
        ServerSend("ChatRoomChat", { Content: "*Private: You find a photo in the drawer. It's a Mistress with her slave kneeling besides her. The woman is dressed in Mistress attire and is using a crop to tease the subdued girl. They seems happy.", Type: "Emote", Target: sender.MemberNumber} );
      } else if (msg.toLowerCase().includes("middle")) {
        ServerSend("ChatRoomChat", { Content: "*Private: There is a (button) inside.", Type: "Emote", Target: sender.MemberNumber} );
        // ServerSend("ChatRoomChat", { Content: "*Private: In the drawer you find a chastity belt with a dildo attached to it. You can (wear the dildo chastity belt), but you know that it won't come of that easily.", Type: "Emote", Target: sender.MemberNumber} );
        charPos[sender.MemberNumber] = "middle_drawer_open"
      } else if (msg.toLowerCase().includes("right")) {
        charPos[sender.MemberNumber] = "right_drawer_open"
        ServerSend("ChatRoomChat", { Content: "*Private: You open the drawer on the right. You find an electronic device with a knob that you can (turn). The device is fixed to the base and you cannot move it. A label says: power control, set it to maximum.", Type: "Emote", Target: sender.MemberNumber} );
      } else if (msg.toLowerCase().includes("wear") && msg.toLowerCase().includes("armbinder")) {
        if (!sender.CanInteract()) {
          ServerSend("ChatRoomChat", { Content: "*Private: You cannot do that, your arms restrained.", Type: "Emote", Target: sender.MemberNumber} );
        } else {
          ServerSend("ChatRoomChat", { Content: "*" + sender.Name + " restrains herself with the armbinder.", Type: "Emote"} );
          InventoryWear(sender, "LeatherArmbinder", "ItemArms", "Default",80)
          ChatRoomCharacterUpdate(sender)
          story1(sender)
        }
      } else if (msg.toLowerCase().includes("wear") && msg.toLowerCase().includes("gag")) {
        //if (!sender.CanInteract()) {
        //  ServerSend("ChatRoomChat", { Content: "*Private: You cannot do that, your arms restrained.", Type: "Emote", Target: sender.MemberNumber} );
        if (InventoryIsWorn(sender, "HarnessBallGag", "ItemMouth")) {
          ServerSend("ChatRoomChat", { Content: "*Private: You cannot do that, you are already wearing a gag.", Type: "Emote", Target: sender.MemberNumber} );
        } else {
          ServerSend("ChatRoomChat", { Content: "*" + sender.Name + " puts a gag on herself.", Type: "Emote"} );
          InventoryWear(sender, "HarnessBallGag","ItemMouth","Default",80)
          ChatRoomCharacterUpdate(sender)
          story1(sender)
        }
      } else if (msg.toLowerCase().includes("desk") || msg.toLowerCase().includes("mirror") || msg.toLowerCase().includes("device") || msg.toLowerCase().includes("wooden box")) {
        ServerSend("ChatRoomChat", { Content: "*Private: you must go (back) before you can do that.", Type: "Emote", Target: sender.MemberNumber} );
      }
      break;

    case "mirror":

      if (msg.toLowerCase().includes("back") || msg.toLowerCase().includes("explore")) {
        backToRoom1(sender, msg)

      } else if (msg.toLowerCase().includes("look")) {

        partnerMemberNumber = sender.MemberNumber == charList[0] ? charDict[charList[1]].MemberNumber : charDict[charList[0]].MemberNumber
        partnerName = sender.MemberNumber == charList[0] ? charDict[charList[1]].Name : charDict[charList[0]].Name

        if (InventoryIsWorn(sender, "HarnessBallGag", "ItemMouth")) {
          // Slave
          // lookLikeSlave = [ isExposed(sender) + sender.IsKneeling() + InventoryIsWorn(sender, "HarnessBallGag", "ItemMouth") + InventoryIsWorn(sender, "LeatherArmbinder", "ItemArms") ]
          if (isExposed(sender,["PolishedChastityBelt"]) && InventoryIsWorn(sender, "HarnessBallGag", "ItemMouth") && InventoryIsWorn(sender, "LeatherArmbinder", "ItemArms")) {
            if (sender.IsKneeling() && charPos[partnerMemberNumber] == 'mirror' && dressLikeMistress(partnerMemberNumber) && InventoryIsWorn(charDict[partnerMemberNumber],"SpankingToys","ItemHands")) {
              ServerSend("ChatRoomChat", { Content: "*Private: You see yourself exposed and restrained, kneeling near a Mistress. You feel ashamed but nonetheless the image makes you proud.", Type: "Emote", Target: sender.MemberNumber} );
              ServerSend("ChatRoomChat", { Content: "*SECRET: A message appears on the mirror: 'One of you will loose her freedom. If you whisper to " + Player.Name + " (save me), you may be spared in the end, but the mistress will be doomed in your place. What to do is for you to decide'.", Type: "Emote", Target: sender.MemberNumber} );
              return // skip the part below about the partner being near you and the part about kneeling
            } else {
              ServerSend("ChatRoomChat", { Content: "*Private: You see yourself in the reflection. With your freedom taken and your body exposed for the pleasure of others, you are now a perfect servant.", Type: "Emote", Target: sender.MemberNumber} );
            }
            ServerSend("ChatRoomChat", { Content: "*SECRET: A message appears on the mirror: 'One of you will loose her freedom. If you whisper to " + Player.Name + " (save me), you may be spared in the end, but the mistress will be doomed in your place. What to do is for you to decide'.", Type: "Emote", Target: sender.MemberNumber} );
          } else if (isExposed(sender,["PolishedChastityBelt"])) {
            ServerSend("ChatRoomChat", { Content: "*Private: Looking at yourself with your body exposed you feel vulnerable and accessible.", Type: "Emote", Target: sender.MemberNumber} );
          } else if (sender.IsRestrained()) {
            ServerSend("ChatRoomChat", { Content: "*Private: Looking at yourself with the restrains makes you feel powerless. But it's not just a feeling. You are powerless.", Type: "Emote", Target: sender.MemberNumber} );
          } else {
            ServerSend("ChatRoomChat", { Content: "*Private: You look at your own reflection in the mirror: you feel beautiful.", Type: "Emote", Target: sender.MemberNumber} );
          }

          if (ReputationCharacterGet(sender,"Dominant")<=-50) {
            if (sender.IsKneeling()) {
              ServerSend("ChatRoomChat", { Content: "*Private: You look at yourself, kneeling in front of the mirror. That is the right posture for a subdued woman.", Type: "Emote", Target: sender.MemberNumber} );
            } else { // something about crawling around
              ServerSend("ChatRoomChat", { Content: "*Private: As you look your reflection standing you can't help thinking that you are not keeping a dignifying posture.", Type: "Emote", Target: sender.MemberNumber} );
            }

          }

        } else {

          // Mistress
          // lookLikeSlave = [ isExposed(sender.) + sender.IsKneeling() + InventoryIsWorn(sender, "HarnessBallGag", "ItemMouth") + InventoryIsWorn(sender, "LeatherArmbinder", "ItemArms") ]
          if (!dressLikeMistress(sender.MemberNumber) && !InventoryIsWorn(sender,"SpankingToys","ItemHands")) {
            ServerSend("ChatRoomChat", { Content: "*Private: You look at your own reflection in the mirror: you feel beautiful.", Type: "Emote", Target: sender.MemberNumber} );
          } else if (dressLikeMistress(sender.MemberNumber) && !InventoryIsWorn(sender,"SpankingToys","ItemHands")) {
            ServerSend("ChatRoomChat", { Content: "*Private: You look at your clothes, for sure you are sexy like a Mistress should be. But something is missing, your image doesn't look as powerful as it could be.", Type: "Emote", Target: sender.MemberNumber} );
          } else if (!dressLikeMistress(sender.MemberNumber) && InventoryIsWorn(sender,"SpankingToys","ItemHands")) {
            ServerSend("ChatRoomChat", { Content: "*Private: You look at yourself whipping the air with the crop in your hand. That feels powerful, but could your reflection be more sexy and provocant?", Type: "Emote", Target: sender.MemberNumber} );
          } else if (dressLikeMistress(sender.MemberNumber) && InventoryIsWorn(sender,"SpankingToys","ItemHands") && (charPos[partnerMemberNumber] != "mirror")) {
            ServerSend("ChatRoomChat", { Content: "*Private: With those clothes and the crop in your hand you look as sexy and powerful as you could ever be. You enjoy your reflection as if nothing is missing...", Type: "Emote", Target: sender.MemberNumber} );
          } else if (dressLikeMistress(sender.MemberNumber) && InventoryIsWorn(sender,"SpankingToys","ItemHands") && (charPos[partnerMemberNumber] == "mirror") && !lookLikeSlave(partnerMemberNumber)) {
            ServerSend("ChatRoomChat", { Content: "*Private: With those clothes and the crop in your hand you look as sexy and powerful as you could ever be. " + charDict[partnerMemberNumber].Name + " is on your side, but... something is off.", Type: "Emote", Target: sender.MemberNumber} );
            return // skip the part below about the partner being near you
          } else {
            ServerSend("ChatRoomChat", { Content: "*Private: In the reflection you see the image of a TRUE Mistress, with all the items that represent her: the clothes that exalt her body, the whip that rapresents her power and the tied slave that serves her.", Type: "Emote", Target: sender.MemberNumber} );
            ServerSend("ChatRoomChat", { Content: "*SECRET: A message appears on the mirror: 'A true Mistress is worthy of this advice: when you will be asked for colors, swap blue and green. And pay attention to your slave: if you don't have her real devotion, she may betray you!'.", Type: "Emote", Target: sender.MemberNumber} );
            return // skip the part below about the partner being near you
          }
        }

        if (charPos[partnerMemberNumber] == "mirror") {
          ServerSend("ChatRoomChat", { Content: "*Private: " + partnerName + " is standing near you in the reflection.", Type: "Emote", Target: sender.MemberNumber} );
        }

      } else if (msg.toLowerCase().includes("inspect")) {
        //ServerSend("ChatRoomChat", { Content: "*Private: There are two small plaque. One is too ruined to decipher.", Type: "Emote", Target: sender.MemberNumber} );
        ServerSend("ChatRoomChat", { Content: "*Private: There are two small plaque. One says: 'THE MISTRESS: sexy, powerful and served. That is a True Mistress'.", Type: "Emote", Target: sender.MemberNumber} );
        if (mirrorInspectDict[sender.MemberNumber] == 0) {
          ServerSend("ChatRoomChat", { Content: "*Private: On the other you read: '...ve admire the lies you wear'. The plaque is very dirty.", Type: "Emote", Target: sender.MemberNumber} );
        } else if (mirrorInspectDict[sender.MemberNumber] == 1) {
          ServerSend("ChatRoomChat", { Content: "*Private: On the other you read: '...ve admire the lies you wear'. All this dirt... ?.", Type: "Emote", Target: sender.MemberNumber} );
        } else if (mirrorInspectDict[sender.MemberNumber] == 2) {
          ServerSend("ChatRoomChat", { Content: "*Private: On the other you read: '...ve admire the lies you wear'. It seems...", Type: "Emote", Target: sender.MemberNumber} );
        } else if (mirrorInspectDict[sender.MemberNumber] == 3) {
          ServerSend("ChatRoomChat", { Content: "*Private: On the other you read: '...ve admire the lies you wear'. There something else written below. It's hardly noticeable. You read 'but you will be naked and bound in front of the truth'.", Type: "Emote", Target: sender.MemberNumber} );
        } else {
          ServerSend("ChatRoomChat", { Content: "*Private: On the other you read: 'THE SLAVE: admire the lies you wear, but you will be naked and bound in front of the truth'.", Type: "Emote", Target: sender.MemberNumber} );
        }
        mirrorInspectDict[sender.MemberNumber] = mirrorInspectDict[sender.MemberNumber] + 1
      } else if (msg.toLowerCase().includes("desk") || msg.toLowerCase().includes("mirror") || msg.toLowerCase().includes("device") || msg.toLowerCase().includes("wooden box")) {
        ServerSend("ChatRoomChat", { Content: "*Private: you must go (back) before you can do that.", Type: "Emote", Target: sender.MemberNumber} );
      }
      break;


    case "device":
      partnerName = sender.MemberNumber == charList[0] ? charDict[charList[1]].Name : charDict[charList[0]].Name
      if (msg.toLowerCase().includes("back") || msg.toLowerCase().includes("explore")) {
        dildoInserting = false
        if (dildoInside == sender.MemberNumber && !dildoLocked) {
          ServerSend("ChatRoomChat", { Content: "*Private: the dildo inside you is chained. You cannot walk around wearing it, you have to (take out the dildo). The only items in your reach are the three colored buttons. You can (press the <color> button).", Type: "Emote", Target: sender.MemberNumber});
        } else {
          backToRoom1(sender, msg)
        }
      } else if (msg.toLowerCase().includes("press the red button") || msg.toLowerCase().includes("press the blue button") || msg.toLowerCase().includes("press the green button")) {
        if (dildoIntensity == 3) {
          ServerSend("ChatRoomChat", { Content: "*You hear a tiny 'beep'.", Type: "Emote", Target: sender.MemberNumber});
          if (tabletActive && msg.toLowerCase().includes("press the red button")) {
            coloredButtonPushed(sender, 0);
          } else if (tabletActive && msg.toLowerCase().includes("press the blue button")) {
            coloredButtonPushed(sender, 1);
          } else if (tabletActive && msg.toLowerCase().includes("press the green button")) {
            coloredButtonPushed(sender, -1);
          }
        } else {
          ServerSend("ChatRoomChat", { Content: "*Private: You press the button but nothing happens. Probably the device does not have enough power.", Type: "Emote", Target: sender.MemberNumber} )
        }
      } else if (msg.toLowerCase().includes("dildo on myself") && dildoInside == 0) {
        asset = AssetGet("Female3DCG", "ItemVulva", "VibratingDildo")
        if (!sender.CanInteract()) {
          ServerSend("ChatRoomChat", { Content: "*Private: your hands are tied. You need someone to help you.", Type: "Emote", Target: sender.MemberNumber});
        } else if (InventoryAllow(sender, asset.Prerequisite) || !customInventoryGroupIsBlocked(sender,"ItemVulva")) {
          ServerSend("ChatRoomChat", { Content: "*" + sender.Name + " puts the thick dildo inside her pussy.", Type: "Emote"});
          ServerSend("ChatRoomChat", { Content: "*Private: the dildo is attached to a chain. Now that it is inside you, you cannot walk around the room anymore. You can (take out the dildo), or maybe there is something else near you...", Type: "Emote", Target: sender.MemberNumber});
          dildoInside = sender.MemberNumber
          InventoryWear(sender, "VibratingDildo","ItemVulva","Default")
          InventoryGet(sender,"ItemVulva").Property = { Intensity: -1, Effect: [] }
          InventoryGet(sender,"ItemVulva").Asset.Effect = []
          CharacterLoadEffect(sender)
          ChatRoomCharacterUpdate(sender)
          if (typeof checkIfDildoIsInsertedHandle !== 'undefined') {
            clearInterval(checkIfDildoIsInsertedHandle)
          }
          checkIfDildoIsInsertedHandle = setInterval(checkIfDildoIsInserted, 5*1000)
        } else {
          ServerSend("ChatRoomChat", { Content: "*Private: you cannot use it, that part of your body is blocked.", Type: "Emote", Target: sender.MemberNumber});
        }
      } else if (msg.toLowerCase().includes("dildo on " + partnerName.toLowerCase()) && dildoInside == 0) {
        asset = AssetGet("Female3DCG", "ItemVulva", "VibratingDildo")
        partnerName = sender.MemberNumber == charList[0] ? charDict[charList[1]].Name : charDict[charList[0]].Name
        for (R = 0; R < ChatRoomCharacter.length; R++) {
          if (partnerMemberNumber == ChatRoomCharacter[R].MemberNumber) {
            partnerAsset = ChatRoomCharacter[R]
          }
        }

        if (!sender.CanInteract()) {
          ServerSend("ChatRoomChat", { Content: "*Private: your hands are tied. You cannot do that.", Type: "Emote", Target: sender.MemberNumber});
        } else if (charPos[partnerMemberNumber] != "device") {
          ServerSend("ChatRoomChat", { Content: "*Private: " + partnerName + " is too far.", Type: "Emote", Target: sender.MemberNumber});
        } else if (!InventoryAllow(partnerAsset, asset.Prerequisite) || customInventoryGroupIsBlocked(partnerAsset,"ItemVulva")) {
          ServerSend("ChatRoomChat", { Content: "*Private: you cannot do that. That part of " + partnerName + "'s body is blocked.", Type: "Emote", Target: sender.MemberNumber});
        } else {
          ServerSend("ChatRoomChat", { Content: "*" + sender.Name + " takes the dildo and wants to insert it into " + partnerName +  ".", Type: "Emote"});
          ServerSend("ChatRoomChat", { Content: "*Private: [Wait for " + partnerName + " action]. ", Type: "Emote", Target: sender.MemberNumber});
          ServerSend("ChatRoomChat", { Content: "*Private: you can (accept) it or (refuse).", Type: "Emote", Target: partnerMemberNumber});
          dildoInserting = partnerMemberNumber
        }
      } else if (msg.toLowerCase().includes("take out the dildo") && dildoInside == sender.MemberNumber && !dildoLocked) {
        ServerSend("ChatRoomChat", { Content: "*" + sender.Name + " takes out the dildo. She is now free to walk around.", Type: "Emote"})
        InventoryRemove(sender, "ItemVulva")
        ChatRoomCharacterUpdate(sender)
        dildoInside = 0
        // if (woodenBoxOpen) {
        //   ServerSend("ChatRoomChat", { Content: "*The wooden box door is now closed.", Type: "Emote"})
        //   woodenBoxOpen = false
        // }
      } else if (msg.toLowerCase().includes("accept") && dildoInserting == sender.MemberNumber) {
        partnerName = sender.MemberNumber == charList[0] ? charDict[charList[1]].Name : charDict[charList[0]].Name
        ServerSend("ChatRoomChat", { Content: "*" + sender.Name + " opens her legs and let " + partnerName + " slide the thick dildo inside her pussy.", Type: "Emote"});
        dildoInserting = false
        dildoInside = sender.MemberNumber
        InventoryWear(sender, "VibratingDildo","ItemVulva","Default")
        InventoryGet(sender,"ItemVulva").Property = { Intensity: -1, Effect: [] }
        InventoryGet(sender,"ItemVulva").Asset.Effect = []
        CharacterLoadEffect(sender)
        ChatRoomCharacterUpdate(sender)
        if (typeof checkIfDildoIsInsertedHandle !== 'undefined') {
          clearInterval(checkIfDildoIsInsertedHandle)
        }
        checkIfDildoIsInsertedHandle = setInterval(checkIfDildoIsInserted, 5*1000)
      } else if (msg.toLowerCase().includes("refuse") && dildoInserting == sender.MemberNumber) {
        partnerName = sender.MemberNumber == charList[0] ? charDict[charList[1]].Name : charDict[charList[0]].Name
        ServerSend("ChatRoomChat", { Content: "*" + sender.Name + " does not want the thick dildo inside her and prevent " + partnerName + " from inserting it.", Type: "Emote"});
        dildoInserting = false
      } else if (msg.toLowerCase().includes("desk") || msg.toLowerCase().includes("mirror") || msg.toLowerCase().includes("device") || msg.toLowerCase().includes("wooden box")) {
        ServerSend("ChatRoomChat", { Content: "*Private: you must go (back) before you can do that.", Type: "Emote", Target: sender.MemberNumber} );
      }

      break;

  }
}


function story1(sender) {
  if (InventoryIsWorn(sender, "HarnessBallGag", "ItemMouth") && InventoryIsWorn(sender, "LeatherArmbinder", "ItemArms")) {

    // check if arms are restrained or not
    // if (InventoryGet(sender, "ItemArms").Property.Restrain == null) {
    //   ServerSend("ChatRoomChat", { Content: "*Private: You feel the cuffs on your arms attracting each other with enourmous strength. Before you can do anything you find yourself with your arms tied on your back.", Type: "Emote", Target: sender.MemberNumber} );
    //   InventoryGet(sender, "ItemArms").Property.Restrain = "Both"
    //   InventoryGet(sender, "ItemArms").Property.SetPose = ["BackElbowTouch"]
    //   InventoryGet(sender, "ItemArms").Property.Effect = ["Block", "Prone"];
    //   InventoryGet(sender, "ItemArms").Property.SelfUnlock = false
    //   InventoryGet(sender, "ItemArms").Property.Difficulty = 6;
    //   ChatRoomCharacterUpdate(sender)
    // }

    // Set the lock code
    InventoryLock(sender, InventoryGet(sender, "ItemMouth"), { Asset: AssetGet("Female3DCG", "ItemMisc", "CombinationPadlock")}, Player.MemberNumber)
    InventoryGet(sender, "ItemMouth").Property.CombinationNumber = lockCode
    InventoryLock(sender, InventoryGet(sender, "ItemArms"), { Asset: AssetGet("Female3DCG", "ItemMisc", "CombinationPadlock")}, Player.MemberNumber)
    InventoryGet(sender, "ItemArms").Property.CombinationNumber = lockCode
    ChatRoomCharacterUpdate(sender)

    ServerSend("ChatRoomChat", { Content: "*Private: You hear a 'beep' coming from the gag and the armbinder. Immediately after you hear the locks on your restrain closing with a metallic sound. Now you have no chance of taking the restrains off.", Type: "Emote", Target: sender.MemberNumber} );

    partnerName = sender.MemberNumber == charList[0] ? charDict[charList[1]].Name : charDict[charList[0]].Name
    partnerMemberNumber = sender.MemberNumber == charList[0] ? charDict[charList[1]].MemberNumber : charDict[charList[0]].MemberNumber

    if (InventoryIsWorn(charDict[partnerMemberNumber], "HarnessBallGag", "ItemMouth") && InventoryIsWorn(charDict[partnerMemberNumber], "LeatherArmbinder", "ItemArms")) {
      ServerSend("ChatRoomChat", { Content: "*Now that the locks have closed on " + sender.Name + "'s restrains too, you know that you are both doomed. You preferred the comfort of tight restraints and you have to meekly accept the conquences.", Type: "Emote"} );
      if (charPos[partnerMemberNumber] == "inside box") {
        imprisonedList.push(partnerMemberNumber)
        ServerSend("ChatRoomChat", { Content: "*The box door closes behind " + charDict[partnerMemberNumber].name + " leaving her imprisoned inside. At the same time another wooden opex its door...", Type: "Emote"} );
      } else {
        setTimeout(function () {ServerSend("ChatRoomChat", { Content: "*You hear the wooden boxes opening.", Type: "Emote"})}, 5*1000);
      }
      storyProgress = 50
    } else {
      setTimeout(deviceAppear, 5*1000)
    }
  }
}

function deviceAppear() {
  if (storyProgress == 50) {return}
  ServerSend("ChatRoomChat", { Content: "*You start hearing a noise coming from one of the walls. As you look in direction of the source you see the wall slowly turning.", Type: "Emote"} );
  setTimeout(function() {
    ServerSend("ChatRoomChat", { Content: "*Finally the wall ends its 180 degree turn, and now there is some kind of (device) on front of you. What immediately jumps to your eyes are the three colored buttons and the large dildo near them.", Type: "Emote"} );
    deviceAvailable = true;
  }, 5*1000);
}


function openWoodenBox(sender) {
  if (dildoIntensity == 3) {
    //partnerName = charDict[dildoInside].Name
    ServerSend("ChatRoomChat", { Content: "*One of the wooden boxes on the other side of the room opens with a cracking noise. At the same time a chastity belt is locked on " + charDict[dildoInside].Name + ": the dildo is now locked inside, but the chain is realeased and " + charDict[dildoInside].Name + " can move.", Type: "Emote"} );
    woodenBoxOpen = true
    dildoLocked = true
    InventoryWear(charDict[dildoInside], "PolishedChastityBelt", "ItemPelvis","Default",100)
    InventoryGet(charDict[dildoInside],"ItemPelvis").Property = {Block: [ "ItemButt" ], Restrain: "ClosedBack"}
    InventoryLock(charDict[dildoInside], InventoryGet(charDict[dildoInside], "ItemPelvis"), { Asset: AssetGet("Female3DCG", "ItemMisc", "CombinationPadlock")}, Player.MemberNumber)
    InventoryGet(charDict[dildoInside], "ItemPelvis").Property.CombinationNumber = lockCode
    ChatRoomCharacterUpdate(charDict[dildoInside])
  }
}


function coloredButtonPushed(sender, buttonColor) {
  // 0 is red , 1 ius blue -1 is green
  insertedCode.push(buttonColor)
  if (customCompareArray(insertedCode,correctCode) || customCompareArray(insertedCode,alternativeCode)) {
    if (insertedCode.length == 3 && saveSlave == 2) {
      partnerMemberNumber = sender.MemberNumber == charList[0] ? charDict[charList[1]].MemberNumber : charDict[charList[0]].MemberNumber
      ServerSend("ChatRoomChat", { Content: "Are you still sure you want save yourself? You can still be a good submissive for " + charDict[partnerMemberNumber].Name + ". Do you want to be good to her? [WHISPER: YES to be good and get punished or NO to betray]", Type: "Whisper", Target: sender.Name} );
      saveSlave = 3
    }
    if (insertedCode.length == correctCode.length && saveSlave >= 2) {
      partnerMemberNumber = sender.MemberNumber == charList[0] ? charDict[charList[1]].MemberNumber : charDict[charList[0]].MemberNumber
      charPos[partnerMemberNumber] = "imprisoned"
      storyProgress = 20
      imprisonedList.push(partnerMemberNumber)
      ServerSend("ChatRoomChat", { Content: "*BEEEEEEP!.", Type: "Emote"} );
      ServerSend("ChatRoomChat", { Content: "*As soon as the last button is pressed the door of the box closes. Then some mechanical arms appear from the ground: first a thick dildo is inserted inside " + charDict[partnerMemberNumber].Name + ", then a chastity belt and a full set of restrains are locked on the poor girl.", Type: "Emote"} );
      InventoryWear(charDict[partnerMemberNumber], "VibratingDildo","ItemVulva","Default")
      InventoryGet(charDict[partnerMemberNumber],"ItemVulva").Property = { Intensity: 3, Effect: ["Vibrating"] }
      InventoryGet(charDict[partnerMemberNumber],"ItemVulva").Asset.Effect = []
      InventoryWear(charDict[partnerMemberNumber], "PolishedChastityBelt", "ItemPelvis","Default",100)
      InventoryGet(charDict[partnerMemberNumber],"ItemPelvis").Property = {Block: [ "ItemButt" ], Restrain: "ClosedBack"}
      InventoryWear(charDict[partnerMemberNumber], "LeatherBlindfold", "ItemHead","Default",100)
      InventoryWear(charDict[partnerMemberNumber], "HarnessBallGag", "ItemMouth","Default",100)
      InventoryWear(charDict[partnerMemberNumber], "LeatherArmbinder", "ItemArms", "Default",80)
      CharacterLoadEffect(charDict[partnerMemberNumber])
      ChatRoomCharacterUpdate(charDict[partnerMemberNumber])
      ServerSend("ChatRoomChat", { Content: "*At the same time " + sender.Name + " is freed from all the locks and the armbinder.", Type: "Emote"} );
      InventoryRemove(sender,"ItemArms")
      InventoryUnlock(sender,InventoryGet(sender,"ItemMouth"))
      if (InventoryGet(sender,"ItemMouth") != null) { InventoryUnlock(sender,InventoryGet(sender,"ItemMouth")) }
      ChatRoomCharacterUpdate(sender)
      ServerSend("ChatRoomChat", { Content: "Oh Oh. That should not normally happen. It seems that you where not good enough to hold " + sender.Name + " into a full servitude. She decided to betray you. Well, I think good for you " + sender.Name + ", the (door) is now open.", Type: "Chat"} );
      ServerSend("ChatRoomChat", { Content: charDict[partnerMemberNumber].Name + " since you where not a good enough domme, you will spend some time here with me, being trained as a sub. Hopefully you will be better at it.", Type: "Chat"} );
      console.log("Ending 'Dominance Failure & Betrayal' for: the failed domme " + charDict[partnerMemberNumber].Name + " (" + partnerMemberNumber + ") & her betrayer " + sender.Name + " (" + sender.MemberNumber + ").")
      ServerSend("ChatRoomChat", { Content: "Ending 'Dominance Failure & Betrayal' for: the failed domme " + charDict[partnerMemberNumber].Name + " (" + partnerMemberNumber + ") & her betrayer " + sender.Name + " (" + sender.MemberNumber + ").", Type: "Chat"} );
    } else if (insertedCode.length == correctCode.length) {
      partnerMemberNumber = sender.MemberNumber == charList[0] ? charDict[charList[1]].MemberNumber : charDict[charList[0]].MemberNumber
      charPos[sender.MemberNumber] = "imprisoned"
      storyProgress = 10
      imprisonedList.push(sender.MemberNumber)
      ServerSend("ChatRoomChat", { Content: "*BEEEEEEP!.", Type: "Emote"} );
      ServerSend("ChatRoomChat", { Content: "*As soon as the last button is pressed some mechanical arms appear from the wall near " + sender.Name + ". A blindfold is immediately locked on the poor girl.", Type: "Emote"} );
      ServerSend("ChatRoomChat", { Content: "*Finally she is forced to kneel and a wooden box closes around her, sealing her condition.", Type: "Emote"} );
      ServerSend("ChatRoomChat", { Content: "*Private: you can (crawl outside) and the (door) can now be inspected.", Type: "Emote", Target: partnerMemberNumber} );
      InventoryWear(sender, "LeatherBlindfold", "ItemHead","Default",100)
      InventoryWear(sender, "SmallWoodenBox","ItemDevices","Default",100)
      InventoryLock(sender, InventoryGet(sender, "ItemDevices"), { Asset: AssetGet("Female3DCG", "ItemMisc", "CombinationPadlock")}, Player.MemberNumber)
      InventoryGet(sender, "ItemDevices").Property.CombinationNumber = lockCode
      ChatRoomCharacterUpdate(sender)

      if (customCompareArray(insertedCode,alternativeCode)) {
        storyProgress = 30
        console.log("Ending - 'The Mistress and The Slave' for: Mistress " + charDict[partnerMemberNumber].Name + " (" + partnerMemberNumber + ") & her slave " + sender.Name + " (" + sender.MemberNumber + ").")
        ServerSend("ChatRoomChat", { Content: "Congratulations! You demonstrated to be a true Mistress! Your slave has been packed and is now at your disposal.", Type: "Chat"} );
        ServerSend("ChatRoomChat", { Content: "The lock code of her restrains has been given to you. You can now decide if you want to bring her away with you for your pleasure or leave her here, forever locked inside the box. Don't worry, she will have good company. Hihi.", Type: "Chat"} );
        ServerSend("ChatRoomChat", { Content: "*Private: the code on the locks is:" + lockCode + ". Don't forget it!", Type: "Emote", Target: partnerMemberNumber} );
        ServerSend("ChatRoomChat", { Content: "Ending - 'The Mistress and The Slave' for: Mistress " + charDict[partnerMemberNumber].Name + " (" + partnerMemberNumber + ") & her slave " + sender.Name + " (" + sender.MemberNumber + ").", Type: "Chat"} );
      } else {
        ServerSend("ChatRoomChat", { Content: "Ending - 'The Domme and The Sub' for: the domme " + charDict[partnerMemberNumber].Name + " (" + partnerMemberNumber + ") & the submissive " + sender.Name + " (" + sender.MemberNumber + ").", Type: "Chat"} );
        console.log("Ending - 'The Domme and The Sub' for: the domme " + charDict[partnerMemberNumber].Name + " (" + partnerMemberNumber + ") & the submissive " + sender.Name + " (" + sender.MemberNumber + ").")
        ServerSend("ChatRoomChat", { Content: "Well, " + charDict[partnerMemberNumber].Name + " you were a decent domme, but not good enough to deserve " + sender.Name + "'s lock code for free. If you want her lock code you have to kneel, undress and tell me: 'I am sorry that I was not a True Mistress and I deserve this shameful punishment'. Or you can abandon her here. Don't worry she will have good company.", Type: "Chat"} );
      }
    } else {
      nextColor = correctCode[insertedCode.length] == 0 ? "red" : (correctCode[insertedCode.length] == 1 ? "blue" : "green")
      ServerSend("ChatRoomChat", { Content: "*Private: BEEP! The screen changed color: it is now " + nextColor + ". -waiting for input-", Type: "Emote", Target: sender.MemberNumber == charList[0] ? charDict[charList[1]].MemberNumber : charDict[charList[0]].MemberNumber} );
    }
  } else {
    // inserted wrong code, reset to a new code
    correctCode = Array.from({length: 5}, () => Math.floor(Math.random() * 3)-1); // -1 is red, 0 blue and 1 is green. Multiply the array *-1 and you obtain the alternative code that does "something different".
    alternativeCode = correctCode.map(function(x) { return x * -1; });
    insertedCode = []
    nextColor = correctCode[0] == 0 ? "red" : (correctCode[0] == 1 ? "blue" : "green")
    ServerSend("ChatRoomChat", { Content: "*Private: BEEP! The screen changed color: it is now " + nextColor + ". -waiting for input-", Type: "Emote", Target: sender.MemberNumber == charList[0] ? charDict[charList[1]].MemberNumber : charDict[charList[0]].MemberNumber} );
  }
}

function backToRoom1(sender, msg) {
  if (!canMove(sender,msg)) { return }
  charPos[sender.MemberNumber] = "room1"
  deviceMessage = ""
  if (deviceAvailable) {deviceMessage = " There is also a (device) on one of the walls."}
  ServerSend("ChatRoomChat", { Content: "*Private: There is a (desk) on one side of the room, a (mirror) and some (wooden boxes) on the other side and a (plaque) on a pedestal at the center of the room." + deviceMessage, Type: "Emote", Target: sender.MemberNumber} );
  if (storyProgress == 10) {
    ServerSend("ChatRoomChat", { Content: "*Private: You also see that something is changed, you can check the (door).", Type: "Emote", Target: sender.MemberNumber} );
  }
}


function checkIfDildoIsInserted() {

  if (dildoInside == 0) {
    console.log("Dildo is not inserted 1")
    dildoIntensity = -1
    clearInterval(checkIfDildoIsInsertedHandle)
    if (dildoIntensity >= 0) {
      ServerSend("ChatRoomChat", { Content: "*You hear the noises from the dildo lower until it completely turns off.", Type: "Emote"} );
    }
  }

  dildoAsset = InventoryGet(partnerAsset, "ItemVulva")

  if (dildoAsset == null || dildoAsset.Asset.Name != "VibratingDildo") {
    console.log("Dildo is not inserted 2")
    if (dildoIntensity >= 0) {
      console.log("Dildo is not inserted 3")
      ServerSend("ChatRoomChat", { Content: "*You hear the noises from the dildo lower until it completely turns off.", Type: "Emote"} );
    }
    dildoInside = 0
    dildoIntensity = -1
    clearInterval(checkIfDildoIsInsertedHandle)
  }

}


if (typeof storyActive === 'undefined') {
  storyActive = false
}

function resetRoom() {

  if (typeof checkIfDildoIsInsertedHandle !== 'undefined') {
    clearInterval(checkIfDildoIsInsertedHandle)
  }

  if (typeof imprisonedList === 'undefined') {
    imprisonedList = []
  }

  charDict = {}
  charPos = {}
  charList = []
  deviceAvailable = false
  dildoInserting = false
  dildoIntensity = -1
  dildoInside = 0 // the member number of the player with the dildo inside. 0 if noone
  dildoLocked = false
  correctCode = Array.from({length: 5}, () => Math.floor(Math.random() * 3)-1); // -1 is red, 0 blue and 1 is green. Multiply the array *-1 and you obtain the alternative code that does "something different".
  alternativeCode = correctCode.map(function(x) { return x * -1; });
  insertedCode = []
  woodenBoxOpen = false
  tabletActive = false
  storyProgress = 0  // 0 - Beginning / 10 - The Domme and The Sub / 20 - Dominance Failure & Betrayal / 30 - The Mistress and The Slave / 50 - Will of submission /
  mirrorInspectDict = {}
  lockCode = Math.floor(Math.random() * 9000+1000).toString()
  saveSlave = 0 // 0 - no save / 1 - asked question / 2 - will be saved / 3 - will be saved but is asked for confirmation (can revert to 0 if denied)

  // check if all imprisoned people are in room. Sometimes they are not. Don't know why.
  tempList = imprisonedList
  for (ii = 0; ii < tempList.length; ii++) {
    check = false
    for (jj = 0; jj < ChatRoomCharacter.length; jj++) {
      if (tempList[ii] == ChatRoomCharacter[jj]) {
        check = true
      }
    }
    if (check) {imprisonedList.splice(imprisonedList.indexOf(tempList[ii]),1);}
  }

  // Update room
  var UpdatedRoom = {
		Name: ChatRoomData.Name,
		Description: ChatRoomData.Description,
		Background: ChatRoomData.Background,
		Limit: (3 + imprisonedList.length).toString(),
		Admin: ChatRoomData.Admin,
		Ban: ChatRoomData.Ban,
		Private: false,
		Locked: false
	};
	ServerSend("ChatRoomAdmin", { MemberNumber: Player.ID, Room: UpdatedRoom, Action: "Update" });
	ChatAdminMessage = "UpdatingRoom";

}



// Sends the chat room update packet to the server and waits for the answer
function closeRoomStory() {
	var UpdatedRoom = {
		Name: ChatRoomData.Name,
		Description: ChatRoomData.Description,
		Background: ChatRoomData.Background,
		Limit: ChatRoomData.Limit,
		Admin: ChatRoomData.Admin,
		Ban: ChatRoomData.Ban,
		Private: false,
		Locked: true
	};
	ServerSend("ChatRoomAdmin", { MemberNumber: Player.ID, Room: UpdatedRoom, Action: "Update" });
	ChatAdminMessage = "UpdatingRoom";
}


// Sends the chat room update packet to the server and waits for the answer
function openRoomStory() {
	var UpdatedRoom = {
		Name: ChatRoomData.Name,
		Description: ChatRoomData.Description,
		Background: ChatRoomData.Background,
		Limit: ChatRoomData.Limit,
		Admin: ChatRoomData.Admin,
		Ban: ChatRoomData.Ban,
		Private: ChatRoomData.Private,
		Locked: false
	};
	ServerSend("ChatRoomAdmin", { MemberNumber: Player.ID, Room: UpdatedRoom, Action: "Update" });
	ChatAdminMessage = "UpdatingRoom";
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

function customCompareArray(array1, array2) {
  //comprare two arrays until the last element of array1. If array2 is longer the remaining elements are ignored
  out = true
  for (var ii = 0; ii < array1.length; ii++) {
    if (array1[ii] != array2[ii]) {out = false}
  }
  return out
}


function lookLikeSlave(memNum) {
  return (isExposed(charDict[memNum], ["PolishedChastityBelt"]) && charDict[memNum].IsKneeling() && InventoryIsWorn(charDict[memNum], "HarnessBallGag", "ItemMouth") && InventoryIsWorn(charDict[memNum], "LeatherArmbinder", "ItemArms"))
}

function dressLikeMistress(memNum) {
  return (InventoryIsWorn(charDict[memNum],"MistressBoots","Shoes") && InventoryIsWorn(charDict[memNum],"MistressBottom","ClothLower") && InventoryIsWorn(charDict[memNum],"MistressGloves","Gloves") && InventoryIsWorn(charDict[memNum],"MistressTop","Cloth"))
}

function InventoryBlockedOrLimitedCustomized(C, ItemAsset, ItemType) {
  // slight variation of the official function InventoryBlockedOrLimited
  Item = {"Asset": ItemAsset}
	let Blocked = InventoryIsPermissionBlocked(C, Item.Asset.DynamicName(Player), Item.Asset.DynamicGroupName, ItemType);
	let Limited = !InventoryCheckLimitedPermission(C, Item, ItemType);
	return Blocked || Limited;
}
