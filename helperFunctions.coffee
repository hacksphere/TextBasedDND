@print = (text) ->
	($ ".game").append text

@println = (text) ->
	print text
	print "<br>"

@setState = (newState) ->
	@state = newState
	run()

@loadState = ->
	returnToState

@button = (newState, text) ->
	println """<button onclick="setState('#{newState}')">
		#{text}
		</button>"""

@dropDown = (options) ->
	result = "<select>"

	for option in options
		result += "<option>"
		result += option
		result += "</option>"

	result += "</select>"

	return result

@prob = (probability) ->
	Math.random() <= probability

@inBounds = (x, y) ->
	x >=0 and y >= 0 and x < 4 and y < 4 #The map is currently a 4x4

@randomAdjective = ->
	["Mean", "Nasty", "Terrible", "Ugly"][Math.floor(Math.random() * 4)]

@showMap = () ->
	if inBounds(@locY+1, @locX) and @map[@locY+1][@locX]
		button @map[@locY+1][@locX], """Head south to the #{@map[@locY+1][@locX]}"""
	if inBounds(@locY-1, @locX) and @map[@locY-1][@locX]
		button @map[@locY-1][@locX], """Head north to the #{@map[@locY-1][@locX]}"""
	if inBounds(@locY, @locX+1) and @map[@locY][@locX+1]
		button @map[@locY][@locX+1], """Head east to the #{@map[@locY][@locX+1]}"""
	if inBounds(@locY, @locX-1) and @map[@locY][@locX-1]
		button @map[@locY][@locX-1], """head west to the #{@map[@locY][@locX-1]}"""

@visited = (state) ->
	state in @statesEntered

# --- Stats ---
@printstat = (string) -> 
	($ ".stats").append "<br>"
	($ ".stats").append string

@useInventoryItemN = (n) ->
	@inventory[n].use()
	console.log "TEST"

@convertAlignmentNumberToWord = (number) ->
	if (number) == -1
		return "Hate"
	else if (number) == 0
		return "neautral"
	else if (number) == 1
		return "Love"
	else if (number) < -0.5
		return "Strongly Dislike"
	else if (number) < 0
	 	return "Dislike"
	else if (number) > 0.5
		return "Strongly Like"
	else if (number) > 0
		return "Like"
	else
		return "ERROR, COMPUTER BLOWING UP IN 5... 4... 3... 2... 1... BOOOOOOOOOOOOOOOOOOM (EXPLOSION NOISES)"
@refresh = ->
	#Refresh the stats:
	($ ".stats").html("")

	for enemy in @enemies
		printstat ""
		printstat "Enemy stats:"
		printstat "HP: " + enemy.hp

	printstat ""
	printstat "Your stats:"
	printstat "HP: #{@hp}"
	printstat "MP: #{@mp}"
	printstat "GP: #{@gp}"
	printstat "XP: #{@xp}"
	printstat ""
	printstat "Your allignments:"
	printstat "Zealon: #{convertAlignmentNumberToWord(@zealonAlignment)}"
	printstat "Scilo: #{convertAlignmentNumberToWord(@sciloAlignment)}"
	printstat "Ajurite: #{convertAlignmentNumberToWord(@ajuriteAlignment)}"
	printstat "Weapon:"
	printstat "#{@weapon}"

	#Refresh the inventory:
	($ ".inventory").html("")
	($ ".inventory").append "Inventory"
	($ ".inventory").append "<br>"
	($ ".inventory").append "-------------"
	($ ".inventory").append "<br>"

	index = 0
	for item in @inventory
		($ ".inventory").append "<br>"
		($ ".inventory").append """<button onclick="useInventoryItemN(#{index})">
			#{index}
			#{item.toString()}
			</button>"""
		index++

	#Do it all again 10 milliseconds later:
	setTimeout(refresh, 1000)
