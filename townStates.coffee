@townStatesRun = ->
	upgradeEvadeXPCost = (@evade * 1000 + 100)
	upgradeBlockXPCost = (@block * 100 + 10)

	#This is the town
	if @state == "inTown"
		println "You are in the town of Zemboria"
		println "What do you want to do?"
		button "town of Zemboria", "Leave town"
		button "shops", "Look at the shops"
		button "people", "Talk to people"
		button "Trainer", "Go to the Trainer"
	else if @state == "Trainer"
		println "Trainer: I can upgrade your block or evade."
		button "upgrade block", "Upgrade Block to #{block + 1} (#{upgradeBlockXPCost} xp)"
		button "upgrade evade", "Upgrade Evade to #{@evade + .1} (#{upgradeEvadeXPCost} xp)"
	else if @state == "upgrade evade"
		if @xp >= upgradeEvadeXPCost
			@xp -= upgradeEvadeXPCost
			@evade += 0.1
			println "You train and train and you finally get stronger"
		else 
			println "I aint gonna train you if you arent going to pay me my price."
		setState "Trainer"
	else if @state == "upgrade block"
		if @xp >= @block * 100
			@xp -= @block * 100
			@block += 1
			println "You train and train and you finally get more agile"
			
		else 
			println "I aint gonna train you if you arent going to pay me my price."
		setState "Trainer"

	# --- Shops ---
	else if @state == "shops"
		println "The shops are small but friendly"
		button "blacksmith", "Visit John the Blacksmith"
		button "fletcher", "Visit Ken the Fletcher"
		button "mage", "Visit Almerond the Mage"
		button "inTown", "Done shopping"
	else if @state == "town of Zemboria"
		println "Which way do you want to go?"
		button "inTown", "Enter the town"
		showMap()
	
	# --- Blacksmith ---
	else if @state == "blacksmith"
		println "John: Hello there, what can i do for you?"
		button "daggers", "I'd like to look at your daggers."
		button "swords", "I'd like to take a look at your swords."
		button "shops", "Leave the Blacksmith"
	else if @state == "daggers"
		println "Here's what I've got"
		
		@returnToState = @state

		button smallDagger, smallDagger
		button daggerofshadow, daggerofshadow
		button daggerofdeath, daggerofdeath
		button "aboutDaggers", "Can you tell me more about daggers?"
		button "blacksmith", "I guess I'm not interested in daggers"
	else if @state == "aboutDaggers"
		println "Daggers are small and fast. Some daggers will let you strike twice per turn, some daggers are poisoned."
		button "daggers", "Thanks."

	else if @state == "swords"
		println "These are the swords I've got."

		@returnToState = @state
		
		button swordofthefeather, swordofthefeather
		button supersword, supersword
		button swordofthesun, swordofthesun
		button "aboutSwords", "Can you tell me more about swords?"
		button "blacksmith", "I'm not really interested in swords"
	else if @state == "aboutSwords"
		println "Swords are powerful and balanced. They tend to do more damage than daggers, but are more expensive."
		button "swords", "Thanks."

	else if @state == "fletcher"
		println "Ken: Hello there me matey. What can I do for you on this fine day?"
		button "crossbows", "Might i have a look at your crossbows."
		button "longBows", "i'll take a look at your long bows."  
		button "shops", "Leave the Fletcher"
	else if @state == "crossbows"
		println "Here's what I've got in the way of crossbows."

	# --- Mage ---
	else if @state == "mage"
		println "You see a musty old shop with magical stuff everywhere. All over the shelves of the shop you see Hydra heads, slamander tails, frog tongue and other such magical things."
		println "You hear a booming voice: What do you want youngster? I was just taking a magicians nap!"

		if not visited "mage"
			println "You may call me Almerond."
		
		button "potions", "May I look at your potion selection?"
		button "staffs", "What staffs do you have?"
		button "scrolls", "What in the way of scrolls do you have?"
		button "heal", "Heal 10 hp (100 gp)"
		button "enchant", "Enchant Weapon (500 gp)"
		button "shops", "I'm sorry for intruding, Almerond. Thank you."
	
	else if @state == "enchant"
		cost = 500
		if @gp >= cost
			@weapon.die.numberOfDice += 1
			@gp -= cost
			println "Your weapon has been enchanted."
		else
			println "What you trying to do, scamp."
		setState "mage"

	else if @state == "heal"
		cost = 100
		if @gp >= cost
			println "You pay #{cost} gp"
			@hp += 10
			@gp -= cost
		else
			println "you trying to cheat me boy."
			setState "mage"
	else if @state == "potions"
		println "Potions will give you momentary advantages over enemies but they only last for a single battle."
		button "Health Potion buying", "Buy Health potion (30 gp)"
	else if @state == "staffs"
		println "Staffs are what make the mage, if you watched lord of the rings you would know that."
		setState "mage"
	else if @state == "scrolls"
		println "Scrolls are powerfull spells that can decimate your enemy."
		setState "mage"
	else if @state == "Health Potion buying"
		if	gp >= 30
			gp -= 30
			inventory.push(new HealthPotion())
		else
			println "You trying to cheat me scamp!!!"

		setState "mage"
	# ------------ People ------------
	else if @state == "people"
		if prob .25
			setState("Dungeon guy")
		else if prob .50
			setState("mayor")
		else
			println("No one is out and about.")
			setState("inTown")


	else if @state == "Dungeon guy"
		if visited "Dungeon guy win"
			println "Thank you so much i cant ever thank you enough"
		else
			if (visited "Dungeon guy") and (visited "Zealon Dungeon")
				setState "Dungeon guy win"
			else 
				println "Howdy, stranger. My name is Alastor. Let me tell you my story."
				println "My family's heirloom, a great horn that my great great great grandfather used in the great guild wars, one day dissapeared. I raised a hue and cry and paid the best trackers around to find the people that stole it. They eventually tracked them down to the Zealon Dungeon. I tried to hire people to kill them and get my horn back but everyone was to scared to venture into the Zealon Dungeon. So I wish for you to go in there, kill them and get me my horn back. I'll reward you 1000 gold for retrieving the horn."
				button "inTown", "I'll see what I can do."

	else if @state == "Dungeon guy win"
		@gp += 1000
		println "thank you so much i cant ever thank you enough!!! Heres 1000 gp for getting my heirloom."
		button "inTown", "My pleasure."

	else if @state == "mayor"
		if visited "mayor win"
			println "Thanks"
		else
			println "Ever since the great guild wars that ravaged this land long ago,	
			 The land has been infested with every sort of nasty mosnter.
			 The goblins are the worst though,
			 They raid the villages of alavar. 
			 They are a menace to everyone.
			 So i wish for you to go and raid them.
			 I will pay you 500 gold (kill 5 goblins)."

	# --- Weapons ---
	else if @state == smallDagger.toString()
		if @gp >= smallDagger.price
			@gp -= smallDagger.price
			@weapon = smallDagger
			println "Congratulations on buying the Dagger of awesome. You look at it and see that its awesome"
		else
			println "Take your hands off that dagger. You aint got the money to pay for that beauty."

		setState loadState()
	
	else if @state == swordofthefeather.toString()
		if @gp >= swordofthefeather.price
			@gp -= swordofthefeather.price
			@weapon = swordofthefeather
			println "You pick up the sword and it is incredibly light. It feels wonderful in your hands."
		else
			println "Get out of here cheapskate."

		setState loadState()
	
	else if @state == supersword.toString()
		if @gp >= supersword.price
			@gp -= supersword.price
			@weapon = supersword
			println "You pick up the sword and suddenly you feel like super man. You feel like you can do anything."
		else
			println "Get out of here cheapskate."

		setState loadState()

	else if @state == swordofthesun.toString()
		if @gp >= swordofthesun.price
			@gp -= swordofthesun.price
			@weapon = swordofthesun
			println "You pick up the sword and it glows with an angelic light."

		else 
			println "Dont come back here Hobo."
		setState loadState()
	else if @state == daggerofshadow.toString()
		if @gp >= daggerofshadow.price
			@gp -= daggerofshadow.price
			@weapon = daggerofshadow
			println "you can barely see the dagger its so cloaked by Shadow. it is cold to the touch."
		else 
			println "Set your hands of that dagger."
		setState loadState()
	else if @state == daggerofdeath.toString()
		if @gp >= daggerofdeath.price
			@gp -= daggerofdeath.price
			@weapon = daggerofdeath
			println "This dagger has the stench of Death. it had perpetual blood on its edge. No matter how much you wipe it never comes of."
		else
			println "Stop touching that beauty, poor guy. You can't afford it."
		setState loadState()	
	else if @state == powerfulllongbow.toString()
		if @gp >= powerfulllongbow.price
			@gp -= powerfulllongbow.price
			@weapon = powerfulllongbow
			println "You heft the beautiful long bow and then throw it over your shoulder."
		else 
			println "You aint got the money te pay for that beauty, so go away."
		setState loadState()

	else if @state == longbowoffire
		if @gp >= longbowoffire.price
			@gp -= longbowoffire.price
			@weapon = longbowoffire
			println "There are beautiful carvings of fire and in the darkness those engravings flicker like fire. (he says reverantly)"
		else
			println "Get your hands of that ye scurvy scallywag, that one of my best bows. Unless yev actually got te gold for it."
		setState loadState()

