# --- Monsters ---
#Misc. Monsters
@goblin = ->
	new Monster "Goblin", smallHP.roll(), smallDamage, smallDrop.roll(), 10
@dwarfBeserker = ->
	new Monster "Dwarf Beserker", smallHP.roll(), mediumDamage, mediumDrop.roll(), 30



#Ajurite Creatures
@horseMan = ->
	new Monster "Horse Man", smallHP.roll(), mediumDamage, mediumDrop.roll(), 30
@paladin = ->
	new Monster "Ajurite Paladin", largeHP.roll(), largeDamage, largeDrop.roll(), 100

#Zealon Creatures
@zombie = ->
	new Monster "Zombie", mediumHP.roll(), mediumDamage, mediumDrop.roll(), 40
@largeZombie = ->
	new Monster "Terrible Zombie", largeHP.roll(), mediumDamage, mediumDrop.roll(), 40
@corruptedOrc = ->
	new Monster "Corrupted Orc", mediumHP.roll(), mediumDamage, mediumDrop.roll(), 30
@spider = ->
	new Monster "Spider", smallHP.roll(), mediumDamage, mediumDrop.roll(), 25
#scilo creatures
@animatedCactus = -> 
	new Monster "Animated Cactus", mediumHP.roll(), smallDamage, smallDrop.roll(), 20
@riverMonster = ->
	new Monster "River Monster", largeHP.roll(), mediumDamage, largeDrop.roll(), 50