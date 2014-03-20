(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.Item = (function() {
    function Item() {}

    Item.prototype.use = function() {};

    return Item;

  })();

  this.Die = (function() {
    function Die(numberOfDice, numberOfSides, constant) {
      this.numberOfDice = numberOfDice;
      this.numberOfSides = numberOfSides;
      this.constant = constant;
    }

    Die.prototype.roll = function() {
      var i, sum, _i, _ref;
      sum = this.constant;
      for (i = _i = 1, _ref = this.numberOfDice; 1 <= _ref ? _i <= _ref : _i >= _ref; i = 1 <= _ref ? ++_i : --_i) {
        sum += Math.random() * this.numberOfSides;
      }
      return Math.floor(Math.max(sum, 0));
    };

    Die.prototype.toString = function() {
      return this.numberOfDice + "d" + this.numberOfSides + "+" + this.constant;
    };

    return Die;

  })();

  /*
  Weapon class
  */


  this.Weapon = (function(_super) {
    __extends(Weapon, _super);

    function Weapon(die, name, price) {
      this.die = die;
      this.name = name;
      this.price = price;
    }

    Weapon.prototype.roll = function() {
      return this.die.roll();
    };

    Weapon.prototype.toString = function() {
      return this.name.toString() + ": " + this.die.toString() + " (" + this.price.toString() + "gp)";
    };

    return Weapon;

  })(Item);

  /*
  Monster class
  All monsters should be instances of this class.
  Make a monster with "new Monster(<parameters in here>)"
  */


  this.Monster = (function() {
    function Monster(name, hp, weapon, gp, xp) {
      this.hp = hp;
      this.weapon = weapon;
      this.gp = gp;
      this.xp = xp;
      this.name = randomAdjective() + " " + name;
    }

    Monster.prototype.roll = function() {
      return this.weapon.roll();
    };

    Monster.prototype.hit = function(damage) {
      return this.hp -= damage;
    };

    Monster.prototype.isDead = function() {
      return this.hp <= 0;
    };

    Monster.prototype.toString = function() {
      return this.name;
    };

    return Monster;

  })();

  /*
  Potions
  */


  this.Potion = (function(_super) {
    __extends(Potion, _super);

    function Potion() {}

    return Potion;

  })(Item);

  this.HealthPotion = (function(_super) {
    __extends(HealthPotion, _super);

    function HealthPotion() {}

    /*
    	Drinks the potion
    */


    HealthPotion.prototype.use = function() {
      var index;
      hp += 10;
      index = inventory.indexOf(this);
      return inventory.splice(index, 1);
    };

    HealthPotion.prototype.toString = function() {
      return "Health Potion";
    };

    return HealthPotion;

  })(Potion);

  this.EvasionPotion = (function(_super) {
    __extends(EvasionPotion, _super);

    function EvasionPotion() {}

    /*
    	Drinks the potion
    	Temporarially boosts the player's Evasion
    */


    EvasionPotion.prototype.use = function() {};

    EvasionPotion.prototype.toString = function() {
      return "Evasion Potion";
    };

    return EvasionPotion;

  })(Potion);

  this.BlockPotion = (function(_super) {
    __extends(BlockPotion, _super);

    function BlockPotion() {}

    /*
    	Drinks the potion
    	Temporarially boosts the player's block
    */


    BlockPotion.prototype.use = function() {};

    BlockPotion.prototype.toString = function() {
      return "Block Potion";
    };

    return BlockPotion;

  })(Potion);

}).call(this);

/*
this file is full of Named Weapons
*/


/*
Blacksmith
*/


(function() {
  this.smallDagger = new Weapon(new Die(3, 6, +3), "Dagger of awesome", 200);

  this.daggerofshadow = new Weapon(new Die(3, 7, +2), "Dagger of Shadow", 500);

  this.daggerofdeath = new Weapon(new Die(3, 8, +3), "Dagger of Death", 600);

  this.swordofthefeather = new Weapon(new Die(3, 8, -3), "Sword of the feather", 300);

  this.supersword = new Weapon(new Die(6, 6, -6), "Super Sword", 600);

  this.swordofthesun = new Weapon(new Die(5, 9, -5), "Sword of the Sun", 750);

  /*
  Fletcher
  */


  this.longbowoffire = new Weapon(new Die(5, 4, -5), "Long Bow of Fire", 400);

  this.powerfulllongbow = new Weapon(new Die(6, 4, 0), "powerfull longbow", 400);

}).call(this);

(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  this.print = function(text) {
    return ($(".game")).append(text);
  };

  this.println = function(text) {
    print(text);
    return print("<br>");
  };

  this.setState = function(newState) {
    this.state = newState;
    return run();
  };

  this.loadState = function() {
    return returnToState;
  };

  this.button = function(newState, text) {
    return println("<button onclick=\"setState('" + newState + "')\">\n" + text + "\n</button>");
  };

  this.dropDown = function(options) {
    var option, result, _i, _len;
    result = "<select>";
    for (_i = 0, _len = options.length; _i < _len; _i++) {
      option = options[_i];
      result += "<option>";
      result += option;
      result += "</option>";
    }
    result += "</select>";
    return result;
  };

  this.prob = function(probability) {
    return Math.random() <= probability;
  };

  this.inBounds = function(x, y) {
    return x >= 0 && y >= 0 && x < 4 && y < 4;
  };

  this.randomAdjective = function() {
    return ["Mean", "Nasty", "Terrible"][Math.floor(Math.random() * 3)];
  };

  this.showMap = function() {
    if (inBounds(this.locY + 1, this.locX) && this.map[this.locY + 1][this.locX]) {
      button(this.map[this.locY + 1][this.locX], "Head south to the " + this.map[this.locY + 1][this.locX]);
    }
    if (inBounds(this.locY - 1, this.locX) && this.map[this.locY - 1][this.locX]) {
      button(this.map[this.locY - 1][this.locX], "Head north to the " + this.map[this.locY - 1][this.locX]);
    }
    if (inBounds(this.locY, this.locX + 1) && this.map[this.locY][this.locX + 1]) {
      button(this.map[this.locY][this.locX + 1], "Head east to the " + this.map[this.locY][this.locX + 1]);
    }
    if (inBounds(this.locY, this.locX - 1) && this.map[this.locY][this.locX - 1]) {
      return button(this.map[this.locY][this.locX - 1], "head west to the " + this.map[this.locY][this.locX - 1]);
    }
  };

  this.visited = function(state) {
    return __indexOf.call(this.statesEntered, state) >= 0;
  };

  this.printstat = function(string) {
    ($(".stats")).append("<br>");
    return ($(".stats")).append(string);
  };

  this.useInventoryItemN = function(n) {
    this.inventory[n].use();
    return console.log("TEST");
  };

  this.refresh = function() {
    var enemy, index, item, _i, _j, _len, _len1, _ref, _ref1;
    ($(".stats")).html("");
    _ref = this.enemies;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      enemy = _ref[_i];
      printstat("");
      printstat("Enemy stats:");
      printstat("HP: " + enemy.hp);
    }
    printstat("");
    printstat("Your stats:");
    printstat("HP: " + this.hp);
    printstat("MP: " + this.mp);
    printstat("GP: " + this.gp);
    printstat("XP: " + this.xp);
    printstat("");
    printstat("Weapon:");
    printstat("" + this.weapon);
    ($(".inventory")).html("");
    ($(".inventory")).append("Inventory");
    ($(".inventory")).append("<br>");
    ($(".inventory")).append("-------------");
    ($(".inventory")).append("<br>");
    index = 0;
    _ref1 = this.inventory;
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      item = _ref1[_j];
      ($(".inventory")).append("<br>");
      ($(".inventory")).append("<button onclick=\"useInventoryItemN(" + index + ")\">\n" + index + "\n" + (item.toString()) + "\n</button>");
      index++;
    }
    return setTimeout(refresh, 1000);
  };

}).call(this);

(function() {
  this.goblin = function() {
    return new Monster("Goblin", smallHP.roll(), smallDamage, smallDrop.roll(), 10);
  };

  this.dwarfBeserker = function() {
    return new Monster("Dwarf Beserker", smallHP.roll(), mediumDamage, mediumDrop.roll(), 30);
  };

  this.animatedCactus = function() {
    return new Monster("Animated Cactus", mediumHP.roll(), smallDamage, smallDrop.roll(), 20);
  };

  this.riverMonster = function() {
    return new Monster("River Monster", largeHP.roll(), mediumDamage, largeDrop.roll(), 50);
  };

  this.horseMan = function() {
    return new Monster("Horse Man", smallHP.roll(), mediumDamage, mediumDrop.roll(), 30);
  };

  this.paladin = function() {
    return new Monster("Ajurite Paladin", largeHP.roll(), largeDamage, largeDrop.roll(), 100);
  };

  this.zombie = function() {
    return new Monster("Zombie", mediumHP.roll(), mediumDamage, mediumDrop.roll(), 40);
  };

  this.largeZombie = function() {
    return new Monster("Terrible Zombie", largeHP.roll(), mediumDamage, mediumDrop.roll(), 40);
  };

  this.corruptedOrc = function() {
    return new Monster("Corrupted Orc", mediumHP.roll(), mediumDamage, mediumDrop.roll(), 30);
  };

  this.spider = function() {
    return new Monster("Spider", smallHP.roll(), mediumDamage, mediumDrop.roll(), 25);
  };

}).call(this);

(function() {
  this.townStatesRun = function() {
    var cost, upgradeBlockXPCost, upgradeEvadeXPCost;
    upgradeEvadeXPCost = this.evade * 1000 + 100;
    upgradeBlockXPCost = this.block * 100 + 10;
    if (this.state === "inTown") {
      println("You are in the town of Zemboria");
      println("What do you want to do?");
      button("town of Zemboria", "Leave town");
      button("shops", "Look at the shops");
      button("people", "Talk to people");
      return button("Trainer", "Go to the Trainer");
    } else if (this.state === "Trainer") {
      println("Trainer: I can upgrade your block or evade.");
      button("upgrade block", "Upgrade Block to " + (block + 1) + " (" + upgradeBlockXPCost + " xp)");
      return button("upgrade evade", "Upgrade Evade to " + (this.evade + .1) + " (" + upgradeEvadeXPCost + " xp)");
    } else if (this.state === "upgrade evade") {
      if (this.xp >= upgradeEvadeXPCost) {
        this.xp -= upgradeEvadeXPCost;
        this.evade += 0.1;
        println("You train and train and you finally get stronger");
      } else {
        println("I aint gonna train you if you arent going to pay me my price.");
      }
      return setState("Trainer");
    } else if (this.state === "upgrade block") {
      if (this.xp >= this.block * 100) {
        this.xp -= this.block * 100;
        this.block += 1;
        println("You train and train and you finally get more agile");
      } else {
        println("I aint gonna train you if you arent going to pay me my price.");
      }
      return setState("Trainer");
    } else if (this.state === "shops") {
      println("The shops are small but friendly");
      button("blacksmith", "Visit John the Blacksmith");
      button("fletcher", "Visit Ken the Fletcher");
      button("mage", "Visit Almerond the Mage");
      return button("inTown", "Done shopping");
    } else if (this.state === "town of Zemboria") {
      println("Which way do you want to go?");
      button("inTown", "Enter the town");
      return showMap();
    } else if (this.state === "blacksmith") {
      println("John: Hello there, what can i do for you?");
      button("daggers", "I'd like to look at your daggers.");
      button("swords", "I'd like to take a look at your swords.");
      return button("shops", "Leave the Blacksmith");
    } else if (this.state === "daggers") {
      println("Here's what I've got");
      this.returnToState = this.state;
      button(smallDagger, smallDagger);
      button(daggerofshadow, daggerofshadow);
      button(daggerofdeath, daggerofdeath);
      button("aboutDaggers", "Can you tell me more about daggers?");
      return button("blacksmith", "I guess I'm not interested in daggers");
    } else if (this.state === "aboutDaggers") {
      println("Daggers are small and fast. Some daggers will let you strike twice per turn, some daggers are poisoned.");
      return button("daggers", "Thanks.");
    } else if (this.state === "swords") {
      println("These are the swords I've got.");
      this.returnToState = this.state;
      button(swordofthefeather, swordofthefeather);
      button(supersword, supersword);
      button(swordofthesun, swordofthesun);
      button("aboutSwords", "Can you tell me more about swords?");
      return button("blacksmith", "I'm not really interested in swords");
    } else if (this.state === "aboutSwords") {
      println("Swords are powerful and balanced. They tend to do more damage than daggers, but are more expensive.");
      return button("swords", "Thanks.");
    } else if (this.state === "fletcher") {
      println("Ken: Hello there me matey. What can I do for you on this fine day?");
      button("crossbows", "Might i have a look at your crossbows.");
      button("longBows", "i'll take a look at your long bows.");
      return button("shops", "Leave the Fletcher");
    } else if (this.state === "crossbows") {
      return println("Here's what I've got in the way of crossbows.");
    } else if (this.state === "mage") {
      println("You see a musty old shop with magical stuff everywhere. All over the shelves of the shop you see Hydra heads, slamander tails, frog tongue and other such magical things.");
      println("You hear a booming voice: What do you want youngster? I was just taking a magicians nap!");
      if (!visited("mage")) {
        println("You may call me Almerond.");
      }
      button("potions", "May I look at your potion selection?");
      button("staffs", "What staffs do you have?");
      button("scrolls", "What in the way of scrolls do you have?");
      button("heal", "Heal 10 hp (100 gp)");
      button("enchant", "Enchant Weapon (500 gp)");
      return button("shops", "I'm sorry for intruding, Almerond. Thank you.");
    } else if (this.state === "enchant") {
      cost = 500;
      if (this.gp >= cost) {
        this.weapon.die.numberOfDice += 1;
        this.gp -= cost;
        println("Your weapon has been enchanted.");
      } else {
        println("What you trying to do, scamp.");
      }
      return setState("mage");
    } else if (this.state === "heal") {
      cost = 100;
      if (this.gp >= cost) {
        println("You pay " + cost + " gp");
        this.hp += 10;
        return this.gp -= cost;
      } else {
        println("you trying to cheat me boy.");
        return setState("mage");
      }
    } else if (this.state === "potions") {
      println("Potions will give you momentary advantages over enemies but they only last for a single battle.");
      return button("Health Potion buying", "Buy Health potion (30 gp)");
    } else if (this.state === "staffs") {
      println("Staffs are what make the mage, if you watched lord of the rings you would know that.");
      return setState("mage");
    } else if (this.state === "scrolls") {
      println("Scrolls are powerfull spells that can decimate your enemy.");
      return setState("mage");
    } else if (this.state === "Health Potion buying") {
      if (gp >= 30) {
        gp -= 30;
        inventory.push(new HealthPotion());
      } else {
        println("You trying to cheat me scamp!!!");
      }
      return setState("mage");
    } else if (this.state === "people") {
      if (prob(.25)) {
        return setState("Dungeon guy");
      } else if (prob(.50)) {
        return setState("mayor");
      } else {
        println("No one is out and about.");
        return setState("inTown");
      }
    } else if (this.state === "Dungeon guy") {
      if (visited("Dungeon guy win")) {
        return println("Thank you so much i cant ever thank you enough");
      } else {
        if ((visited("Dungeon guy")) && (visited("Zealon Dungeon"))) {
          return setState("Dungeon guy win");
        } else {
          println("Howdy, stranger. My name is Alastor. Let me tell you my story.");
          println("My family's heirloom, a great horn that my great great great grandfather used in the great guild wars, one day dissapeared. I raised a hue and cry and paid the best trackers around to find the people that stole it. They eventually tracked them down to the Zealon Dungeon. I tried to hire people to kill them and get my horn back but everyone was to scared to venture into the Zealon Dungeon. So I wish for you to go in there, kill them and get me my horn back. I'll reward you 1000 gold for retrieving the horn.");
          return button("inTown", "I'll see what I can do.");
        }
      }
    } else if (this.state === "Dungeon guy win") {
      this.gp += 1000;
      println("thank you so much i cant ever thank you enough!!! Heres 1000 gp for getting my heirloom.");
      return button("inTown", "My pleasure.");
    } else if (this.state === "mayor") {
      if (visited("mayor win")) {
        return println("Thanks");
      } else {
        return println("Ever since the great guild wars that ravaged this land long ago,				 The land has been infested with every sort of nasty mosnter.			 The goblins are the worst though,			 They raid the villages of alavar. 			 They are a menace to everyone.			 So i wish for you to go and raid them.			 I will pay you 500 gold (kill 5 goblins).");
      }
    } else if (this.state === smallDagger.toString()) {
      if (this.gp >= smallDagger.price) {
        this.gp -= smallDagger.price;
        this.weapon = smallDagger;
        println("Congratulations on buying the Dagger of awesome. You look at it and see that its awesome");
      } else {
        println("Take your hands off that dagger. You aint got the money to pay for that beauty.");
      }
      return setState(loadState());
    } else if (this.state === swordofthefeather.toString()) {
      if (this.gp >= swordofthefeather.price) {
        this.gp -= swordofthefeather.price;
        this.weapon = swordofthefeather;
        println("You pick up the sword and it is incredibly light. It feels wonderful in your hands.");
      } else {
        println("Get out of here cheapskate.");
      }
      return setState(loadState());
    } else if (this.state === supersword.toString()) {
      if (this.gp >= supersword.price) {
        this.gp -= supersword.price;
        this.weapon = supersword;
        println("You pick up the sword and suddenly you feel like super man. You feel like you can do anything.");
      } else {
        println("Get out of here cheapskate.");
      }
      return setState(loadState());
    } else if (this.state === swordofthesun.toString()) {
      if (this.gp >= swordofthesun.price) {
        this.gp -= swordofthesun.price;
        this.weapon = swordofthesun;
        println("You pick up the sword and it glows with an angelic light.");
      } else {
        println("Dont come back here Hobo.");
      }
      return setState(loadState());
    } else if (this.state === daggerofshadow.toString()) {
      if (this.gp >= daggerofshadow.price) {
        this.gp -= daggerofshadow.price;
        this.weapon = daggerofshadow;
        println("you can barely see the dagger its so cloaked by Shadow. it is cold to the touch.");
      } else {
        println("Set your hands of that dagger.");
      }
      return setState(loadState());
    } else if (this.state === daggerofdeath.toString()) {
      if (this.gp >= daggerofdeath.price) {
        this.gp -= daggerofdeath.price;
        this.weapon = daggerofdeath;
        println("This dagger has the stench of Death. it had perpetual blood on its edge. No matter how much you wipe it never comes of.");
      } else {
        println("Stop touching that beauty, poor guy. You can't afford it.");
      }
      return setState(loadState());
    } else if (this.state === powerfulllongbow.toString()) {
      if (this.gp >= powerfulllongbow.price) {
        this.gp -= powerfulllongbow.price;
        this.weapon = powerfulllongbow;
        println("You heft the beautiful long bow and then throw it over your shoulder.");
      } else {
        println("You aint got the money te pay for that beauty, so go away.");
      }
      return setState(loadState());
    } else if (this.state === longbowoffire) {
      if (this.gp >= longbowoffire.price) {
        this.gp -= longbowoffire.price;
        this.weapon = longbowoffire;
        println("There are beautiful carvings of fire and in the darkness those engravings flicker like fire. (he says reverantly)");
      } else {
        println("Get your hands of that ye scurvy scallywag, that one of my best bows. Unless yev actually got te gold for it.");
      }
      return setState(loadState());
    }
  };

}).call(this);

(function() {
  this.mapStatesRun = function() {
    var damage;
    if (this.state === "forest") {
      println("The forest is dark and spooky");
      if (!visited(this.state)) {
        println("You find a frog who blesses you (+5 hp)");
        this.hp += 5;
      } else {
        if (prob(.5)) {
          "You see a spider scuttling away from you.";
        }
      }
      button("upTree", "Climb a tree");
      return showMap();
    } else if (this.state === "upTree") {
      if (!visited("upTree")) {
        println("You see an old monkey at the top of the tree");
        println("Murundy: Welcome to the land of the Monkeys, young one.");
        println("Murundy: My name is Murundy, and I am a sage among the Monkeys here.");
      } else {
        println("You and Murundy are in the top of the tree, in the middle of the Monkey's forest.");
      }
      button("askAboutForests", "What can you tell me about these forests?");
      return button("forest", "Climb down the tree");
    } else if (this.state === "askAboutForests") {
      println("Murundy: The forests have been the land of the Monkeys for over a century.  But this last year the Spiders have moved in, driven by some unnatural force.");
      button("showSpiderForest", "Would you take me to where the spiders are?");
      return button("forest", "Climb down the tree");
    } else if (this.state === "showSpiderForest") {
      println("Murundy: Certainly. But be prepared for what you are about to see.");
      println("Murundy: I'll take you on a path through the branches. Follow me");
      button("spiderForestUpTree", "Follow Murundy");
      return button("forest", "Climb down the tree");
    } else if (this.state === "spiderForestUpTree") {
      println("You find yourself in a darker part of the forest, and vast sticky cobwebs are strung hanging between the trees.");
      println("Murundy: See the egg-sacks between the root of the trees? These spiders are reproducing out of control. We don't know why.");
      button("upTree", "I've seen enough. Please take me back.");
      return button("Spider Forest", "Climb down the tree");
    } else if (this.state === "Spider Forest") {
      println("The trees are tangled with cobwebs and the roots have egg-sacks strung between their roots.");
      if (prob(.5)) {
        println("A spider clambers down from the trees and lunges at you.");
        this.enemies = [spider()];
        button("fightYourTurn", "Engage him");
        return this.returnToState = this.state;
      } else {
        println("you get tangled in a cobweb (-2 hp)");
        this.hp -= 2;
        button("eggSacks", "Investigate egg-sacks");
        return showMap();
      }
    } else if (this.state === "eggSacks") {
      println("You see larvae swarming inside of translucent pouches.");
      button("breakEggSacks", "Break egg-sack");
      return button("Spider Forest", "Done inestigating egg-sacks");
    } else if (this.state === "breakEggSacks") {
      println("A baby spider crawls on to your hand and tries to bite you with its mandibles.");
      this.enemies = [babySpider()];
      this.returnToState = this.state;
      return button("fightYourTurn", "Fight the Baby Spider");
    } else if (this.state === "swamp") {
      println("The swamps glurp and gurgle at you");
      if (prob(.5)) {
        println("A goblin rises out of the black deep");
        this.enemies = [goblin()];
        button("fightYourTurn", "Engage him");
        return this.returnToState = this.state;
      } else {
        println("Your boots get mucky");
        return showMap();
      }
    } else if (this.state === "deeper swamp") {
      println("The swamp is almost unbearebly thick. It smells like mold and like orc.");
      if (prob(.5)) {
        println("A corrupted orc rises from the muck");
        this.enemies = [corruptedOrc()];
        button("fightYourTurn", "Engage him");
        return this.returnToState = this.state;
      } else {
        println("The swamp mud mucks up your boots.");
        return showMap();
      }
    } else if (this.state === "marshes") {
      println("The marshes are marshy");
      return showMap();
    } else if (this.state === "desert") {
      println("The desert is hot and dry. It continues for great lengths to the south, but yields to foothills to the north. There are serious-looking cacti.");
      if (prob(.25)) {
        println("You accidentally got a spine in you. (-3 hp)");
        this.hp -= 3;
      }
      return showMap();
    } else if (this.state === "wasteland") {
      println("The wasteland is the result of a Scilos experiment gone wrong. It's a parched and lifeless desert as far as the eye can see. You are miserably thirsty.");
      if (prob(.5)) {
        println("A cactus starts to move towards you.");
        this.enemies = [animatedCactus()];
        button("fightYourTurn", "Engage the Animated Cactus");
        return this.returnToState = this.state;
      } else {
        return showMap();
      }
    } else if (this.state === "Beara Mountains") {
      println("The air is thin and hard to breathe, and you see crevasses stretching far below you.");
      if (prob(.5)) {
        println("Suddenly, a dwarf beserker charges at you from a cliff above.");
        this.enemies = [dwarfBeserker()];
        button("fightYourTurn", "Engage the Beserker");
        return this.returnToState = this.state;
      } else {
        return showMap();
      }
    } else if (this.state === "foothills") {
      println("The ground is rough and treacherous, and the going is hard but you eventually make it to a good campground.");
      if (prob(.5)) {
        println("While you are sleeping a savage horseman attacks you!");
        this.enemies = [horseMan()];
        button("fightYourTurn", "Engage the Horseman");
        return this.returnToState = this.state;
      } else {
        return showMap();
      }
    } else if (this.state === "Lake Mysterious") {
      println("The lake goes out as far as the eye can see its absolutely enormous.");
      println("there is a slight disturbance in the water... you wonder what it is...");
      if (prob(.5)) {
        println("suddenly an enourmous octopus arises from the water.");
        this.enemies = [riverMonster()];
        button("fightYourTurn", "Engage the Octopus");
        return this.returnToState = this.state;
      } else {
        return showMap();
      }
    } else if (this.state === "Zealon Dungeon") {
      println("You see cut into the side of a hill the Zealon emblem, a skull inside of a circle made of snakes. Entranced, you walk closer and see that the gaping mouth of the skull leads to a room underground. It's darkeness is impenetrable.");
      button("enteranceRoom", "Enter the Zealon Dungeon");
      return showMap();
    } else if (this.state === "enteranceRoom") {
      println("You find yourself in a small room with walls that are coated in dried blood. The walls seem to press in on you. Your compass goes haywire. Your internal instincts are screaming at you to turn back.");
      button("entrance corridor", "Go further in to the Dungeon");
      return button("Zealon Dungeon", "Exit Dungeon");
    } else if (this.state === "entrance corridor") {
      println("You walk in to a long narrow corridor. It has strange symbols and markings on the ground. It seems to be a kind of warning");
      if (!visited(this.state)) {
        if (prob(.5)) {
          println("A zombie raises itself out of the dirt.");
          this.enemies = [zombie()];
          button("fightYourTurn", "Engage the Zombie");
          return this.returnToState = this.state;
        } else {
          println("A spike-trap beneath your feet shoots up and stabs you. You lose 10 hp.");
          this.hp -= 10;
          button("junctionRoom", "Head deeper into the darkness");
          return button("enteranceRoom", "Head back towards the light");
        }
      } else {
        button("junctionRoom", "Head deeper into the darkness");
        return button("enteranceRoom", "Head back towards the light");
      }
    } else if (this.state === "junctionRoom") {
      println("You are in a large room with three corridors leading out of it.");
      damage = Math.ceil(Math.random() * 3);
      println("An ill odor fills the room and your lungs. You lose " + damage + " hp.");
      this.hp -= damage;
      if (!visited(this.state)) {
        println("A giant Zombie raises itself out of the filthy ground. It reaches its long fingers towards you.");
        this.enemies = [largeZombie()];
        button("fightYourTurn", "Engage the Zombie");
        return this.returnToState = this.state;
      } else {
        button("leftCorridor", "Enter the corridor on the left");
        button("rightCorridor", "Enter the corridor on the right");
        return button("entrance corridor", "Go back towards the enterance");
      }
    } else if (this.state === "leftCorridor") {
      println("Deeper into the dungeon, you see an open room. A huge, engraved chest sits at the back of the room.");
      button("junctionRoom", "Go towards the enterance");
      return button("leftRoom", "Go deeper");
    } else if (this.state === "leftRoom") {
      if (!visited(this.state)) {
        println("As you enter the room, the door slams behind you and a towering orc smiles a sister grin at you.");
        button("leftRoom fight", "Attack him");
        return button("leftRoom talk", "Go up to him");
      }
    } else if (this.state === "leftRoom fight") {
      println("You meet the battle with gusto.");
      this.enemies = [corruptedOrc()];
      setState("fightYourTurn");
      return this.returnToState = "leftRoom";
    } else if (this.state === "leftRoom talk") {
      println("You walk up to the orc");
      return button("hello", "Hello");
    } else if (this.state === "hello") {
      println("Hello my name is Chenk.");
      return button("whatGoingOn", "What's going on with this dungeon?");
    } else if (this.state === "whatGoingOn") {
      println("Chenk: This is a dungeon created by the Zealon for their sinis†er rites.");
      return button("whyareyouhere", "Why are you here? And why havent you attacked me?");
    } else if (this.state === "whyareyouhere") {
      println("I am here because the Zealon experimented their corruption magic on me but it backfired. Orcs arent all bad you know its just that the Zealon corrupted many of my kind. I cant leave the dungeon because of some strange magic.");
      return button("more", "Wow the Zealon are really bad!");
    } else if (this.state === "more") {
      println("Chenk: The Zealon are bad but its debatable if they are the worst. The Ajurites are also pretty bad. They are good but over-zealous. They will kill hundreds of people just because one person did something bad. Then there are the Scilos. They are a group of mad scientists who are ruthless in the name of science. They do all kinds of experiments on people and animals.");
      return button("leftRoom", "Wow. Thank you.");
    } else if (this.state === "rightRoom") {
      println("");
      return button("junctionRoom", "Go towards the enterance");
    } else if (this.state === "Plain of Ashard") {
      println("A paladin in blazing white armor rides up and greets you as you enter onto the plain. You see the Ajurite symbol of a rising sun on his chestplate.");
      if (visited("attackThePaladin")) {
        println("Ajurite Paladin: You are not welcome here. Leave at once.");
      } else {
        println("Ajurite Paladin: The plain of Ashard is the land of the holy Ajurites. All travellers, including yourself, are granted free-passage through this land, providing you strictly adhere to Ajurite law.");
        println("Ajurite Paladin: If you have come to the Plain of Ashard to prove your mettle, I'll escourt you to the arena.");
        button("arena", "Please take me to the arena.");
      }
      button("attackTheKnight", "Attack the Ajurite Paladin");
      return showMap();
    } else if (this.state === "attackTheKnight") {
      println("Ajurite Paladin: You raise your weapon against me? The Ajurites will not forgive you till your bones are ashes and those ashes are whiped from the face of the earth. Not a trace of you will remain after I am through with you. (he spits)");
      this.enemies = [paladin()];
      this.returnToState = "Plain of Ashard";
      return setState("fightYourTurn");
    } else if (this.state === "arena") {
      println("The arena is a palacial, white circular stadium which you hear and smell long before your enter. The stench of human bodies pressed close together and the constant roar of the croud.");
      println("Your in the lobby of the arena.");
      if (!visited("arenaFight")) {
        println("Ajurite Lord: (loudly) Let the next fight begin.");
      } else {
        println("Ajurite Lord: Ah. Welcome back. Will you do battle again?");
      }
      button("Plain of Ashard", "Leave the Arena");
      return button("arenaFight", "Challenge an opponent");
    } else if (this.state === "arenaFight") {
      println("Ajurite Lord: So you'd like to try your strength in the pit? Whom would you like to challenge?");
      button("arenaCorruptedOrc", "Fight a Corrupted Orc");
      return button("arenaZombie", "Fight a Zombie");
    } else if (this.state === "arenaCorruptedOrc") {
      println("You walk out in the center of the dirt field and the croud goes silent. A grate is raised on the opposite side of the field, and a hulking orc emerges.");
      this.enemies = [corruptedOrc()];
      this.returnToState = "arena";
      return setState("fightYourTurn");
    } else if (this.state === "arenaZombie") {
      println("You walk out in the center of the dirt field and the croud goes silent. A grate is raised on the opposite side of the field, and a sickening zombie emerges.");
      this.enemies = [zombie()];
      this.returnToState = "arena";
      return setState("fightYourTurn");
    }
  };

}).call(this);

(function() {
  var $, hugeDamage, hugeDrop, hugeHP, hundredSidedDie, largeDamage, largeDrop, largeHP, mediumDamage, mediumDrop, mediumHP, sixSidedDie, smallDamage, smallDrop, smallHP, tenSidedDie, twentySidedDie;

  $ = jQuery;

  this.run = function() {
    var damage, enemy, x, y, _i, _j, _k, _len, _ref;
    if (this.turn !== 0) {
      println("---");
    }
    console.log(this.state);
    for (x = _i = 0; _i <= 3; x = ++_i) {
      for (y = _j = 0; _j <= 3; y = ++_j) {
        if (this.map[y][x] === this.state) {
          this.locX = x;
          this.locY = y;
        }
      }
    }
    if (this.state === "start") {
      setState("story");
    } else if (this.state === "story") {
      println("You were born in the town of Zemboria. Your father was an important " + (dropDown(["Nobleman", "Blacksmith", "Merchant"])) + ". One day, when you came home, you found both of your parents brutally killed. You ask the neighbors and they tell you that they were slain by a " + (dropDown(["Holy Justicar", "Spider-dog", "Rampaging Orc"])) + ". You set off on your " + (dropDown(["easy", "medium", "hard"])) + " quest to avenge their death.");
      println("");
      button("inTown", "I'm ready to begin");
    } else if (this.state === "dead") {
      println("You have died : (");
      println("You find yourself back in the town");
      this.xp -= 15;
      if (this.xp < 0) {
        this.xp = 0;
      }
      this.gp -= 200;
      if (this.gp < 0) {
        this.gp = 0;
      }
      this.hp = 60;
      println("Almerond: Stop making me revive you, young whippersnapper. I've charged you 200 gold peices for my trouble, thank you very much.");
      setState("mage");
    }
    townStatesRun();
    mapStatesRun();
    if (this.state === "fightYourTurn") {
      _ref = this.enemies;
      for (_k = 0, _len = _ref.length; _k < _len; _k++) {
        enemy = _ref[_k];
        button("dealDamageToEnemy", "Attack " + enemy);
      }
      button("runAway", "Run Away");
    } else if (this.state === "dealDamageToEnemy") {
      damage = this.weapon.roll();
      if (damage === 0) {
        println("You missed!");
      } else {
        println("You hit him for " + damage + " damage");
      }
      this.enemies[0].hp -= damage;
      setState("fightEnemyTurn");
    } else if (this.state === "fightEnemyTurn") {
      if (this.enemies[0].isDead()) {
        setState("winBattle");
      } else {
        button("evade", "Evade (" + (this.evade * 100) + "% change of evading all damage)");
        button("block", "Block (enemy does " + this.block + " less damage to you)");
      }
    } else if (this.state === "runAway") {
      damage = this.enemies[0].weapon.roll();
      if (damage === 0) {
        println("You sucessfully run away and take no damage");
      } else {
        println("You take " + damage + " damage as you are running away");
      }
      this.hp -= damage;
      setState(loadState());
    } else if (this.state === "evade") {
      if (prob(this.evade)) {
        if (prob(.1)) {
          println("With ninja skills of ninjaness, you dodged the attack.");
        } else {
          println("You've evaded the attack!");
        }
      } else {
        damage = this.enemies[0].roll();
        println("You failed to evade and took " + damage + " damage");
      }
      setState("fightYourTurn");
    } else if (this.state === "block") {
      damage = this.enemies[0].roll();
      damage -= this.block;
      if (damage <= 0) {
        println("You completely blocked the attack, and recieve 0 damage.");
      } else {
        println("You took " + damage + " damage");
        this.hp -= damage;
      }
      setState("fightYourTurn");
    } else if (this.state === "winBattle") {
      if (this.enemies[0].gp > 0) {
        println("You looted " + this.enemies[0].gp + " gold off the body");
        this.gp += this.enemies[0].gp;
      } else {
        println("You found nothing on the body");
      }
      if (this.enemies[0].xp !== 0) {
        println("You gained " + this.enemies[0].xp + " xp from the battle");
        this.xp += this.enemies[0].xp;
      }
      this.enemies = [];
      setState(loadState());
    } else if (this.hp <= 0) {
      setState("dead");
    }
    this.statesEntered.push(this.state);
    return this.turn++;
  };

  sixSidedDie = new Die(1, 6, 0);

  tenSidedDie = new Die(1, 10, 0);

  twentySidedDie = new Die(1, 20, 0);

  hundredSidedDie = new Die(1, 100, 0);

  smallDrop = new Die(2, 200, -100);

  mediumDrop = new Die(4, 200, -200);

  largeDrop = new Die(6, 300, -300);

  hugeDrop = new Die(12, 400, -500);

  smallDamage = new Die(3, 6, -3);

  mediumDamage = new Die(6, 6, -6);

  largeDamage = new Die(9, 9, -9);

  hugeDamage = new Die(15, 12, -2);

  smallHP = new Die(4, 5, +20);

  mediumHP = new Die(8, 5, +40);

  largeHP = new Die(12, 7, +60);

  hugeHP = new Die(15, 15, +80);

  this.map = [["Plain of Ashard", "Spider Forest", "Lake Mysterious", "Eora River"], ["foothills", "forest", "marshes", "Amazon"], ["desert", "town of Zemboria", "swamp", "deeper swamp"], ["wasteland", "Beara Mountains", "Zealon Dungeon", "Dangerous Forest"]];

  this.locX = 1;

  this.locY = 2;

  this.returnToState = void 0;

  this.enemies = [];

  this.state = "start";

  this.hp = 60;

  this.mp = 50;

  this.gp = 300;

  this.xp = 0;

  this.block = 2;

  this.evade = 0.2;

  this.turn = 0;

  this.inventory = [new HealthPotion(), new HealthPotion()];

  this.weapon = new Weapon(smallDamage, "Short Sword", 10);

  this.statesEntered = [];

  $(function() {
    refresh();
    return run();
  });

}).call(this);
