class @Item
	constructor:() ->

	use: () ->

class @Die
	constructor: (@numberOfDice, @numberOfSides, @constant) ->

	roll: ->
		sum = @constant
		for i in [1..@numberOfDice]
			sum += Math.random() * @numberOfSides

		return Math.floor(Math.max(sum, 0))

	toString: ->
		@numberOfDice + "d" + @numberOfSides + "+" + @constant

###
Weapon class
###
class @Weapon extends Item #this means that a weapon IS an item
	constructor: (@die, @name, @price) ->

	roll: ->
		@die.roll()

	toString: ->
		@name.toString() + ": " + @die.toString() + " (" + @price.toString() + "gp)"

###
Monster class
All monsters should be instances of this class.
Make a monster with "new Monster(<parameters in here>)"
###
class @Monster
	constructor: (name, @hp, @weapon, @gp, @xp) ->
		@name = randomAdjective() + " " + name

	roll: ->
		@weapon.roll()

	hit: (damage) ->
		@hp -= damage

	isDead: ->
		@hp <= 0

	toString: ->
		@name

###
Potions
###
class @Potion extends Item
	constructor: () -> 

class @HealthPotion extends Potion
	constructor: () ->

	###
	Drinks the potion
	###
	use: ->
		hp += 10
		index = inventory.indexOf @
		inventory.splice index, 1

	toString: ->
		return "Health Potion"

class @EvasionPotion extends Potion
	constructor: () ->

	###
	Drinks the potion
	Temporarially boosts the player's Evasion
	###
	use: ->
		#TODO implement this

	toString: ->
		return "Evasion Potion"

class @BlockPotion extends Potion
	constructor: () ->

	###
	Drinks the potion
	Temporarially boosts the player's block
	###
	use: ->
		#TODO implement this

	toString: ->
		return "Block Potion"

###
Scrolls
###
class Scroll extends Item
	constructor: () ->

class DamageCurseScroll extends Scroll
	constructor: () ->

	use: ->
		enemies[0].damage = 0

	toString: ->
		return "Damage-curse scroll"

class PoisonScroll extends Scroll
	constructor: () ->

	use: ->
		