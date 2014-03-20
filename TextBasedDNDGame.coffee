# @prepros-prepend mapStates.coffee
# @prepros-prepend townStates.coffee

# @prepros-prepend creatures.coffee 
# @prepros-prepend helperFunctions.coffee
# @prepros-prepend weapons.coffee
# @prepros-prepend classes.coffee


$ = jQuery

@run = () ->
	if @turn != 0
		println "---"
	
	console.log @state
	
	for x in [0..3]
		for y in [0..3]
			if @map[y][x] == @state
				@locX = x
				@locY = y


	#This is setting up the game
	if @state == "start"
		setState "story"
	else if @state == "story"
		println "You were born in the town of Zemboria. Your father was an important #{dropDown(["Nobleman", "Blacksmith", "Merchant"])}. One day, when you came home, you found both of your parents brutally killed. You ask the neighbors and they tell you that they were slain by a #{dropDown(["Holy Justicar", "Spider-dog", "Rampaging Orc"])}. You set off on your #{dropDown(["easy", "medium", "hard"])} quest to avenge their death."

		println ""
		button "inTown", "I'm ready to begin"

	else if @state == "dead"
		println "You have died : ("
		println "You find yourself back in the town"

		@xp -= 15
		if @xp < 0 
			@xp = 0

		@gp -= 200
		if @gp < 0 
			@gp = 0

		@hp = 60
		println "Almerond: Stop making me revive you, young whippersnapper. I've charged you 200 gold peices for my trouble, thank you very much. Maybe if you bought some of my high-quality health potions you wouldn't die so much."
		setState "mage"

	# ---- town states ----
	townStatesRun()
	
	# ------------ Map --------------
	mapStatesRun()

	# --------------- Fights ----------------
	if @state == "fightYourTurn"
		
		for enemy in @enemies
			button "dealDamageToEnemy", "Attack " + enemy
		button "runAway", "Run Away"
		

	else if @state == "dealDamageToEnemy"
		damage = @weapon.roll()

		if damage == 0
			println "You missed!"
		else
			println "You hit him for #{damage} damage"
	
		@enemies[0].hp -= damage

		setState "fightEnemyTurn"

	else if @state == "fightEnemyTurn"
		
		if @enemies[0].isDead()
			setState "winBattle"
		else
			button "evade", "Evade (#{@evade * 100}% change of evading all damage)"
			button "block", "Block (enemy does #{@block} less damage to you)"

	else if @state == "runAway"	
		damage = @enemies[0].weapon.roll()
		if damage == 0
			println "You sucessfully run away and take no damage"
		else
			println "You take #{damage} damage as you are running away"

		@hp -= damage
		
		setState loadState()

	# ---- Evade and Block ----
	else if @state == "evade"
		if prob @evade #This is the evasion probability
			if prob .1
				println "With ninja skills of ninjaness, you dodged the attack."
			else
				println "You've evaded the attack!"
		else
			damage = @enemies[0].roll()
			println "You failed to evade and took #{damage} damage"

		setState "fightYourTurn"

	else if @state == "block"
		damage = @enemies[0].roll()
		damage -= @block #Because you are blocking

		if damage <= 0
			println "You completely blocked the attack, and recieve 0 damage."
		else
			println "You took #{damage} damage"
			@hp -= damage
	
		setState "fightYourTurn"

	else if @state == "winBattle"
		if @enemies[0].gp > 0
			println "You looted #{@enemies[0].gp} gold off the body"
			@gp += @enemies[0].gp
		else
			println "You found nothing on the body"

		if @enemies[0].xp != 0
			println "You gained #{@enemies[0].xp} xp from the battle"
			@xp += @enemies[0].xp

		@enemies = [] #There are no more enemies to fight (for now)
		setState loadState()

	else if @hp <= 0
		setState "dead"

	#Keep track of all states that the player has entered
	@statesEntered.push @state

	#Keep track of what turn it is
	@turn++

#Initialize everything
@sixSidedDie = new Die 1, 6, 0
@tenSidedDie = new Die 1, 10, 0
@twentySidedDie = new Die 1, 20, 0
@hundredSidedDie = new Die 1, 100, 0

#Drops
@smallDrop = new Die 2, 200, -100
@mediumDrop = new Die 4, 200, -200
@largeDrop = new Die 6, 300, -300
@hugeDrop = new Die 12, 400, -500

#Damage
@smallDamage = new Die 3, 6, -3
@mediumDamage = new Die 6, 6, -6
@largeDamage = new Die 9, 9, -9
@hugeDamage = new Die 15, 12, -2

#HPs
@smallHP = new Die 4, 5, +20
@mediumHP = new Die 8, 5, +40
@largeHP = new Die 12, 7, +60
@hugeHP = new Die 15, 15, +80



# --- The Map ---
@map = [["Plain of Ashard", "Spider Forest", 	"Lake Mysterious", 	"Eora River"],
		["foothills", 		"forest", 			"marshes",			"Amazon"],
		["desert", 			"town of Zemboria", "swamp", 			"deeper swamp"],
		["wasteland", 		"Beara Mountains", 	"Zealon Dungeon", 	"Dangerous Forest"]]

@locX = 1
@locY = 2

@returnToState = undefined
@enemies = []
@state = "start"

@hp = 60
@mp = 50
@gp = 300
@xp = 0
@block = 2
@evade = 0.2
@turn = 0
@inventory = [new HealthPotion(), new HealthPotion()]
@weapon = new Weapon smallDamage, "Short Sword", 10

@statesEntered = []


$ ->
	refresh() #set the refresh script in motion
	run() #call run for the first time on the start state