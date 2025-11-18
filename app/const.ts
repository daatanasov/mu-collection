type ArmorPiece = {
  [key: string]: string[];
};

type ArmorSet = {
  [setName: string]: ArmorPiece;
};

type ArmorData = {
  [className: string]: ArmorSet;
};

export const armorData: ArmorData = {
  "Blade Knight": {
    "Leather Set": {
      Helm: ["Damage Decrease", "Increase Zen Drop Rate"],
      Armor: ["Defense Success Rate", "Increase Zen Drop Rate"],
      Pants: ["Increase Maximum SD", "Defense Success Rate"],
      Gloves: ["None"],
      Boots: ["None"],
    },
    "Bronze Set": {
      Helm: ["Damage Decrease", "Increase Maximum Life", "Increase Maximum SD"],
      Armor: ["None"],
      Pants: ["Increase Maximum Life", "Damage Decrease"],
      Gloves: [
        "Increase Maximum Life",
        "Increase Maximum SD",
        "Defense Success Rate",
      ],
      Boots: ["None", "luck"],
    },
    "Scale Set": {
      Helm: ["Damage Decrease", "Reflect Damage"],
      Armor: ["None"],
      Pants: ["None"],
      Gloves: ["None"],
      Boots: ["Increase Maximum Life", "Defense Success Rate"],
    },
    "Brass Set": {
      Helm: ["Reflect Damage", "Increase Zen Drop Rate"],
      Armor: ["None"],
      Pants: ["None"],
      Gloves: ["Increase Maximum Life", "Defense Success Rate"],
      Boots: ["Increase Maximum SD", "Damage Decrease"],
    },
    "Plate Set": {
      Helm: ["None"],
      Armor: ["None"],
      Pants: ["None"],
      Gloves: ["None"],
      Boots: ["Increase Maximum SD", "Defense Success Rate"],
    },
    "Dragon Set": {
      Helm: ["Damage Decrease", "Increase Zen Drop Rate"],
      Armor: ["Defense Success Rate", "Increase Zen Drop Rate"],
      Pants: ["Damage Decrease", "Increase Zen Drop Rate"],
      Gloves: ["None"],
      Boots: ["None"],
    },
    "Black Dragon Set": {
      Helm: ["Increase Maximum Life", "Damage Decrease"],
      Armor: ["Increase Maximum Life", "Increase Zen Drop Rate"],
      Pants: ["None"],
      Gloves: ["None"],
      Boots: ["Damage Decrease", "Increase Zen Drop Rate"],
    },
    "Dark Phoenix Set": {
      Helm: ["Damage Decrease", "Reflect Damage"],
      Armor: ["Increase Maximum Life", "Defense Success Rate"],
      Pants: ["None"],
      Gloves: ["None"],
      Boots: ["Reflect Damage", "Increase Zen Drop Rate"],
    },
    "Great Dragon Set": {
      Helm: ["Increase Maximum SD", "Reflect Damage"],
      Armor: ["Reflect Damage", "Increase Zen Drop Rate"],
      Pants: ["Damage Decrease", "Defense Success Rate"],
      Gloves: ["Increase Maximum Life", "Reflect Damage"],
      Boots: ["None"],
    },
    "Dragon Knight Set": {
      Helm: [
        "Increase Maximum SD",
        "Defense Success Rate",
        "Increase Zen Drop Rate",
      ],
      Armor: ["Increase Maximum Life", "Reflect Damage"],
      Pants: [
        "Reflect Damage",
        "Defense Success Rate",
        "Increase Zen Drop Rate",
      ],
      Gloves: ["None"],
      Boots: ["None"],
    },
    "Brave Set": {
      Helm: ["Defense Success Rate", "Increase Zen Drop Rate"],
      Armor: ["None"],
      Pants: ["Defense Success Rate", "Increase Zen Drop Rate"],
      Gloves: ["None"],
      Boots: ["None"],
    },
    "Manticore Set": {
      Helm: ["Damage Decrease", "Reflect Damage", "Defense Success Rate"],
      Armor: ["Increase Maximum SD", "Defense Success Rate"],
      Pants: [
        "Increase Maximum SD",
        "Defense Success Rate",
        "Increase Zen Drop Rate",
      ],
      Gloves: ["Increase Maximum SD", "Defense Success Rate"],
      Boots: [
        "Increase Maximum Life",
        "Defense Success Rate",
        "Increase Zen Drop Rate",
      ],
    },
    "Brilliant Set": {
      Helm: ["Increase Maximum Life", "Increase Maximum SD"],
      Armor: ["Damage Decrease", "Reflect Damage"],
      Pants: ["Reflect Damage", "Defense Success Rate"],
      Gloves: [
        "Increase Maximum Life",
        "Defense Success Rate",
        "Increase Zen Drop Rate",
      ],
      Boots: [
        "Increase Maximum SD",
        "Damage Decrease",
        "Increase Zen Drop Rate",
      ],
    },
    "Apocalypse Set": {
      Helm: ["Damage Decrease", "Reflect Damage"],
      Armor: ["Increase Maximum Life", "Damage Decrease"],
      Pants: [
        "Increase Maximum Life",
        "Defense Success Rate",
        "Increase Zen Drop Rate",
      ],
      Gloves: [
        "Increase Maximum SD",
        "Reflect Damage",
        "Increase Zen Drop Rate",
      ],
      Boots: ["Damage Decrease", "Increase Zen Drop Rate"],
    },
    "Lightning Set": {
      Helm: ["Increase Maximum SD", "Reflect Damage"],
      Armor: ["Increase Maximum SD", "Defense Success Rate"],
      Pants: ["Damage Decrease", "Defense Success Rate"],
      Gloves: ["Increase Maximum SD", "Increase Zen Drop Rate"],
      Boots: ["Reflect Damage", "Increase Zen Drop Rate"],
    },
  },
  "Magic Gladiator": {
    "Storm Crow Set": {
      Armor: ["None"],
      Pants: ["Damage Decrease", "Increase Zen Drop Rate"],
      Gloves: ["Increase Maximum Life", "Reflect Damage"],
      Boots: ["Increase Maximum SD", "Increase Zen Drop Rate"],
    },
    "Thunder Hawk Set": {
      Armor: [
        "Increase Maximum Life",
        "Reflect Damage",
        "Defense Success Rate",
      ],
      Pants: [
        "Increase Maximum SD",
        "Defense Success Rate",
        "Increase Zen Drop Rate",
      ],
      Gloves: ["None"],
      Boots: ["Increase Maximum Life", "Reflect Damage"],
    },
    "Hurricane Set": {
      Armor: [
        "Damage Decrease",
        "Increase Zen Drop Rate",
        "Defense Success Rate",
      ],
      Pants: ["Increase Maximum SD", "Damage Decrease", "Defense Success Rate"],
      Gloves: ["None"],
      Boots: ["Damage Decrease", "Reflect Damage", "Defense Success Rate"],
    },
    "Volcano Set": {
      Armor: ["Increase Maximum Life", "Defense Success Rate"],
      Pants: ["Increase Maximum Life", "Increase Maximum SD", "Reflect Damage"],
      Gloves: [
        "Increase Maximum SD",
        "Reflect Damage",
        "Increase Maximum Life",
      ],
      Boots: ["None"],
    },
    "Phantom Set": {
      Armor: ["Damage Decrease", "Increase Zen Drop Rate"],
      Pants: ["Damage Decrease", "Reflect Damage"],
      Gloves: ["Increase Maximum Life", "Defense Success Rate"],
      Boots: ["None"],
    },
    "Manticore Set": {
      Armor: [
        "Increase Maximum Life",
        "Increase Maximum SD",
        "Increase Zen Drop Rate",
      ],
      Pants: [
        "Increase Maximum Life",
        "Defense Success Rate",
        "Increase Zen Drop Rate",
      ],
      Gloves: ["Increase Maximum SD", "Defense Success Rate"],
      Boots: ["Damage Decrease", "Increase Zen Drop Rate"],
    },
    "Brilliant Set": {
      Armor: ["Increase Maximum SD", "Reflect Damage"],
      Pants: [
        "Increase Maximum Life",
        "Increase Maximum SD",
        "Defense Success Rate",
      ],
      Gloves: ["Increase Maximum SD", "Reflect Damage", "Defense Success Rate"],
      Boots: [
        "Increase Maximum SD",
        "Damage Decrease",
        "Increase Zen Drop Rate",
      ],
    },
    "Apocalypse Set": {
      Armor: ["Increase Maximum Life", "Increase Maximum SD", "Reflect Damage"],
      Pants: ["Increase Maximum SD", "Increase Zen Drop Rate"],
      Gloves: ["Damage Decrease", "Increase Zen Drop Rate"],
      Boots: [
        "Damage Decrease",
        "Defense Success Rate",
        "Increase Zen Drop Rate",
      ],
    },
    "Lightning Set": {
      Armor: [
        "Increase Maximum Life",
        "Defense Success Rate",
        "Increase Zen Drop Rate",
      ],
      Pants: ["Increase Maximum SD", "Reflect Damage", "Defense Success Rate"],
      Gloves: ["Increase Maximum SD", "Reflect Damage", "Defense Success Rate"],
      Boots: ["Damage Decrease", "Reflect Damage", "Defense Success Rate"],
    },
  },
  "Rage Fighter": {
    "Leather Set": {
      Helm: ["Damage Decrease", "Increase Zen Drop Rate"],
      Armor: ["Defense Success Rate", "Increase Zen Drop Rate"],
      Pants: ["Increase Maximum SD", "Defense Success Rate"],
      Gloves: ["None"],
      Boots: ["None"],
    },
    "Scale Set": {
      Helm: ["Damage Decrease", "Reflect Damage"],
      Armor: ["None"],
      Pants: ["None"],
      Gloves: ["None"],
      Boots: ["Increase Maximum Life", "Defense Success Rate"],
    },
    "Brass Set": {
      Helm: ["Reflect Damage", "Increase Zen Drop Rate"],
      Armor: ["None"],
      Pants: ["None"],
      Gloves: ["Increase Maximum Life", "Defense Success Rate"],
      Boots: ["Increase Maximum SD", "Damage Decrease"],
    },
    "Plate Set": {
      Helm: ["None"],
      Armor: ["None"],
      Pants: ["None"],
      Gloves: ["None"],
      Boots: ["Increase Maximum SD", "Defense Success Rate"],
    },
    "Sacred Fire Set": {
      Helm: [
        "Increase Maximum Life",
        "Damage Decrease",
        "Defense Success Rate",
      ],
      Armor: ["Damage Decrease", "Increase Zen Drop Rate"],
      Pants: [
        "Reflect Damage",
        "Defense Success Rate",
        "Increase Zen Drop Rate",
      ],
      Boots: ["None"],
    },
    "Storm Zahard Set": {
      Helm: ["None"],
      Armor: ["None"],
      Pants: ["Increase Maximum SD", "Reflect Damage"],
      Boots: ["Increase Maximum SD", "Increase Zen Drop Rate"],
    },
    "Piercing Gloves Set": {
      Helm: ["None"],
      Armor: ["None"],
      Pants: ["None"],
      Boots: ["Increase Maximum Life", "Increase Zen Drop Rate"],
    },
    "Phoenix Soul": {
      Helm: ["Increase Maximum SD", "Damage Decrease", "Defense Success Rate"],
      Armor: [
        "Damage Decrease",
        "Defense Success Rate",
        "Increase Zen Drop Rate",
      ],
      Pants: ["None"],
      Boots: ["None"],
    },
    "Bloody Dragon": {
      Helm: ["Increase Maximum Life", "Reflect Damage", "Defense Success Rate"],
      Armor: ["None"],
      Pants: ["None"],
      Boots: ["None"],
    },
    Multicore: {
      Helm: ["Increase Maximum SD", "Defense Success Rate"],
      Armor: ["Increase Maximum Life", "Damage Decrease"],
      Pants: ["Increase Maximum Life", "Damage Decrease"],
      Boots: [
        "Increase Maximum Life",
        "Increase Maximum SD",
        "Damage Decrease",
      ],
    },
    "Brilliant Set": {
      Helm: ["Increase Maximum SD", "Defense Success Rate"],
      Armor: [
        "Increase Maximum Life",
        "Increase Maximum SD",
        "Damage Decrease",
      ],
      Pants: ["Damage Decrease", "Increase Zen Drop Rate"],
      Boots: ["Increase Maximum SD", "Increase Zen Drop Rate"],
    },
    "Apocalypse Set": {
      Helm: [
        "Damage Decrease",
        "Defense Success Rate",
        "Increase Zen Drop Rate",
      ],
      Armor: [
        "Damage Decrease",
        "Defense Success Rate",
        "Increase Zen Drop Rate",
      ],
      Pants: [
        "Increase Maximum Life",
        "Increase Maximum SD",
        "Defense Success Rate",
      ],
      Boots: ["Increase Maximum SD", "Increase Zen Drop Rate"],
    },
    "Lightning Set": {
      Helm: ["Increase Maximum SD", "Reflect Damage"],
      Armor: ["Increase Maximum SD", "Damage Decrease"],
      Pants: [
        "Increase Maximum Life",
        "Increase Maximum SD",
        "Defense Success Rate",
      ],
      Boots: ["Reflect Damage", "Increase Zen Drop Rate"],
    },
  },

  "Wizard Soul Master": {
    "Pad Set": {
      Helm: ["None"],
      Armor: ["None"],
      Pants: ["None"],
      Gloves: [
        "Increase Maximum Life",
        "Damage Decrease",
        "Defense Success Rate",
      ],
      Boots: ["None"],
    },
    "Bone Set": {
      Helm: ["Increase Maximum SD", "Increase Zen Drop Rate"],
      Armor: [
        "Increase Maximum Life",
        "Reflect Damage",
        "Increase Zen Drop Rate",
      ],
      Pants: ["Increase Maximum Life", "Increase Maximum SD", "Reflect Damage"],
      Gloves: ["Increase Maximum SD", "Increase Zen Drop Rate"],
      Boots: ["None", "Luck"],
    },
    "Sphinx Set": {
      Helm: ["Increase Maximum SD", "Reflect Damage", "Defense Success Rate"],
      Armor: ["Increase Maximum SD", "Increase Zen Drop Rate"],
      Pants: ["Increase Maximum SD", "Increase Zen Drop Rate"],
      Gloves: ["None", "Luck"],
      Boots: ["Increase Maximum Life", "Damage Decrease", "Reflect Damage"],
    },
    "Legendary Set": {
      Helm: ["Increase Maximum Life", "Reflect Damage"],
      Armor: ["None", "Luck"],
      Pants: ["Increase Maximum SD", "Increase Zen Drop Rate"],
      Gloves: ["None", "Luck"],
      Boots: ["Increase Maximum SD", "Damage Decrease"],
    },
    "Grand Soul": {
      Helm: ["Damage Decrease", "Reflect Damage", "Defense Success Rate"],
      Armor: ["None"],
      Pants: ["None"],
      Gloves: ["None"],
      Boots: ["None"],
    },
    "Dark Soul Set": {
      Helm: ["None"],
      Armor: [
        "Increase Maximum Life",
        "Reflect Damage",
        "Defense Success Rate",
      ],
      Pants: ["None"],
      Gloves: ["Damage Decrease", "Reflect Damage"],
      Boots: ["Increase Maximum Life", "Increase Zen Drop Rate"],
    },
    "Venom Mist": {
      Helm: ["Increase Maximum Life", "Increase Maximum SD", "Reflect Damage"],
      Armor: ["Damage Decrease", "Increase Zen Drop Rate"],
      Pants: ["None", "Increase Zen Drop Rate"],
      Gloves: ["Increase Maximum Life", "Defense Success Rate"],
      Boots: ["Damage Decrease", "Defense Success Rate"],
    },
    "Hades Set": {
      Helm: ["None"],
      Armor: ["Increase Maximum Life", "Defense Success Rate"],
      Pants: ["None"],
      Gloves: ["Increase Maximum Life", "Defense Success Rate"],
      Boots: ["Increase Maximum SD", "Reflect Damage"],
    },
    "Manticore Set": {
      Helm: [
        "Increase Maximum Life",
        "Defense Success Rate",
        "Increase Zen Drop Rate",
      ],
      Armor: ["Increase Maximum Life", "Increase Maximum SD", "Reflect Damage"],
      Pants: ["Increase Maximum SD", "Reflect Damage", "Defense Success Rate"],
      Gloves: ["Damage Decrease", "Increase Zen Drop Rate"],
      Boots: ["Increase Maximum Life", "Damage Decrease"],
    },
    "Brilliant Set": {
      Helm: ["Increase Maximum Life", "Increase Maximum SD", "Reflect Damage"],
      Armor: [
        "Increase Maximum Life",
        "Defense Success Rate",
        "Increase Zen Drop Rate",
      ],
      Pants: [
        "Increase Maximum Life",
        "Reflect Damage",
        "Defense Success Rate",
      ],
      Gloves: ["Increase Maximum SD", "Increase Zen Drop Rate"],
      Boots: [
        "Increase Maximum Life",
        "Increase Maximum SD",
        "Increase Zen Drop Rate",
      ],
    },
    "Apocalypse Set": {
      Helm: [
        "Increase Maximum SD",
        "Damage Decrease",
        "Increase Zen Drop Rate",
      ],
      Armor: ["Damage Decrease", "Reflect Damage", "Increase Zen Drop Rate"],
      Pants: ["Increase Maximum Life", "Increase Maximum SD", "Reflect Damage"],
      Gloves: ["Damage Decrease", "Defense Success Rate"],
      Boots: ["Damage Decrease", "Reflect Damage"],
    },
    "Lightning Set": {
      Helm: ["Damage Decrease", "Increase Zen Drop Rate"],
      Armor: ["Increase Maximum SD", "Damage Decrease"],
      Pants: ["Reflect Damage", "Increase Zen Drop Rate"],
      Gloves: ["Damage Decrease", "Reflect Damage", "Defense Success Rate"],
      Boots: [
        "Increase Maximum Life",
        "Defense Success Rate",
        "Increase Zen Drop Rate",
      ],
    },
  },
  Elf: {
    "Vine Set": {
      Helm: ["Increase Maximum SD", "Increase Zen Drop Rate"],
      Armor: ["None"],
      Pants: ["Increase Maximum SD", "Increase Zen Drop Rate"],
      Gloves: ["None"],
      Boots: [
        "Increase Maximum Life",
        "Reflect Damage",
        "Defense Success Rate",
      ],
    },
    "Silk Set": {
      Helm: ["Increase Maximum Life", "Reflect Damage", "Defense Success Rate"],
      Armor: ["None"],
      Pants: ["Damage Decrease", "Increase Zen Drop Rate"],
      Gloves: ["None"],
      Boots: ["Increase Maximum SD", "Increase Zen Drop Rate"],
    },
    "Wind Set": {
      Helm: ["Increase Maximum Life", "Damage Decrease"],
      Armor: ["Damage Decrease", "Increase Zen Drop Rate"],
      Pants: ["None"],
      Gloves: ["Increase Maximum Life", "Defense Success Rate"],
      Boots: ["None"],
    },
    "Spirit Set": {
      Helm: ["Defense Success Rate", "Increase Zen Drop Rate"],
      Armor: ["Increase Maximum SD", "Damage Decrease", "Defense Success Rate"],
      Pants: ["Damage Decrease", "Reflect Damage", "Defense Success Rate"],
      Gloves: [
        "Reflect Damage",
        "Defense Success Rate",
        "Increase Zen Drop Rate",
      ],
      Boots: ["None"],
    },
    "Guardian Set": {
      Helm: ["Increase Maximum Life", "Reflect Damage"],
      Armor: ["Damage Decrease", "Reflect Damage", "Defense Success Rate"],
      Pants: ["Increase Maximum Life", "Increase Maximum SD", "Reflect Damage"],
      Gloves: ["Damage Decrease", "Reflect Damage"],
      Boots: ["Increase Maximum SD", "Increase Zen Drop Rate"],
    },
    "Holy Spirit Set": {
      Helm: ["None"],
      Armor: ["None"],
      Pants: ["None"],
      Gloves: ["None"],
      Boots: ["None"],
    },
    "Red Spirit Set": {
      Helm: ["None"],
      Armor: ["None"],
      Pants: ["None"],
      Gloves: ["None"],
      Boots: ["Increase Maximum SD", "Damage Decrease", "Defense Success Rate"],
    },
    "Sylphid Ray Set": {
      Helm: ["Increase Maximum Life", "Damage Decrease"],
      Armor: ["None"],
      Pants: ["Increase Maximum SD", "Damage Decrease"],
      Gloves: ["Defense Success Rate", "Increase Zen Drop Rate"],
      Boots: ["Increase Maximum SD", "Increase Zen Drop Rate"],
    },
    "Divine Set": {
      Helm: ["None"],
      Armor: ["None"],
      Pants: ["Damage Decrease", "Reflect Damage"],
      Gloves: ["Increase Maximum SD", "Damage Decrease"],
      Boots: ["None"],
    },
    "Manticore Set": {
      Helm: ["Increase Maximum Life", "Damage Decrease"],
      Armor: ["Increase Maximum SD", "Defense Success Rate"],
      Pants: ["Increase Maximum Life", "Increase Zen Drop Rate"],
      Gloves: ["Increase Maximum SD", "Defense Success Rate"],
      Boots: [
        "Increase Maximum Life",
        "Increase Maximum SD",
        "Defense Success Rate",
      ],
    },
    "Brilliant Elf Set": {
      Helm: ["Damage Decrease", "Reflect Damage"],
      Armor: [
        "Increase Maximum Life",
        "Defense Success Rate",
        "Increase Zen Drop Rate",
      ],
      Pants: ["Increase Maximum SD", "Reflect Damage", "Defense Success Rate"],
      Gloves: ["Damage Decrease", "Increase Zen Drop Rate"],
      Boots: ["Increase Maximum SD", "Damage Decrease"],
    },
    "Apocalypse Set": {
      Helm: ["Increase Maximum SD", "Defense Success Rate"],
      Armor: [
        "Increase Maximum Life",
        "Increase Maximum SD",
        "Damage Decrease",
      ],
      Pants: [
        "Increase Maximum SD",
        "Damage Decrease",
        "Increase Zen Drop Rate",
      ],
      Gloves: ["Increase Maximum SD", "Increase Zen Drop Rate"],
      Boots: ["Increase Maximum Life", "Damage Decrease"],
    },
    "Lightning Set": {
      Helm: ["Damage Decrease", "Reflect Damage"],
      Armor: ["Increase Maximum SD", "Damage Decrease"],
      Pants: ["Increase Maximum SD", "Reflect Damage", "Defense Success Rate"],
      Gloves: ["Increase Maximum SD", "Reflect Damage", "Defense Success Rate"],
      Boots: ["Increase Maximum SD", "Defense Success Rate"],
    },
  },
  "Dark Lord": {
    "Leather Set": {
      Helm: ["Damage Decrease", "Increase Zen Drop Rate"],
      Armor: ["Defense Success Rate", "Increase Zen Drop Rate"],
      Pants: ["Increase Maximum SD", "Defense Success Rate"],
      Gloves: ["None"],
      Boots: ["None"],
    },
    "Bronze Set": {
      Helm: ["Increase Maximum Life", "Increase Maximum SD", "Damage Decrease"],
      Armor: ["None"],
      Pants: ["Increase Maximum Life", "Damage Decrease"],
      Gloves: [
        "Increase Maximum Life",
        "Increase Maximum SD",
        "Defense Success Rate",
      ],
      Boots: ["None"],
    },
    "Scale Set": {
      Helm: ["Damage Decrease", "Reflect Damage"],
      Armor: ["None"],
      Pants: ["None"],
      Gloves: ["None"],
      Boots: ["Increase Maximum Life", "Defense Success Rate"],
    },
    "Light Plate Set": {
      Helm: ["None"],
      Armor: ["Damage Decrease", "Reflect Damage"],
      Pants: ["Increase Maximum Life", "Increase Maximum SD", "Reflect Damage"],
      Gloves: ["Increase Maximum Life", "Defense Success Rate"],
      Boots: ["Increase Maximum Life", "Damage Decrease", "Reflect Damage"],
    },
    "Adamantine Set": {
      Helm: ["None"],
      Armor: ["Damage Decrease", "Reflect Damage"],
      Pants: ["None"],
      Gloves: [
        "Increase Maximum SD",
        "Damage Decrease",
        "Defense Success Rate",
      ],
      Boots: [
        "Increase Maximum SD",
        "Defense Success Rate",
        "Increase Zen Drop Rate",
      ],
    },
    "Dark Steel Set": {
      Helm: ["None"],
      Armor: ["Increase Maximum SD", "Reflect Damage"],
      Pants: ["Increase Maximum Life", "Defense Success Rate"],
      Gloves: ["Increase Maximum SD", "Defense Success Rate"],
      Boots: [
        "Increase Maximum Life",
        "Damage Decrease",
        "Increase Zen Drop Rate",
      ],
    },
    "Dark Master Set": {
      Helm: ["Defense Success Rate", "Increase Zen Drop Rate"],
      Armor: ["Increase Maximum Life", "Increase Zen Drop Rate"],
      Pants: ["None"],
      Gloves: ["Defense Success Rate", "Increase Zen Drop Rate"],
      Boots: [
        "Increase Maximum SD",
        "Damage Decrease",
        "Increase Zen Drop Rate",
      ],
    },
    "Sunlight Set": {
      Helm: ["Increase Maximum SD", "Reflect Damage", "Defense Success Rate"],
      Armor: ["None"],
      Pants: ["None"],
      Gloves: [
        "Increase Maximum SD",
        "Damage Decrease",
        "Increase Zen Drop Rate",
      ],
      Boots: ["Increase Maximum Life", "Increase Zen Drop Rate"],
    },
    "Royal Set": {
      Helm: ["Increase Maximum Life", "Increase Maximum SD", "Reflect Damage"],
      Armor: [
        "Increase Maximum SD",
        "Defense Success Rate",
        "Increase Zen Drop Rate",
      ],
      Pants: [
        "Increase Maximum Life",
        "Increase Maximum SD",
        "Damage Decrease",
      ],
      Gloves: ["None"],
      Boots: ["Damage Decrease", "Reflect Damage", "Defense Success Rate"],
    },
    "Manticore Set": {
      Helm: [
        "Increase Maximum Life",
        "Increase Maximum SD",
        "Defense Success Rate",
      ],
      Armor: ["Increase Maximum SD", "Increase Zen Drop Rate"],
      Pants: ["Defense Success Rate", "Increase Zen Drop Rate"],
      Gloves: [
        "Increase Maximum Life",
        "Increase Maximum SD",
        "Damage Decrease",
      ],
      Boots: ["Increase Maximum SD", "Damage Decrease", "Reflect Damage"],
    },
    "Brilliant Set": {
      Helm: ["Increase Maximum Life", "Increase Maximum SD"],
      Armor: ["Increase Maximum SD", "Defense Success Rate"],
      Pants: [
        "Increase Maximum Life",
        "Reflect Damage",
        "Defense Success Rate",
      ],
      Gloves: ["Increase Maximum SD", "Reflect Damage"],
      Boots: ["Increase Maximum Life", "Increase Maximum SD"],
    },
    "Apocalypse Set": {
      Helm: ["Damage Decrease", "Defense Success Rate"],
      Armor: ["Increase Maximum SD", "Defense Success Rate"],
      Pants: ["Damage Decrease", "Reflect Damage", "Defense Success Rate"],
      Gloves: ["Reflect Damage", "Increase Zen Drop Rate"],
      Boots: [
        "Increase Maximum SD",
        "Defense Success Rate",
        "Increase Zen Drop Rate",
      ],
    },
    "Lightning Set": {
      Helm: [
        "Increase Maximum Life",
        "Damage Decrease",
        "Increase Zen Drop Rate",
      ],
      Armor: ["Increase Maximum SD", "Defense Success Rate"],
      Pants: [
        "Increase Maximum SD",
        "Damage Decrease",
        "Increase Zen Drop Rate",
      ],
      Gloves: ["Increase Maximum SD", "Defense Success Rate"],
      Boots: [
        "Increase Maximum SD",
        "Reflect Damage",
        "Increase Zen Drop Rate",
      ],
    },
  },

  Summoner: {
    "Violent Wind Set": {
      Helm: ["Increase Maximum Life", "Defense Success Rate"],
      Armor: ["None"],
      Pants: [
        "Reflect Damage",
        "Defense Success Rate",
        "Increase Zen Drop Rate",
      ],
      Gloves: ["Increase Maximum Life", "Reflect Damage"],
      Boots: ["None"],
    },
    "Red Winged Set": {
      Helm: ["None"],
      Armor: ["None"],
      Pants: ["None"],
      Gloves: ["None"],
      Boots: ["Damage Decrease", "Defense Success Rate"],
    },
    "Ancient Set": {
      Helm: ["None"],
      Armor: ["Damage Decrease", "Increase Zen Drop Rate"],
      Pants: ["Increase Maximum Life", "Reflect Damage"],
      Gloves: [
        "Increase Maximum Life",
        "Damage Decrease",
        "Defense Success Rate",
      ],
      Boots: [
        "Increase Maximum Life",
        "Increase Maximum SD",
        "Defense Success Rate",
      ],
    },
    "Demonic Set": {
      Helm: ["None"],
      Armor: ["Damage Decrease", "Defense Success Rate"],
      Pants: [
        "Increase Maximum SD",
        "Damage Decrease",
        "Increase Zen Drop Rate",
      ],
      Gloves: ["Reflect Damage", "Increase Zen Drop Rate"],
      Boots: ["None"],
    },
    "Storm Blitz Set": {
      Helm: ["Reflect Damage", "Increase Zen Drop Rate"],
      Armor: ["Increase Maximum Life", "Increase Maximum SD", "Reflect Damage"],
      Pants: ["None"],
      Gloves: ["Increase Maximum SD", "Increase Zen Drop Rate"],
      Boots: ["Increase Maximum Life", "Increase Maximum SD"],
    },
    "Eternal Winged Set": {
      Helm: ["Reflect Damage", "Defense Success Rate"],
      Armor: ["None"],
      Pants: ["Defense Success Rate", "Increase Zen Drop Rate"],
      Gloves: [
        "Increase Maximum Life",
        "Reflect Damage",
        "Defense Success Rate",
      ],
      Boots: ["None"],
    },
    "Multicore Set": {
      Helm: ["Increase Maximum Life", "Increase Maximum SD"],
      Armor: ["Damage Decrease", "Reflect Damage"],
      Pants: ["Increase Maximum SD", "Damage Decrease"],
      Gloves: ["Increase Maximum SD", "Increase Zen Drop Rate"],
      Boots: [
        "Increase Maximum Life",
        "Increase Maximum SD",
        "Damage Decrease",
      ],
    },
    "Brilliant Set": {
      Helm: ["Increase Maximum SD", "Reflect Damage", "Defense Success Rate"],
      Armor: ["Increase Maximum Life", "Increase Maximum SD", "Reflect Damage"],
      Pants: [
        "Increase Maximum Life",
        "Damage Decrease",
        "Defense Success Rate",
      ],
      Gloves: [
        "Increase Maximum Life",
        "Defense Success Rate",
        "Increase Zen Drop Rate",
      ],
      Boots: ["Increase Maximum SD", "Damage Decrease"],
    },
    "Apocalypse Set": {
      Helm: ["Reflect Damage", "Defense Success Rate"],
      Armor: [
        "Increase Maximum Life",
        "Defense Success Rate",
        "Increase Zen Drop Rate",
      ],
      Pants: [
        "Increase Maximum Life",
        "Increase Maximum SD",
        "Damage Decrease",
      ],
      Gloves: ["Increase Maximum SD", "Defense Success Rate"],
      Boots: ["Increase Maximum SD", "Defense Success Rate"],
    },
    "Lightning Set": {
      Helm: ["Increase Maximum SD", "Defense Success Rate"],
      Armor: ["Increase Maximum Life", "Damage Decrease"],
      Pants: ["Defense Success Rate", "Increase Zen Drop Rate"],
      Gloves: ["Increase Maximum Life", "Damage Decrease"],
      Boots: ["Increase Maximum SD", "Defense Success Rate"],
    },
  },
};
