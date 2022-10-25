RoomName = "Bondage Club Arena"
RoomDescription = "BOT - participate or be the judge in this kinky competition"

// BOT - Kinky challenges between club members: who will be on top? 
// -----------------------------------------------------------------------------

// new line in chat - BEGIN
nl = `
`
// new line in chat - END

timeoutHandler = [] // preallocate timeoutHandler

// Update Room Data
ChatRoomData.Background = "LeatherChamber"
ChatRoomData.Name = RoomName
ChatRoomData.Description = RoomDescription
ServerSend("ChatRoomAdmin", { MemberNumber: Player.ID, Room: ChatRoomData, Action: "Update" });
ChatAdminMessage = "UpdatingRoom";

Player.Description = `Code available here: https://github.com/keykey5/BC-BOT-repository
Comment and suggestion thread on BC Discord: https://discord.com/channels/554377975714414605/1024007221845164052
------------------------------------------------

Welcome to the Bondage Club Arena:
here club members will be able to demonstrate their worth: two girls will have to compete against each other. 
The winner will be decided by a jury composed by all the other club members currently enjoying the show in the arena.

------------------------------------------------
Contest phases

1 - SELECT THE PARTICIPANT
During this phase the command !participate can be used to be part of the next competition.
It is also possible to use the command !force <name> to try forcing someone else to participate in the competition.

2 - THEME ANNOUNCEMENT
Once the two participant are selected the theme will be announced by the Arena Manager.

3 - CONTEST PHASE
During this phase the participant will show their skill in the field chosen by the Arena Manager. They can take as much time as they want.
To end this phase one of the participants has to use the command !end. After the command is used the Arena Manager will start a countdown that will end the contest (5 minutes).
If the second participant uses the command !end too then the phase will end immediately.

4 - VOTE
At this point the judges will have the possibility to vote the best contestant. The command is !vote <name>. 
This phase will last 5 minutes or until everyone has voted.

------------------------------------------------

THE CONTESTANTS:
Two club members will be selected to participate in the competition, either voluntarily or forced by the Arena Manager.
After the participants are selected the Arena Manager will present a theme and the participants will have to do their best to represent the selected theme.
At the end the judges (all the other members in the room) will be able to vote their preferred challenger.

THE THEME:
It can be as simple as "cat girl" or more complex like "demonstrate how a club slave should be punished when being rude to a club mistress".
Once the theme has been announced the participants will have to work as they prefer to show their best interpretation of it. 
They can change their clothes and restrain themselves if they'd like to do so (nasty submissive^^) or they can draft someone from the jury and use them if they prefer (mistress may enjoy this approach more).
The participants should not only select the appropriate attire but also perform and act in the most appropriate way.
Since the winner will be determined by a vote from the judges the objective is to gain the judges' favor by any means. 

THE JUDGES:
Any club member who is not participating in the contest is considered part of the jury. 
The jury's role is not only to vote but also to keep the contest fair, if they think that one of the contestant is playing dirty or doing something wrong they can admonish the her: in the end is the jury that decides the winner so it's better to follow their guidelines!
The judges can enjoy the show, chat and do whatever they please although it is preferable if they don't interfere with the contestants too much, unless requested.
Even if coerced to play a part in the show a member of the jury isn't considered a contestant: they will be able to vote at the end and will not gain/lose any point.

------------------------------------------------
Theme Examples:
 - Kitty play
 - Well trained ponygirl
 - The most provocant and sexy
 - Demonstrate how a club slave should be punished when being rude to a club mistress
 - The art of shibari
 - The most obedient contenstant (the contestant must demonstrate how obedient she is, not someone else)

------------------------------------------------
Commands

!participate - use this command to participate in the next competition
!force <name> - use this command to try forcing someone else in the next competition
!end - use this command to end the contest phase when you think you ave done everything you could to please the jury
!vote <number> - vote the best contestant (only jurors)
!info - gives information on the current competition
!reset - reset the room (use this ONLY if the script brakes)

` // end of description
ServerSend("AccountUpdate", { Description: Player.Description });
ChatRoomCharacterUpdate(Player)


themeList = []
themeList.push("Kitty play")
themeList.push("Well trained ponygirl")
themeList.push("The most provocant and sexy")
themeList.push("Demonstrate how a club slave should be punished when being rude to a club mistress")
themeList.push("The art of shibari")
themeList.push("The most obedient *contenstant only (the contestant must demonstrate how obedient she is, not someone else)")
themeList.push("The most dominant *contenstant only (the contestant must demonstrate how dominant she is, not someone else)")
themeList.push("The best maid *contenstant only (the contestant must demonstrate to be the best maid, not someone else)")
themeList.push("The bride")
themeList.push("Forever pleasure")
themeList.push("The one that have most orgasms wins")
themeList.push("The best forniture to decorate the manor wins")
themeList.push("Spanking demonstration")
themeList.push("Make a mess")
// themeList.push("")
// themeList.push("")
// themeList.push("")



if (typeof roomOpened === "undefined") { resetRoom() }
ChatRoomMessageAdditionDict["voteRoom"] = function(sender, msg, data) {ChatRoomMessageVoteRoom(sender, msg, data)}



function ChatRoomMessageVoteRoom(sender, msg, data) {

	if ((data.Type == "Action") && (msg.startsWith("ServerEnter"))) {
    ServerSend("ChatRoomChat", { Content: `*-----------------------------------------------------` + nl + `WELCOME: Check BIO for room info` + nl + nl, Type: "Emote", Target: sender.MemberNumber} );
    infoMessage(sender)
    if (!(sender.MemberNumber in customerList)) {
      newCustomer(sender)
    }
  } else if ((msg.startsWith("ServerLeave")) || (msg.startsWith("ServerDisconnect")) || (msg.startsWith("ServerBan")) || (msg.startsWith("ServerKick"))) {
    if (participantList.includes(sender.MemberNumber)) {
      ServerSend("ChatRoomChat", { Content: `*A participant left the room. The room has been resetted.`, Type: "Emote"} );
      resetRoom()
    } else if (juryList.includes(sender.MemberNumber) && !votedList.includes(sender.MemberNumber)) {
      ServerSend("ChatRoomChat", { Content: `*A judge left the room. They won't be able to vote anymore .`, Type: "Emote"} );
      juryList.splice(juryList.indexOf(sender.MemberNumber),1)
      checkTotalVotes()
    }
  }

  if (data.Type != null) {
    if (data.Type == "Chat") {
      if (msg.startsWith("!")) {
        commandHandler(sender,msg)
        ServerSend("ChatRoomChat", { Content: `*Please use whispers to send commands.`, Type: "Emote", Target: sender.MemberNumber} );
      }
    }	else if ((data.Type == "Emote") || (data.Type == "Action")) {
      if (msg.startsWith("!")) {
        commandHandler(sender,msg)
      }
    } else if (data.Type == "Whisper") {
      if (msg.startsWith("!")) {
        commandHandler(sender,msg)
      }
    } else if (data.Type == "Hidden") {
      //console.log("Hidden message: " + msg)
    }
  }
}





function commandHandler(sender, msg) {

  if (msg.toLowerCase().includes("reset")) {
    ServerSend("ChatRoomChat", { Content: "*" + charname(sender) + " used the command to RESET the room.", Type: "Emote"} );
    resetRoom()

  } else if (msg.toLowerCase().includes("info")) {
    infoMessage(sender)
    
  // } else if (msg.toLowerCase().includes("start") && phase == 0) {

  //   if (ChatRoomCharacter.length < 4) {
  //     ServerSend("ChatRoomChat", { Content: "*This command can only be used if there are at least 4 people in the room (Bot included).", Type: "Emote", Target: sender.MemberNumber} );
  //     return
  //   }

  //   if (startCommandList.includes(sender.MemberNumber)) {
  //     ServerSend("ChatRoomChat", { Content: "*You already requested to start a new competition.", Type: "Emote", Target: sender.MemberNumber} );
  //   } else {
  //     startCommandList.push(sender.MemberNumber)
  //     ServerSend("ChatRoomChat", { Content: "*Start request sent. Three requests are needed. [" + startCommandList.length + "/3]", Type: "Emote", Target: sender.MemberNumber} );
  //     InventoryGet(Player, "ItemNeckRestraints").Property.Text3 = startCommandList.length + "/3"
  //     ChatRoomCharacterUpdate(Player)
  //     if (startCommandList.length>=3) {
  //       selectParticipantAnnouncement()
  //     }
  //   }

  } else if (msg.toLowerCase().includes("participate") && phase == 1) {
    if (participantList.includes(sender.MemberNumber)) {
      ServerSend("ChatRoomChat", { Content: "*You are already in the participant list.", Type: "Emote", Target: sender.MemberNumber} );
    } else {
      participantList.push(sender.MemberNumber)

      if (participantList.length == 1) {
        InventoryGet(Player, "ItemNeckRestraints").Property.Text2 = customerList[sender.MemberNumber].name
      } else {
        InventoryGet(Player, "ItemNeckRestraints").Property.Text3 = customerList[sender.MemberNumber].name
      }
      ChatRoomCharacterUpdate(Player)

      ServerSend("ChatRoomChat", { Content: "* " + charname(sender) + " will be one of the contestant!", Type: "Emote"} );
      if (participantList.length == 2) {
        sendContestAnnouncement()
      }
    }

  } else if (msg.toLowerCase().includes("force") && phase == 1) {
    var nameFound = false
    for (var D = 0; D < ChatRoomCharacter.length; D++) {
      if (msg.toLowerCase().endsWith(ChatRoomCharacter[D].Name.toLowerCase()) || (ChatRoomCharacter[D].Nickname && msg.toLowerCase().endsWith(ChatRoomCharacter[D].Nickname.toLowerCase()))) {
        if (ReputationCharacterGet(sender,"Dominant")>ReputationCharacterGet(ChatRoomCharacter[D],"Dominant")+50) {
          participantList.push(ChatRoomCharacter[D].MemberNumber)
          if (participantList.length == 1) {
            InventoryGet(Player, "ItemNeckRestraints").Property.Text2 = charname(ChatRoomCharacter[D])
          } else {
            InventoryGet(Player, "ItemNeckRestraints").Property.Text3 = charname(ChatRoomCharacter[D])
          }
          ChatRoomCharacterUpdate(Player)
          ServerSend("ChatRoomChat", { Content: "* " + charname(sender) + " used her authority to force " + charname(ChatRoomCharacter[D]) + " to be one of the contestant!", Type: "Emote"} );
        } else {
          ServerSend("ChatRoomChat", { Content: "*You are not dominant enough to force her to participate.", Type: "Emote", Target: sender.MemberNumber} );
        }
        nameFound = true
      }
    }
    if (!nameFound) ServerSend("ChatRoomChat", { Content: "*Name not found in chatroom.", Type: "Emote", Target: sender.MemberNumber} );

    if (participantList.length == 2) {
      sendContestAnnouncement()
    }

  } else if (msg.toLowerCase().includes("end") && phase == 3) {
    if (participantList.includes(sender.MemberNumber)) {
      if (endCommandList.includes(sender.MemberNumber)) {
        ServerSend("ChatRoomChat", { Content: "*You already used the end command.", Type: "Emote", Target: sender.MemberNumber} );
        return
      } else {
        endCommandList.push(sender.MemberNumber)
      }
      if (endCommandList.length == 1) {
        endContestPhaseAnnouncement()
      } else if (endCommandList.length == 2) {
        announcementMsg = `*-----------------------------------------------------`
        announcementMsg = announcementMsg + nl + customerList[endCommandList[1]].name + ` has accepted to conclude the contest immediately.`
        announcementMsg = announcementMsg + nl + `-----------------------------------------------------`
        ServerSend("ChatRoomChat", { Content: announcementMsg, Type: "Emote"} );
        startVotePhase()
      }
    }


  } else if (msg.toLowerCase().includes("vote") && phase == 4) {

    if (!juryList.includes(sender.MemberNumber)) {
      ServerSend("ChatRoomChat", { Content: "*You are not a judge of the current competition.", Type: "Emote", Target: sender.MemberNumber} );
      return
    }

    if (votedList.includes(sender.MemberNumber)) {
      ServerSend("ChatRoomChat", { Content: "*You already voted.", Type: "Emote", Target: sender.MemberNumber} );
      return
    }

    if (msg.toLowerCase().includes("1")) {
      voteCount[0] = voteCount[0] + 1 
    } else if (msg.toLowerCase().includes("2")) {
      voteCount[1] = voteCount[1] + 1
    }

    votedList.push(sender.MemberNumber)
    ServerSend("ChatRoomChat", { Content: "* - " + charname(sender) + " voted - ", Type: "Emote"} );


    // if everyone in the room voted the vote phase will be ended earlier
    checkTotalVotes()
    
  }

}


function checkTotalVotes(){

  for (var D = 0; D < juryList.length; D++) {
    if (!votedList.includes(juryList[D])) {
      return
    } 
  }

  endVotePhase() 

}


function infoMessage(sender){
  announcementMsg = `*-----------------------------------------------------`
  if (phase == 0) {
    announcementMsg = announcementMsg + nl + `Waiting to start a new competition [use command !start]`
  } else if (phase == 1) {
    announcementMsg = announcementMsg + nl + `Participant Selection Phase`
    announcementMsg = announcementMsg + nl + `If you want to be a contestant use the command !participate`
  } else if (phase == 3) {
    announcementMsg = announcementMsg + nl + `Competition Phase`
    announcementMsg = announcementMsg + nl + `Participant 1: ` + customerList[participantList[0]].name
    announcementMsg = announcementMsg + nl + `Participant 2: ` + customerList[participantList[1]].name
    announcementMsg = announcementMsg + nl + `THEME: ` + theme
    announcementMsg = announcementMsg + nl 
    announcementMsg = announcementMsg + nl + `Use the command !end when you feel ready and want to move to the voting phase.`
  } else if (phase == 4) {
    announcementMsg = announcementMsg + nl + `Voting Phase`
    announcementMsg = announcementMsg + nl + customerList[participantList[0]].name + ` -> !vote 1`
    announcementMsg = announcementMsg + nl + customerList[participantList[1]].name + ` -> !vote 2`
    announcementMsg = announcementMsg + nl 
    announcementMsg = announcementMsg + nl + `JUDGES:`
    
    for (var D = 0; D < juryList.length; D++) {
      announcementMsg = announcementMsg + nl + ` - ` + customerList[juryList[D]].name
    }

  }
  announcementMsg = announcementMsg + nl + `-----------------------------------------------------`
  ServerSend("ChatRoomChat", { Content: announcementMsg, Type: "Emote", Target: sender.MemberNumber } );
}

function selectParticipantAnnouncement(){
  phase = 1
  announcementMsg = `*-----------------------------------------------------`
  announcementMsg = announcementMsg + nl + `A new competition will start soon. If you wish to participate say it. [!participate]`
  announcementMsg = announcementMsg + nl + `-----------------------------------------------------`
  ServerSend("ChatRoomChat", { Content: announcementMsg, Type: "Emote"} );

  // Update the petpost
  InventoryGet(Player, "ItemNeckRestraints").Property.Text = "Participants"
  InventoryGet(Player, "ItemNeckRestraints").Property.Text2 = "?"
  InventoryGet(Player, "ItemNeckRestraints").Property.Text3 = "?"
  ChatRoomCharacterUpdate(Player)
}


function sendContestAnnouncement(){
  phase = 3
  theme = themeList[Math.floor(Math.random() * themeList.length)]
  announcementMsg = `*-----------------------------------------------------`
  announcementMsg = announcementMsg + nl + `Participant 1: ` + customerList[participantList[0]].name
  announcementMsg = announcementMsg + nl + `Participant 2: ` + customerList[participantList[1]].name
  announcementMsg = announcementMsg + nl + `THEME: ` + theme
  announcementMsg = announcementMsg + nl 
  announcementMsg = announcementMsg + nl + `Use the command !end when you feel ready and want to move to the voting phase.`
  announcementMsg = announcementMsg + nl + `-----------------------------------------------------`
  ServerSend("ChatRoomChat", { Content: announcementMsg, Type: "Emote"} );
}


function endContestPhaseAnnouncement(){
  timeoutHandler = setTimeout(startVotePhase, 5*60*1000)
  announcementMsg = `*-----------------------------------------------------`
  announcementMsg = announcementMsg + nl + customerList[endCommandList[0]].name + ` has requested to conclude the contest and start the vote.`
  announcementMsg = announcementMsg + nl + `The contest will end in FIVE MINUTES.`
  announcementMsg = announcementMsg + nl + `To end the contest immediately both participant must use the command !end.`
  announcementMsg = announcementMsg + nl + `-----------------------------------------------------`
  ServerSend("ChatRoomChat", { Content: announcementMsg, Type: "Emote"} );
}

function startVotePhase(){
  clearTimeout(timeoutHandler)
  phase = 4

  for (var D = 0; D < ChatRoomCharacter.length; D++) {
    if (!participantList.includes(ChatRoomCharacter[D].MemberNumber) && (ChatRoomCharacter[D].MemberNumber != Player.MemberNumber)) {
      juryList.push(ChatRoomCharacter[D].MemberNumber)
    }
  }

  announcementMsg = `*-----------------------------------------------------`
  announcementMsg = announcementMsg + nl + `The contest phase has been concluded. Judges will now be able to vote.`
  announcementMsg = announcementMsg + nl + customerList[participantList[0]].name + ` -> !vote 1`
  announcementMsg = announcementMsg + nl + customerList[participantList[1]].name + ` -> !vote 2`
  announcementMsg = announcementMsg + nl 
  announcementMsg = announcementMsg + nl + `JUDGES:`
  
  for (var D = 0; D < juryList.length; D++) {
    announcementMsg = announcementMsg + nl + ` - ` + customerList[juryList[D]].name
  }

  announcementMsg = announcementMsg + nl 
  announcementMsg = announcementMsg + nl + `The vote will end in FIVE MINUTES or after all the judges have voted.`
  announcementMsg = announcementMsg + nl + `-----------------------------------------------------`
  ServerSend("ChatRoomChat", { Content: announcementMsg, Type: "Emote"} );
  timeoutHandler = setTimeout(endVotePhase, 5*60*1000)

  checkTotalVotes()

}

function endVotePhase(){
  clearTimeout(timeoutHandler)
  phase = 1 // not actually needed since there is a resetRoom() call at the end of this function

  if (voteCount[0] == voteCount[1]) {
    winner = false
  } else if (voteCount[0]>voteCount[1]) {
    winner = customerList[participantList[0]].name
  } else {
    winner = customerList[participantList[1]].name
  }

  announcementMsg = `*-----------------------------------------------------`
  announcementMsg = announcementMsg + nl + `The judges have voted.`
  announcementMsg = announcementMsg + nl + customerList[participantList[0]].name + `: ` + voteCount[0] + ` votes`
  announcementMsg = announcementMsg + nl + customerList[participantList[1]].name + `: ` + voteCount[1] + ` votes`
  announcementMsg = announcementMsg + nl
  announcementMsg = announcementMsg + nl + (winner ? `The WINNER is ` + winner + `!` : `It was a DRAW...`)

  if (juryList.length == 0) {
    announcementMsg = announcementMsg + nl + `... actually an obvious result since there were no judges, but at least I hope you enjoyed your competition.`
  }

  announcementMsg = announcementMsg + nl + `-----------------------------------------------------`
  ServerSend("ChatRoomChat", { Content: announcementMsg, Type: "Emote"} );

  resetRoom()
}


function newCustomer(sender) {
	customerList[sender.MemberNumber] = new personMagicData()
  customerList[sender.MemberNumber].name = charname(sender)
}

function resetRoom() {
  clearTimeout(timeoutHandler)
  phase = 1  // 0 - waiting phase ; 1 - select participant ; 2 - theme announcement (actually fake phase currently); 3 - contest ; 4 - vote 
  participantList = []
  juryList = []
  startCommandList = [] // will contain the memberNumber of those that used the !start command.
  endCommandList = [] // will contain the memberNumber of those that used the !end command.
  voteCount = [0, 0]
  votedList = [] // list of jurors who have already voted
  timeoutHandler = false

  // update the pet post
  InventoryWear(Player, "LeatherChoker","ItemNeck",["Default","#000000"])
  InventoryWear(Player, "PetPost","ItemNeckRestraints",["Default","#845343", "#A1794A", "Default","#020202","#F3F3F3","#F3F3F3","#FFF483", "#FFBCD6","Default"])
  InventoryGet(Player, "ItemNeckRestraints").Property = {}
  InventoryGet(Player, "ItemNeckRestraints").Property.Type = "p1d0l0s7m1x0"
  ChatRoomCharacterUpdate(Player)

  ServerSend("ChatRoomChat", { Content: "*ROOM RESETTED", Type: "Emote"} );
  selectParticipantAnnouncement()
}


function checkRoomForCustomer() {
  for (var D = 0; D < ChatRoomCharacter.length; D++) {
    if (!(ChatRoomCharacter[D].MemberNumber in customerList)) {
      newCustomer(ChatRoomCharacter[D])
      console.log("Added " + charname(ChatRoomCharacter[D]) + " as customer.")
    }
  }
}