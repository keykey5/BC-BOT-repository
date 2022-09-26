// SCRIPTED - Pony girl track and competitions
// -----------------------------------------------------------------------------
//
// -- Notes of possible RP ways to give commands. --
// stand: show the free hand, palm toward the girl OR the tip of the crop under her brest/chin, pushing upward.
// piaffe: one soft snap on the leg or boots
// pirouette: move the hand/crop in circles
// walk: a gentle push on her back/ass with the crop
// passage: an upward hit on the lower part of the ass
// gallop: a decise hit on the girl ass
// jump: ?? a spank with the free hand on her ass
// -------------------------------------------------
//
//
// Rough MAP of the track
//
//    D--------------------------------C
//    | \                            / |
//    |   \                        /   |
//    |     \                    /     |
//    |       H-------j++------G       |
//    |       | \              |       |
//    |       |   ----L----    |       |
//    |       |              \ |       |
//    |       E-------j+-------F       |
//    |     /  \             /         |
//    |   j     ---------- M ------j   |
//    | /                            \ |
//    A--------------------------------B
//

trackMap = `MAP:
j = obstacle (small, + medium, ++ high)

D--------------------------------C
| \\                                     / |
|   \\                                 /   |
|     \\                             /     |
|       H-------j++-------G       |
|       |  \\                     |        |
|       |    ------L------    |       |
|       |                     \\  |        |
|       E--------j+--------F       |
|     /  \\                     /         |
|   j     --------------- M ---j    |
| /                                    \\ |
A--------------------------------B
`
// A-B: gallop
// B-C: gallop
// C-D: gallop
// D-E: gallop
// A-E: jump (small)
// B-I: jump (small)
// E-F: jump (medium)
// G-H: jump (high)
//
// The rest are all freestyle

// new line in chat - BEGIN
nl = `
`
// new line in chat - END

locationDict = {}
locationDict["a"] = "one of the corner of the outer ring"
locationDict["b"] = "one of the corner of the outer ring"
locationDict["c"] = "one of the corner of the outer ring"
locationDict["d"] = "one of the corner of the outer ring"
locationDict["e"] = "the inner ring"
locationDict["f"] = "the inner ring"
locationDict["g"] = "the inner ring"
locationDict["h"] = "the inner ring"
locationDict["l"] = "the center of the track"
locationDict["m"] = "a side zone"

linkDict = {}
linkDict["ab"] = "gallop"
linkDict["bc"] = "gallop"
linkDict["cd"] = "gallop"
linkDict["da"] = "gallop"
linkDict["ae"] = "jumpSmall"
linkDict["bm"] = "jumpSmall"
linkDict["ef"] = "jumpMedium"
linkDict["gh"] = "jumpHigh"
linkDict["em"] = "freestyle"
linkDict["fm"] = "freestyle"
linkDict["fg"] = "freestyle"
linkDict["he"] = "freestyle"
linkDict["gc"] = "freestyle"
linkDict["dh"] = "freestyle"
linkDict["fl"] = "freestyle"
linkDict["hl"] = "freestyle"

// add mirrored links
linkDictKey = Object.keys(linkDict)
for (var ii = 0; ii < linkDictKey.length; ii++) {
  linkDict[linkDictKey[ii].split("").reverse().join("")] = linkDict[linkDictKey[ii]]
}
delete linkDictKey
//


Player.Description = `Code available here: https://github.com/keykey5/BC-BOT-repository
Comment and suggestion thread on BC Discord: https://discord.com/channels/554377975714414605/1024007221845164052
----------------------------------------

This room makes large use of whips/crop. Hits are to be intended as soft, non-hurting (unless specifically roleplayed).

Please, to use commands whisper to ` + Player.Name + ` to reduce clutter in the room.

Subs can take the role of the trainer if they want.

--------------------------------------------------------------------------------

DESCRIPTION:
You can play the role of the trainer or the ponygirl. Say "!trainer" or "!pony" to get the appropriate outfit.
The ponygirl enters the track where she has to perform a series of tricks (commands below). When she is in the track earplugs can be placed on her (hard difficulty), she can't hear anything and the only mean to communicate with her is actions.
The trainer must communicate the correct trick to execute, again since the pony can't hear, action must be used (mostly with the use of the whip)
Only one pony at time can be in the track.


FREE TRAINING:
Simply enter the track and start performing tricks to train and learn how to move around the track.
A pony can be left free to roam the track or can be followed and instructed by a trainer.
The pony does not wear earplugs during a free training.


JUDGE FREE FORM EVALUATION:
When you think you are ready you can start a judge evaluation with "!freeform".
During the evaluation you can perform the tricks you want. Each trick will award points.
Other factors are how many tricks you do (negative points) and how good the pony is (hidden math).
Decide a maximum number of tricks to perform and challenge other trainers to see who gets more points.
EASY: No earplugs.
HARD: The pony will wear earplugs.

JUDGE CONTEST EVALUATION:
The judge will give to the trainer a list of tricks that the ponygirl has to perform.
The order can be chosen by the trainer.
Remember: the pony can't see the list of actions, so the trainer must give her the commands.
EASY: No earplugs.
HARD: The pony will wear earplugs.

--------------------------------------------------------------------------------

GENERAL commands (use whispers):
!reset - use it with caution! This will stop the current game. Use only if the script seems broken or someone is AFK in the track.
!map - look at the map (available in BIO too)


PONY GIRL commands (use whispers):
!enter - enters the track
!exit - exit the track

The following are dressage figures for pony girls:
!stand - stand in place
!piaffe - trot in place
!pirouette - a 360 degrees turn
!walk - a regular and relaxed gait
!passage - a composed trot where the pony girl gains elevation at each step
!gallop - a fast gait used to move between two distant points
!jump - tries to jump the obstacle in front of her or performs a jump without obstacles


TRAINER commands (use whispers):
!enter - enters the track
!exit - exit the track
!point <pos> - use this to make sure that with each trick the ponygirl moves in the direction you wanted. <pos> is a letter from the map. Don't write the <>. This command is not always needed (more explained below)
!stop - Will conclude the free form or the contest. The judge will show the results of the performance.
!freeform easy OR !freeform hard - Starts the free form where a judge will evaluate the performance
!contest easy OR !contest hard - Start a series of tricks that will be evaluated by the judge.
!list - look at the list of tricks that needs to be performed for the contest evaluation


----------- FAQ -------------
Navigate the map - from each map location there are multiple paths. The trainer receive a detailed description of the available paths and what can be done on them.
By default the path taken will be the first on the list that is compatible with the ponygirl action. If the trainer wants to take a different path she can use the command !point <pos>.

Jumping obstacles - If a pony fails a jump it means she is not capable of jumping over that obstacle. There are 4 types of obstacle (high, medium, small and no obstacle).
The ability of the pony depend on many factors: dominance, heigth, body types (small lower body or breasts too big are negative factors) and days spent in the club (let's call it "experience").

--------------------------------------------------------------------------------

` + trackMap // end of description
ServerSend("AccountUpdate", { Description: Player.Description });
ChatRoomCharacterUpdate(Player)

function resetRoom() {
  trackPony = false
  trackTrainer = false

  ponyList = []
  trainerList = []

  ponyLocation = false
  ponyLastLocation = false

  performedTrickList = []
  trainerSelectedLocation = false

  contestTrickList = []
  judgeType = false
}

if (typeof trackPony === "undefined") { resetRoom() }

ChatRoomMessageAdditionDict["ponyContest"] = function(SenderCharacter, msg, data) {ChatRoomMessagePonyContest(SenderCharacter, msg, data)}

function ChatRoomMessagePonyContest(SenderCharacter, msg, data) {

	if ((data.Type == "Action") && (msg.startsWith("ServerEnter"))) {
    ServerSend("ChatRoomChat", { Content: `*-----------------------------------------------------` + nl + `WELCOME: Check BIO for room info` + nl + `------------------------------------------------------`, Type: "Emote", Target: SenderCharacter.MemberNumber} );
  } else if ((msg.startsWith("ServerLeave")) || (msg.startsWith("ServerDisconnect")) || (msg.startsWith("ServerBan")) || (msg.startsWith("ServerKick"))) {
      if ((trackPony.MemberNumber == SenderCharacter.MemberNumber) || (trackTrainer.MemberNumber == SenderCharacter.MemberNumber)) {
        trackPony = false
        trackTrainer = false
        ServerSend("ChatRoomChat", { Content: "*The track is empty.", Type: "Emote"})
      }
    }

  if (data.Type != null) {
    if (((data.Type == "Hidden") && (msg.startsWith("ChatRoomBot"))) || msg.startsWith("!") ) {
      commandHandler(SenderCharacter,msg)
    }
  }
}




function permissionCheck(sender,type) {

  check = true

  if (sender.ItemPermission>2) {
    check = false
  } else if (type == "pony") {
    if (InventoryBlockedOrLimitedCustomized(sender, AssetGet("Female3DCG","ItemArms","LeatherArmbinder"))) {
      check = false
    } else if (InventoryBlockedOrLimitedCustomized(sender, AssetGet("Female3DCG","ItemEars","HeavyDutyEarPlugs"))) {
      check = false
    } else if (InventoryBlockedOrLimitedCustomized(sender, AssetGet("Female3DCG","ItemMouth","HarnessPonyBits"))) {
      check = false
    } else if (InventoryBlockedOrLimitedCustomized(sender, AssetGet("Female3DCG","Shoes","PonyBoots"))) {
      check = false
    } else if (InventoryBlockedOrLimitedCustomized(sender, AssetGet("Female3DCG","ItemButt","HorsetailPlug"))) {
      check = false
    } else if (InventoryBlockedOrLimitedCustomized(sender, AssetGet("Female3DCG","ItemTorso","LeatherHarness"))) {
      check = false
    }
  }

  if (!check) {
    if (type == "pony") {
      msg = `*-----------------------------------------------------` + nl
      msg = msg + `The following permissions are needed:` + nl
      msg = msg + `- Players: dominant or lower` + nl
      msg = msg + `- Leather Armbinder` + nl
      msg = msg + `- Heavy Duty Earplugs` + nl
      msg = msg + `- Pony Boots` + nl
      msg = msg + `- Leather Harness` + nl
      msg = msg + `- Horsetail Plug` + nl
      msg = msg + `- Bit Gag` + nl
      msg = msg + `------------------------------------------------------`
    } else if (type == "trainer") {
      msg = `*-----------------------------------------------------` + nl
      msg = msg + `The following permissions are needed:` + nl
      msg = msg + `- Players: dominant or lower` + nl
      msg = msg + `------------------------------------------------------`
    }
    ServerSend("ChatRoomChat", { Content: msg, Type: "Emote", Target: sender.MemberNumber} );
  }
  return check
}



function commandHandler(sender, msg) {

  if (msg.toLowerCase().includes("reset")) {
    resetRoom()
    ServerSend("ChatRoomChat", { Content: "*" + sender.Name + " resetted the room. Everyone needs to select their role again.", Type: "Emote"} )

  } else if (msg.toLowerCase().includes("list") && trackPony.MemberNumber != sender.MemberNumber) {
    if (judgeType != "contest") {
      ServerSend("ChatRoomChat", { Content: "*The list is only available when there is an ongoing contest.", Type: "Emote", Target: sender.MemberNumber} )
    } else {
      ServerSend("ChatRoomChat", { Content: showcontestTrickList(), Type: "Emote", Target: sender.MemberNumber} )
    }

  } else if (msg.toLowerCase().includes("map")) {
    ServerSend("ChatRoomChat", { Content: "*" + trackMap, Type: "Emote", Target: sender.MemberNumber} )

  } else if (msg.toLowerCase().includes("pony")) {
    if (!permissionCheck(sender,"pony")) {return}
    dressLike(sender,"pony", dressColor = "default", removeUnderwear = true, removeCosplay = true)
    if (ponyList.indexOf(sender.MemberNumber)<0) {ponyList.push(sender.MemberNumber)}
    if (trainerList.indexOf(sender.MemberNumber)>=0) {trainerList.splice(trainerList.indexOf(sender.MemberNumber),1)}

  } else if (msg.toLowerCase().includes("trainer")) {
    if (!permissionCheck(sender,"trainer")) {return}
    if (trainerList.indexOf(sender.MemberNumber) <0) {trainerList.push(sender.MemberNumber)}
    if (ponyList.indexOf(sender.MemberNumber)>=0) {ponyList.splice(ponyList.indexOf(sender.MemberNumber),1)}
    if (ReputationCharacterGet(sender,"Dominant")<40) {
      dressLike(sender,"trainer sub")
    } else {
      dressLike(sender,"trainer")
      if (ReputationCharacterGet(sender,"Dominant")>=80) {
        InventoryWear(sender, "MistressGloves", "Gloves", "#cccccc");
        ChatRoomCharacterUpdate(sender)
      }
    }

  } else if (msg.toLowerCase().includes("enter")) {
    if (isPony(sender)) {
      if (!trackPony) {
        trackPony = sender
        ServerSend("ChatRoomChat", { Content: "*" + trackPony.Name + " enters the track. " + (trackTrainer ? trackTrainer.Name + " is already inside." : ""), Type: "Emote"} )
        ponyLocation = "abcdefghlm"[Math.floor(Math.random() * "abcdefghlm".length)]
        ponyLastLocation = false
        performedTrickList = []
        ServerSend("ChatRoomChat", { Content: "*" + trackPony.Name + " starts at " + locationDict[ponyLocation] + " (" + ponyLocation.toUpperCase() + ").", Type: "Emote"} )
        trainerLocationDescription()

      } else {
        ServerSend("ChatRoomChat", { Content: "*" + trackPony.Name + " is already in the track.", Type: "Emote", Target: sender.MemberNumber} )
      }
    } else if (isTrainer(sender)) {
      if (!trackTrainer) {
        trackTrainer = sender
        InventoryWear(sender, "SpankingToys","ItemHands")
        ChatRoomCharacterUpdate(sender)
        ServerSend("ChatRoomChat", { Content: "*" + trackTrainer.Name + " enters the track. " + (trackPony ? trackPony.Name + " is already inside." : ""), Type: "Emote"} )
      } else {
        ServerSend("ChatRoomChat", { Content: "*" + trackTrainer.Name + " is already in the track.", Type: "Emote", Target: sender.MemberNumber} )
      }
    } else {
      ServerSend("ChatRoomChat", { Content: "*You are neither a pony nor a trainer.", Type: "Emote", Target: sender.MemberNumber} )
    }
  }


  if ((trackPony.MemberNumber == sender.MemberNumber) || (trackTrainer.MemberNumber == sender.MemberNumber)) {
    if (msg.toLowerCase().includes("exit")) {
      ServerSend("ChatRoomChat", { Content: "*" + (trackTrainer? trackTrainer.Name : "") + (trackTrainer && trackPony? " and " : "" ) + (trackPony? trackPony.Name : "") + " leave the track.", Type: "Emote"} )
      if (trackPony) {InventoryRemove(trackPony,"ItemEars"); ChatRoomCharacterUpdate(trackPony)}
      trackPony = false
      trackTrainer = false
    }
  } else {
    if (["!point","!freeform easy","!contest easy","!freeform hard","!contest hard","!stop","!stand","!piaffe","!pirouette","!walk","!passage","!gallop","!jump"].includes(msg)) {
      ServerSend("ChatRoomChat", { Content: "*You are not inside the track." , Type: "Emote", Target: sender.MemberNumber} )
    }
  }

  if (trackTrainer.MemberNumber == sender.MemberNumber) {
    if (msg.toLowerCase().includes("point")) {
      trainerSelectedLocation = msg.charAt(msg.length - 1).toLowerCase()
      if (linkDict[ponyLocation+trainerSelectedLocation]) {
        if (linkDict[ponyLocation+trainerSelectedLocation].includes("jump")) {
          ServerSend("ChatRoomChat", { Content: "*"+ trackTrainer.Name + " points the ponygirl towards the obstacles.", Type: "Emote"} )
        } else {
          ServerSend("ChatRoomChat", { Content: "*"+ trackTrainer.Name + " points the ponygirl towards a " + linkDict[ponyLocation+trainerSelectedLocation] + " path.", Type: "Emote"} )
        }
      } else {
        ServerSend("ChatRoomChat", { Content: "*There is no path to " + trainerSelectedLocation.toUpperCase() + "." , Type: "Emote", Target: trackTrainer.MemberNumber} )
      }

    } else if (msg.toLowerCase().includes("freeform") && trackPony) {
      startEvaluationSession(msg, "freeform")
    } else if (msg.toLowerCase().includes("contest") && trackPony) {
      startEvaluationSession(msg, "contest")
      if (msg.toLowerCase().includes("easy") || msg.toLowerCase().includes("hard")) {
        ServerSend("ChatRoomChat", { Content: showcontestTrickList(), Type: "Emote", Target: sender.MemberNumber} )
      }
    } else if (msg.toLowerCase().includes("stop")) {
      if (trackPony) {InventoryRemove(trackPony,"ItemEars"); ChatRoomCharacterUpdate(trackPony)}
      ponyResult()
      judgeType = false
    }

  } else if (trackPony.MemberNumber == sender.MemberNumber) {

    // check if the location selected by the trainer makes sense
    if (trainerSelectedLocation == ponyLocation) {
      trainerSelectedLocation = false
    }

    if (msg.toLowerCase().includes("stand")) {
      performedTrickList.push("stand")
      ServerSend("ChatRoomChat", { Content: "*" + trackPony.Name + " stands still, with her body straightened and her back arched forward.", Type: "Emote"} )
      if (judgeType == "contest") { checkContestTrickList("stand") }

    } if (msg.toLowerCase().includes("piaffe")) {
      performedTrickList.push("piaffe")
      ServerSend("ChatRoomChat", { Content: "*" + trackPony.Name + " moves her legs up and down remaining in place. Each time she brings her thight perfectly parallel to the ground and the knee at ninty degree before moving it down.", Type: "Emote"} )
      if (judgeType == "contest") { checkContestTrickList("piaffe") }

    } if (msg.toLowerCase().includes("pirouette")) {
      performedTrickList.push("pirouette")
      ServerSend("ChatRoomChat", { Content: "*" + trackPony.Name + " turns around with a fluid movement, all her figure stretched while she twists her body and completes the round.", Type: "Emote"} )
      if (judgeType == "contest") { checkContestTrickList("pirouette") }

    } if (msg.toLowerCase().includes("walk")) {
      performedTrickList.push("walk")
      ServerSend("ChatRoomChat", { Content: "*" + trackPony.Name + " moves forward breathing slowly as she places a foot in front of the other, keeping her legs straight.", Type: "Emote"} )
      ponyMove("walk")

    } if (msg.toLowerCase().includes("passage")) {
      performedTrickList.push("passage")
      ServerSend("ChatRoomChat", { Content: "*" + trackPony.Name + " takes the raised leg at the heigth of her hip while the other pushes her body as high as she can.", Type: "Emote"} )
      ponyMove("passage")

    } if (msg.toLowerCase().includes("gallop")) {
      performedTrickList.push("gallop")
      ServerSend("ChatRoomChat", { Content: "*" + trackPony.Name + " runs forward with fast long strides and her breasts moving around.", Type: "Emote"} )
      ponyMove("gallop")

    } if (msg.toLowerCase().includes("jump")) {
      ponyMove("jump") //In this case the code is already inside the ponyMove function

    }
  }
}


trickDictionary = {
  "stand": "Stand still.",
  "piaffe": "Trot in place.",
  "pirouette": "Make a 360 dregrees turn.",
  "walk": "Perform a walk.",
  "passage": "Perform a passage.",
  "gallop": "Gallop on a long distace.",
  "jumpSmall": "Jump over a small obstacle.",
  "jumpMedium": "Jump over a medium obstacle.",
  "jumpHigh": "Jump over a high obstacle.",
  "freestyle": "freestyle path."
}

judgeFullTrickDict = {}
judgeFullTrickDict["stand"] = {"name": "stand", "desc": "Stand still", "location": true, "bonus": false}
judgeFullTrickDict["piaffe"] = {"name": "piaffe", "desc": "Trot in place", "location": true, "bonus": false}
judgeFullTrickDict["pirouette"] = {"name": "pirouette", "desc": "Make a 360 dregrees turn", "location": true, "bonus": false}
judgeFullTrickDict["doublepirouette"] = {"name": "doublepirouette","desc": "Make a 720 dregrees turn", "location": true, "bonus": false}
judgeFullTrickDict["walk"] = {"name": "walk", "desc": "Perform a walk", "location": false, "bonus": false}
judgeFullTrickDict["passage"] = {"name": "passage", "desc": "Perform a passage", "location": false, "bonus": false}
judgeFullTrickDict["gallop"] = {"name": "gallop", "desc": "Gallop on a long distace", "location": false, "bonus": false}
//judgeFullTrickDict["gallopRound"] = {"name": "gallopRoundp", "desc": "Gallop around the whole track", "location": false, "bonus": false}
judgeFullTrickDict["jumpSmall"] = {"name": "jumpSmall", "desc": "Jump over a small obstacle", "location": false, "bonus": false}
judgeFullTrickDict["jumpMedium"] = {"name": "jumpMedium", "desc": "Jump over a medium obstacle", "location": false, "bonus": false}
judgeFullTrickDict["jumpHigh"] = {"name": "jumpHigh", "desc": "Jump over a high obstacle", "location": false, "bonus": true}
judgeFullTrickDict["jumpSimple"] = {"name": "jumpSimple", "desc": "Jump without an obstacle", "location": false, "bonus": false}
judgeFullTrickDict["jumpAny"] = {"name": "jumpAny", "desc": "Jump over any obstacle", "location": false, "bonus": false}


function createcontestTrickList () {
  numTrick = 4
  contestTrickList = []
  judgeFullTrickDictKeys = Object.keys(judgeFullTrickDict)
  for (var ii = 0; ii < numTrick; ii++) {
    trick = judgeFullTrickDictKeys[Math.floor(Math.random() * judgeFullTrickDictKeys.length)]
    contestTrickList.push({"name": trick,
      "desc": judgeFullTrickDict[trick]["desc"],
      "location": (judgeFullTrickDict[trick]["location"] ? "abcdefghlm"[Math.floor(Math.random() * "abcdefghlm".length)] : false),
      "completed": false,
      "bonus": judgeFullTrickDict[trick]["bonus"],
    })
  }
  return contestTrickList
}

function showcontestTrickList() {
  bonusMsg = ""
  msg = `*----------------------------------------------------` + nl
  for (var ii = 0; ii < contestTrickList.length; ii++) {
    if (contestTrickList[ii]["bonus"]) {
      bonusMsg = bonusMsg + (contestTrickList[ii]["completed"] ? " X - " : " BONUS - " ) + contestTrickList[ii]["desc"] + (contestTrickList[ii]["location"] ? " in " + contestTrickList[ii]["location"].toUpperCase() : "") + nl
    } else {
      msg = msg + (contestTrickList[ii]["completed"] ? " X - " : " - " ) + contestTrickList[ii]["desc"] + (contestTrickList[ii]["location"] ? " in " + contestTrickList[ii]["location"].toUpperCase() : "") + nl
    }
  }
  msg = msg + bonusMsg
  msg = msg + `-----------------------------------------------------`

  return msg

}


function checkContestTrickList (action) {

  for (var ii = 0; ii < contestTrickList.length; ii++) {

    if (!contestTrickList[ii]["completed"] && contestTrickList[ii]["name"].includes(action)) {
      // check the location
      if (!contestTrickList[ii]["location"] || contestTrickList[ii]["location"] == ponyLocation) {
        // Continue to read the code below
      } else {
        continue // skip this iteration
      }

      if (contestTrickList[ii]["name"] == action) {
        contestTrickList[ii]["completed"] = true
      } else if (action == "gallop") {
      } else if (action == "pirouette") {
        if (contestTrickList[ii]["name"] == "doublepirouette" && performedTrickList.length >= 2 && performedTrickList[performedTrickList.length - 1] == "pirouette" && performedTrickList[performedTrickList.length - 2] == "pirouette" ) {
          contestTrickList[ii]["completed"] = true
        }
      } else if (action == "jump") {
        if (contestTrickList[ii]["name"] == "jumpAny" && ["jumpSmall","jumpMedium","jumpHigh"].includes(performedTrickList[performedTrickList.length - 1])) {
          contestTrickList[ii]["completed"] = true
        } else if (contestTrickList[ii]["name"] == performedTrickList[performedTrickList.length - 1]) {
          contestTrickList[ii]["completed"] = true
        }
      }

      // if now the trick is completed you can skip all the rest and signal it to the trainer
      if (contestTrickList[ii]["completed"]) {
        ServerSend("ChatRoomChat", { Content: "*COMPLETED: " + contestTrickList[ii]["name"] + ".", Type: "Emote", Target: trackTrainer.MemberNumber} )
        break
      }
    }
  }
}


function startEvaluationSession(msg, type) {
  if (msg.toLowerCase().includes("easy") || msg.toLowerCase().includes("hard")) {
    performedTrickList = []
    judgeType = type
    if (type == "contest") {contestTrickList = createcontestTrickList()}
    if (msg.toLowerCase().includes("hard")) {
      InventoryWear(trackPony, "HeavyDutyEarPlugs", "ItemEars");
      ChatRoomCharacterUpdate(trackPony)
      ServerSend("ChatRoomChat", { Content: "*During the evaluation you will wear earplugs.", Type: "Emote", Target: trackPony.MemberNumber} )
    }
    ServerSend("ChatRoomChat", { Content: "*The judge is ready to start her evaluation.", Type: "Emote"} )
  } else {
    ServerSend("ChatRoomChat", { Content: "*You need to specify if you want an easy or hard session.", Type: "Emote", Target: trackTrainer.MemberNumber} )
  }
}

function ponyResult() {

  if (!judgeType) {
    ServerSend("ChatRoomChat", { Content: "*The judge was not evaluating any performance." + nl + msg, Type: "Emote", Target: trackTrainer.MemberNumber} )

  } else if (judgeType=="freeform") {

    result = 0
    jumpCount = 0
    for (var ii = 0; ii < performedTrickList.length; ii++) {
      if (performedTrickList[ii].includes('jumpHigh')) {
        result = result + 5
        jumpCount += 1
      } else if (performedTrickList[ii].includes('jumpMedium')) {
        result = result + 4
        jumpCount += 1
      } else if (performedTrickList[ii].includes('jumpSmall')) {
        result = result + 3
        jumpCount += 1
      } else if (performedTrickList[ii].includes('jumpSimple')) {
        result = result + 2
      } else if (performedTrickList[ii].includes('jumpFailed')) {
        result = result - 0
      } else {
        result = result + 2
      }
    }
    result = result - performedTrickList.length

    result = Math.floor(result * (1 + ponyLevel(trackPony)/10))

    msg = `-----------------------------------------------------` + nl
    msg = msg + `Pony: ` + trackPony.Name + nl
    msg = msg + `Trainer: ` + trackTrainer.Name + nl
    msg = msg + `Number of tricks: ` + performedTrickList.length + nl
    msg = msg + `Number of obstacles jumped: ` + jumpCount + nl
    msg = msg + `POINTS: ` + result + nl
    msg = msg + `-----------------------------------------------------`

    ServerSend("ChatRoomChat", { Content: "*The judge is ready to give her evaluation: " + nl + msg, Type: "Emote"} )

  } else if (judgeType == "contest") {
    result = 0
    numAction = 0
    numReq = 0
    numReqCompleted = 0
    numBonus = 0
    numBonusCompleted = 0

    for (var ii = 0; ii < contestTrickList.length; ii++) {
      if (contestTrickList[ii]["bonus"]) {
        numBonus += 1
        if (contestTrickList[ii]["completed"]) {numBonusCompleted += 1}
      } else {
        numReq += 1
        if (contestTrickList[ii]["completed"]) {numReqCompleted += 1}
      }
    }

    result = numReqCompleted*4 - numAction - (numReq-numReqCompleted)*3 + numBonusCompleted*8
    result = Math.floor(result * (1 + ponyLevel(trackPony)/10))

    msg = `-----------------------------------------------------` + nl
    msg = msg + `Pony: ` + trackPony.Name + nl
    msg = msg + `Trainer: ` + trackTrainer.Name + nl
    msg = msg + `Number of actions: ` + performedTrickList.length + nl
    msg = msg + `Requests: ` + numReq + nl
    msg = msg + `Requests completed: ` + numReqCompleted + nl
    msg = msg + `Bonus requests completed: ` + numBonusCompleted + nl
    msg = msg + `POINTS: ` + result + nl
    msg = msg + `-----------------------------------------------------`

    ServerSend("ChatRoomChat", { Content: "*The judge is ready to give her evaluation: " + nl + msg, Type: "Emote"} )

  }
}


function trainerLocationDescription() {
  backMsg = ""
  msg = `*----------------------------------------------------` + nl
  for (let key in linkDict) {
    if (key.includes(ponyLocation)) {
      if (key.includes(ponyLastLocation)) {
        backMsg = key.replace(ponyLocation,"").toUpperCase() + ` (back) - ` + trickDictionary[linkDict[key]] + nl
      } else {
        msg = msg + key.replace(ponyLocation,"").toUpperCase() + ` - ` + trickDictionary[linkDict[key]] + nl
      }
    }
  }
  msg = msg + backMsg
  msg = msg + `-----------------------------------------------------`
  if (trackTrainer) {ServerSend("ChatRoomChat", { Content: msg , Type: "Emote", Target: trackTrainer.MemberNumber} )}
}



function checkActionPathCompatibility(action, path){

  if (action == "jump") {
    if (path.includes("jump") || path.includes("freestyle")) {return true} else {return false}
  } else if (action == "gallop") {
    if (path.includes("gallop")) {return true} else {return false}
  } else if (["walk", "passage"].includes(action)){
    if (path.includes("freestyle")) {return true} else {return false}
  }

  return false
}

function ponyMove(action) {

  newLocation = false
  goBackOption = false

  for (let key in linkDict) {
    if (key.includes(ponyLocation) && (!trainerSelectedLocation || key.includes(trainerSelectedLocation))) {
      if (checkActionPathCompatibility(action, linkDict[key])) {
        if (key.replace(ponyLocation,"") == ponyLastLocation) {
          goBackOption = true
        } else {
          newLocation = key.replace(ponyLocation,"")
          break
        }
      }
    }
  }

  if (!newLocation && goBackOption) { newLocation = ponyLastLocation}



  if (!newLocation) {
    if (action == "gallop") {
      newLocation = "abcd"[Math.floor(Math.random() * "abcd".length)]
    } else {
      newLocation = "abcdefghlm"[Math.floor(Math.random() * "abcdefghlm".length)]
    }
    ponyLocation = false
    msg = "*She wanders in track and stops at "
  } else if (ponyLastLocation == newLocation) {
    msg = "*She goes back to "
  } else {
    msg = "*She gets to "
  }

  ponyLastLocation = ponyLocation
  ponyLocation = newLocation
  trainerSelectedLocation = false

  // JUMP
  if (action == "jump") {
    for (let key in linkDict) {
      if (key.includes(ponyLastLocation) && key.includes(ponyLocation)) {
        if (linkDict[key] == "jumpHigh") { jumpDifficulty = 5; jumpType = "jumpHigh"}
        else if (linkDict[key] == "jumpMedium") { jumpDifficulty = 2; jumpType = "jumpMedium"}
        else if (linkDict[key] == "jumpSmall") { jumpDifficulty = 1; jumpType = "jumpSmall"}
        else { jumpDifficulty = 0; jumpType = "jumpSimple"}
        break
      }
    }

    if (jumpDifficulty>0) {

      ServerSend("ChatRoomChat", { Content: "*" + trackPony.Name + " takes a run and jump.", Type: "Emote"} )
      if (ponyLevel(trackPony) >= jumpDifficulty) {
        ServerSend("ChatRoomChat", { Content: "*The pony girl is able to pass the obstacle without problems.", Type: "Emote"} )
        performedTrickList.push(jumpType)
      } else {
        ServerSend("ChatRoomChat", { Content: "*The pony girl hits the obstacle and makes it fall into the ground.", Type: "Emote"} )
        performedTrickList.push("jumpFailed")
      }

    } else {
      if (ponyLevel(trackPony) >= jumpDifficulty) {
        ServerSend("ChatRoomChat", { Content: "*" + trackPony.Name + " performs a jump while moving forward." , Type: "Emote"} )
        performedTrickList.push(jumpType)
      } else {
        ServerSend("ChatRoomChat", { Content: "*" + trackPony.Name + " tries to performs a jump but almost trips." , Type: "Emote"} )
        performedTrickList.push("jumpFailed")
      }
    }
  }

  if (judgeType == "contest") { checkContestTrickList(action) }

  // FINAL LOCATION
  msg = msg + locationDict[ponyLocation] + " (" + ponyLocation.toUpperCase() + ")."
  obstaclesAvailable = false
  for (let key in linkDict) {
    if (key.includes(ponyLocation) && linkDict[key].includes("jump")) {
      obstaclesAvailable = true
    }
  }
  if (obstaclesAvailable) { msg = msg + nl + "There are obstacles that she can jump."}
  ServerSend("ChatRoomChat", { Content: msg, Type: "Emote"} )

  trainerLocationDescription()

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


function InventoryBlockedOrLimitedCustomized(C, ItemAsset, ItemType) {
  // slight variation of the official function InventoryBlockedOrLimited
  Item = {"Asset": ItemAsset}
	let Blocked = InventoryIsPermissionBlocked(C, Item.Asset.DynamicName(Player), Item.Asset.DynamicGroupName, ItemType);
	let Limited = !InventoryCheckLimitedPermission(C, Item, ItemType);
	return Blocked || Limited;
}

function isPony(C) {
	return ponyList.indexOf(C.MemberNumber) >= 0
}

function isTrainer(C) {
	return trainerList.indexOf(C.MemberNumber) >= 0
}

function ponyLevel(C) {
  // minimum is -4 (pretty impossible)
  // maximum is 5 + 1 for each 200 days from creation
  lv = Math.floor((CurrentTime - C.Creation) / 86400000 /200);
  lv = lv + Math.floor(Math.max(0,-1*ReputationCharacterGet(C,"Dominant"))/40);
  lv = lv + (InventoryGet(C,"BodyUpper").Asset.Name == "Large" ? -1 : 0 ) + (InventoryGet(C,"BodyUpper").Asset.Name == "XLarge" ? -2 : 0 )
  lv = lv + (InventoryGet(C,"BodyLower").Asset.Name == "Small" ? -1 : 0 )
  lv = lv + Math.min(3,Math.floor((InventoryGet(C,"Height").Asset.Name.replace("H","")-900)/20)-1)

  return lv
}
