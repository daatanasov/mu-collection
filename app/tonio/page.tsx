"use client";
import React, { useState, useMemo } from "react";
import { Search } from "lucide-react";

const armorData = [
  {
    set: "Pad",
    part: "Gloves",
    options: ["Decrease Damage", "Reflect Damage", "Defense Success Rate"],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Pad",
    part: "Boots",
    options: [
      "Increase Maximum Life",
      "Increase Maximum SD",
      "Decrease Damage",
    ],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Leather",
    part: "Helm",
    options: ["Increase Maximum SD", "Reflect Damage", "Defense Success Rate"],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Leather",
    part: "Armor",
    options: [
      "Increase Maximum Life",
      "Reflect Damage",
      "Defense Success Rate",
    ],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Bronze",
    part: "Helm",
    options: [
      "Increase Maximum Life",
      "Decrease Damage",
      "Defense Success Rate",
    ],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Bone",
    part: "Helm",
    options: ["Decrease Damage", "Reflect Damage", "Defense Success Rate"],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Wind",
    part: "Boots",
    options: ["Increase Maximum Life", "Decrease Damage", "Reflect Damage"],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Violent Wind",
    part: "Helm",
    options: [
      "Increase Maximum Life",
      "Increase Maximum SD",
      "Decrease Damage",
    ],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Violent Wind",
    part: "Armor",
    options: [
      "Increase Maximum Life",
      "Increase Maximum SD",
      "Defense Success Rate",
    ],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Violent Wind",
    part: "Pants",
    options: [
      "Increase Maximum Life",
      "Increase Maximum SD",
      "Decrease Damage",
    ],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Sphinx",
    part: "Pants",
    options: [
      "Increase Maximum SD",
      "Decrease Damage",
      "Increase Zen Drop Rate",
    ],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Sphinx",
    part: "Gloves",
    options: ["Decrease Damage", "Reflect Damage"],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Brass",
    part: "Helm",
    options: ["Decrease Damage", "Increase Zen Drop Rate"],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Brass",
    part: "Pants",
    options: ["Increase Maximum SD", "Decrease Damage"],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Brass",
    part: "Gloves",
    options: [
      "Increase Maximum Life",
      "Reflect Damage",
      "Defense Success Rate",
    ],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Legendary",
    part: "Gloves",
    options: ["Decrease Damage", "Reflect Damage", "Defense Success Rate"],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Red Winged",
    part: "Armor",
    options: ["Increase Maximum SD", "Reflect Damage", "Defense Success Rate"],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Guardian",
    part: "Gloves",
    options: ["Decrease Damage", "Reflect Damage", "Defense Success Rate"],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Dragon",
    part: "Gloves",
    options: ["Increase Maximum SD", "Decrease Damage", "Defense Success Rate"],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Ancient",
    part: "Boots",
    options: [
      "Reflect Damage",
      "Defense Success Rate",
      "Increase Zen Drop Rate",
    ],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Adamantie",
    part: "Helm",
    options: ["Decrease Damage", "Increase Zen Drop Rate"],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Adamantie",
    part: "Armor",
    options: [
      "Increase Maximum Life",
      "Reflect Damage",
      "Defense Success Rate",
    ],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Adamantie",
    part: "Gloves",
    options: [
      "Increase Maximum SD",
      "Decrease Damage",
      "Increase Zen Drop Rate",
    ],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Storm Zahar",
    part: "Helm",
    options: [
      "Increase Maximum Life",
      "Reflect Damage",
      "Increase Zen Drop Rate",
    ],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Storm Zahar",
    part: "Armor",
    options: [
      "Increase Maximum Life",
      "Decrease Damage",
      "Increase Zen Drop Rate",
    ],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Demonic",
    part: "Helm",
    options: [
      "Increase Maximum SD",
      "Defense Success Rate",
      "Increase Zen Drop Rate",
    ],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Demonic",
    part: "Pants",
    options: ["Decrease Damage", "Defense Success Rate"],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Holy Spirit",
    part: "Boots",
    options: ["Decrease Damage", "Defense Success Rate"],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Dark Steel",
    part: "Helm",
    options: [
      "Increase Maximum Life",
      "Decrease Damage",
      "Increase Zen Drop Rate",
    ],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Dark Steel",
    part: "Gloves",
    options: [
      "Increase Maximum SD",
      "Decrease Damage",
      "Increase Zen Drop Rate",
    ],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Dark Steel",
    part: "Boots",
    options: ["Increase Maximum Life", "Defense Success Rate"],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Dark Phoenix",
    part: "Armor",
    options: ["Decrease Damage", "Reflect Damage", "Defense Success Rate"],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Thunder Hawk",
    part: "Armor",
    options: ["Increase Maximum SD", "Defense Success Rate"],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Thunder Hawk",
    part: "Boots",
    options: ["Decrease Damage", "Increase Zen Drop Rate"],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Red Spirit",
    part: "Helm",
    options: [
      "Decrease Damage",
      "Defense Success Rate",
      "Increase Zen Drop Rate",
    ],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Red Spirit",
    part: "Armor",
    options: ["Increase Maximum Life", "Decrease Damage", "Reflect Damage"],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Red Spirit",
    part: "Pants",
    options: ["Decrease Damage", "Defense Success Rate"],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Dark Master",
    part: "Pants",
    options: [
      "Increase Maximum Life",
      "Increase Maximum SD",
      "Defense Success Rate",
    ],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Dark Master",
    part: "Boots",
    options: [
      "Increase Maximum Life",
      "Increase Maximum SD",
      "Decrease Damage",
    ],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Dark Soul",
    part: "Gloves",
    options: [
      "Reflect Damage",
      "Defense Success Rate",
      "Increase Zen Drop Rate",
    ],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Great Dragon",
    part: "Armor",
    options: [
      "Increase Maximum Life",
      "Decrease Damage",
      "Defense Success Rate",
    ],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Great Dragon",
    part: "Gloves",
    options: [
      "Increase Maximum Life",
      "Reflect Damage",
      "Defense Success Rate",
    ],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Hurricane",
    part: "Pants",
    options: ["Decrease Damage", "Reflect Damage", "Defense Success Rate"],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Dragon Knight",
    part: "Helm",
    options: [
      "Decrease Damage",
      "Defense Success Rate",
      "Increase Zen Drop Rate",
    ],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Dragon Knight",
    part: "Armor",
    options: ["Increase Maximum SD", "Defense Success Rate"],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Venom Mist",
    part: "Helm",
    options: [
      "Reflect Damage",
      "Defense Success Rate",
      "Increase Zen Drop Rate",
    ],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Venom Mist",
    part: "Armor",
    options: ["Increase Maximum Life", "Decrease Damage"],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Venom Mist",
    part: "Pants",
    options: ["Reflect Damage", "Increase Zen Drop Rate"],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Venom Mist",
    part: "Boots",
    options: ["Increase Maximum Life", "Increase Maximum SD", "Reflect Damage"],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Sylphid Ray",
    part: "Helm",
    options: ["Increase Maximum SD", "Defense Success Rate"],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Sylphid Ray",
    part: "Pants",
    options: ["Increase Maximum Life", "Increase Maximum SD", "Reflect Damage"],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Sylphid Ray",
    part: "Gloves",
    options: ["Increase Maximum Life", "Decrease Damage"],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Sylphid Ray",
    part: "Boots",
    options: [
      "Increase Maximum SD",
      "Decrease Damage",
      "Increase Zen Drop Rate",
    ],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Volcano",
    part: "Pants",
    options: [
      "Increase Maximum Life",
      "Reflect Damage",
      "Defense Success Rate",
    ],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Volcano",
    part: "Gloves",
    options: ["Decrease Damage", "Reflect Damage"],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Sunlight",
    part: "Helm",
    options: ["Increase Maximum SD", "Decrease Damage", "Defense Success Rate"],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Sunlight",
    part: "Armor",
    options: ["Increase Maximum Life", "Increase Maximum SD", "Reflect Damage"],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Storm Blitz",
    part: "Gloves",
    options: ["Increase Maximum SD", "Decrease Damage"],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Storm Blitz",
    part: "Boots",
    options: ["Decrease Damage", "Reflect Damage"],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Phoenix Soul",
    part: "Armor",
    options: ["Reflect Damage", "Increase Zen Drop Rate"],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Phoenix Soul",
    part: "Boots",
    options: ["Increase Maximum Life", "Defense Success Rate"],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Eternal Winged",
    part: "Helm",
    options: ["Decrease Damage", "Defense Success Rate"],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Eternal Winged",
    part: "Armor",
    options: ["Increase Maximum SD", "Decrease Damage", "Defense Success Rate"],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Eternal Winged",
    part: "Pants",
    options: [
      "Decrease Damage",
      "Defense Success Rate",
      "Increase Zen Drop Rate",
    ],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Eternal Winged",
    part: "Boots",
    options: [
      "Increase Maximum Life",
      "Decrease Damage",
      "Increase Zen Drop Rate",
    ],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Brave",
    part: "Helm",
    options: [
      "Increase Maximum SD",
      "Decrease Damage",
      "Increase Zen Drop Rate",
    ],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Brave",
    part: "Pants",
    options: [
      "Increase Maximum SD",
      "Defense Success Rate",
      "Increase Zen Drop Rate",
    ],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Brave",
    part: "Gloves",
    options: [
      "Reflect Damage",
      "Defense Success Rate",
      "Increase Zen Drop Rate",
    ],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Brave",
    part: "Boots",
    options: ["Decrease Damage", "Reflect Damage"],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Phantom",
    part: "Gloves",
    options: ["Increase Maximum Life", "Defense Success Rate"],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Royal",
    part: "Helm",
    options: ["Increase Maximum Life", "Increase Maximum SD", "Reflect Damage"],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Royal",
    part: "Pants",
    options: ["Increase Maximum Life", "Defense Success Rate"],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Royal",
    part: "Gloves",
    options: ["Decrease Damage", "Reflect Damage"],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Hades",
    part: "Pants",
    options: [
      "Increase Maximum SD",
      "Defense Success Rate",
      "Increase Zen Drop Rate",
    ],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Hades",
    part: "Boots",
    options: ["Increase Maximum Life", "Increase Maximum SD", "Reflect Damage"],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Manticore Summoner",
    part: "Helm",
    options: ["Increase Maximum SD", "Reflect Damage"],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Manticore Summoner",
    part: "Gloves",
    options: ["Decrease Damage", "Defense Success Rate"],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Manticore Summoner",
    part: "Boots",
    options: [
      "Increase Maximum Life",
      "Defense Success Rate",
      "Increase Zen Drop Rate",
    ],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Manticore Knight",
    part: "Helm",
    options: ["Increase Maximum Life", "Decrease Damage", "Reflect Damage"],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Manticore Knight",
    part: "Armor",
    options: [
      "Increase Maximum Life",
      "Reflect Damage",
      "Defense Success Rate",
    ],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Manticore Knight",
    part: "Pants",
    options: ["Decrease Damage", "Reflect Damage", "Defense Success Rate"],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Manticore Knight",
    part: "Gloves",
    options: [
      "Increase Maximum Life",
      "Defense Success Rate",
      "Increase Zen Drop Rate",
    ],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Manticore Knight",
    part: "Boots",
    options: ["Increase Maximum SD", "Decrease Damage"],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Manticore MG",
    part: "Armor",
    options: ["Increase Maximum Life", "Decrease Damage"],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Manticore MG",
    part: "Pants",
    options: ["Decrease Damage", "Increase Zen Drop Rate"],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Manticore MG",
    part: "Gloves",
    options: [
      "Increase Maximum Life",
      "Decrease Damage",
      "Defense Success Rate",
    ],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Manticore MG",
    part: "Boots",
    options: [
      "Decrease Damage",
      "Defense Success Rate",
      "Increase Zen Drop Rate",
    ],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Manticore Elf",
    part: "Helm",
    options: ["Decrease Damage", "Increase Zen Drop Rate"],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Manticore Elf",
    part: "Boots",
    options: ["Decrease Damage", "Reflect Damage", "Defense Success Rate"],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Manticore Lord",
    part: "Helm",
    options: ["Increase Maximum Life", "Decrease Damage"],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Manticore Wizard",
    part: "Armor",
    options: ["Increase Maximum SD", "Decrease Damage"],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Manticore Fighter",
    part: "Helm",
    options: ["Decrease Damage", "Reflect Damage", "Defense Success Rate"],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Manticore Fighter",
    part: "Armor",
    options: ["Increase Maximum SD", "Decrease Damage", "Reflect Damage"],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Manticore Fighter",
    part: "Pants",
    options: [
      "Increase Maximum SD",
      "Decrease Damage",
      "Increase Zen Drop Rate",
    ],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Manticore Fighter",
    part: "Boots",
    options: [
      "Reflect Damage",
      "Defense Success Rate",
      "Increase Zen Drop Rate",
    ],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Brilliant Summoner",
    part: "Helm",
    options: [
      "Decrease Damage",
      "Defense Success Rate",
      "Increase Zen Drop Rate",
    ],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Brilliant Summoner",
    part: "Armor",
    options: [
      "Increase Maximum Life",
      "Increase Maximum SD",
      "Defense Success Rate",
    ],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Brilliant Summoner",
    part: "Pants",
    options: ["Decrease Damage", "Increase Zen Drop Rate"],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Brilliant Summoner",
    part: "Gloves",
    options: [
      "Increase Maximum Life",
      "Increase Maximum SD",
      "Defense Success Rate",
    ],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Brilliant Summoner",
    part: "Boots",
    options: ["Increase Maximum SD", "Reflect Damage", "Defense Success Rate"],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Brilliant Knight",
    part: "Helm",
    options: ["Increase Maximum Life", "Defense Success Rate"],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Brilliant Knight",
    part: "Armor",
    options: [
      "Increase Maximum Life",
      "Decrease Damage",
      "Increase Zen Drop Rate",
    ],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Brilliant Knight",
    part: "Pants",
    options: ["Decrease Damage", "Reflect Damage", "Increase Zen Drop Rate"],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Brilliant Knight",
    part: "Gloves",
    options: ["Increase Maximum Life", "Increase Zen Drop Rate"],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Brilliant Knight",
    part: "Boots",
    options: [
      "Increase Maximum SD",
      "Defense Success Rate",
      "Increase Zen Drop Rate",
    ],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Brilliant MG",
    part: "Armor",
    options: ["Increase Maximum SD", "Reflect Damage", "Defense Success Rate"],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Brilliant MG",
    part: "Pants",
    options: ["Decrease Damage", "Defense Success Rate"],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Brilliant MG",
    part: "Gloves",
    options: ["Increase Maximum Life", "Increase Zen Drop Rate"],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Brilliant MG",
    part: "Boots",
    options: [
      "Increase Maximum SD",
      "Decrease Damage",
      "Increase Zen Drop Rate",
    ],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Brilliant Elf",
    part: "Helm",
    options: [
      "Increase Maximum SD",
      "Decrease Damage",
      "Increase Zen Drop Rate",
    ],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Brilliant Elf",
    part: "Pants",
    options: ["Increase Maximum SD", "Reflect Damage"],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Brilliant Elf",
    part: "Gloves",
    options: ["Increase Maximum SD", "Reflect Damage", "Defense Success Rate"],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Brilliant Elf",
    part: "Boots",
    options: ["Decrease Damage", "Reflect Damage", "Increase Zen Drop Rate"],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Brilliant Lord",
    part: "Armor",
    options: ["Decrease Damage", "Reflect Damage", "Defense Success Rate"],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Brilliant Lord",
    part: "Pants",
    options: ["Increase Maximum SD", "Defense Success Rate"],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Brilliant Lord",
    part: "Gloves",
    options: ["Decrease Damage", "Defense Success Rate"],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Brilliant Lord",
    part: "Boots",
    options: ["Decrease Damage", "Defense Success Rate"],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Brilliant Wizard",
    part: "Helm",
    options: [
      "Increase Maximum SD",
      "Defense Success Rate",
      "Increase Zen Drop Rate",
    ],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Brilliant Wizard",
    part: "Pants",
    options: ["Increase Maximum Life", "Increase Maximum SD"],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Brilliant Wizard",
    part: "Gloves",
    options: ["Increase Maximum Life", "Increase Maximum SD"],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Brilliant Wizard",
    part: "Boots",
    options: ["Increase Maximum SD", "Reflect Damage", "Defense Success Rate"],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Brilliant Fight",
    part: "Helm",
    options: ["Decrease Damage", "Increase Zen Drop Rate"],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Brilliant Fight",
    part: "Armor",
    options: [
      "Increase Maximum Life",
      "Defense Success Rate",
      "Increase Zen Drop Rate",
    ],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Brilliant Fight",
    part: "Pants",
    options: [
      "Increase Maximum SD",
      "Defense Success Rate",
      "Increase Zen Drop Rate",
    ],
    collected: false,
    collectedPlace: "",
  },
  {
    set: "Brilliant Fight",
    part: "Boots",
    options: ["Decrease Damage", "Reflect Damage"],
    collected: false,
    collectedPlace: "",
  },
];

export default function ArmorSetSearch() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSets = useMemo(() => {
    if (!searchTerm.trim()) return {};

    const filtered = armorData.filter((item) =>
      item.set.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Group by set name
    const grouped = filtered.reduce((acc, item) => {
      if (!acc[item.set]) {
        acc[item.set] = [];
      }
      acc[item.set].push(item);
      return acc;
    }, {});

    return grouped;
  }, [searchTerm]);

  const setNames = Object.keys(filteredSets);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          Armor Set Finder
        </h1>

        {/* Search Input */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search for armor set (e.g., Manticore, Brilliant, Dragon)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        {/* Results */}
        {searchTerm && setNames.length === 0 && (
          <div className="text-center text-gray-400 py-12">
            No armor sets found matching "{searchTerm}"
          </div>
        )}

        <div className="grid gap-6">
          {setNames.map((setName) => (
            <div
              key={setName}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all">
              <h2 className="text-2xl font-bold text-purple-300 mb-4">
                {setName} Set
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredSets[setName].map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-800/50 rounded-lg p-4 border border-purple-500/30">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-white">
                        {item.part}
                      </h3>
                      <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded">
                        {item.part}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs text-gray-400 font-medium mb-2">
                        Available Options:
                      </p>
                      {item.options.map((option, optIdx) => (
                        <div
                          key={optIdx}
                          className="flex items-center text-sm text-gray-300">
                          <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2"></span>
                          {option}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
