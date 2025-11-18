"use client";

import React, { useState, useMemo, useEffect } from "react";
import { ChevronDown, Search, X, Check } from "lucide-react";

// Sample armor data - replace with your actual armorData import
const initialArmorData = {
  "Blade Knight": {
    "Dragon Set": {
      Helm: {
        attributes: ["Defense +15", "Strength +10"],
        hero: null,
        owned: false,
      },
      Armor: {
        attributes: ["Defense +30", "Vitality +15"],
        hero: null,
        owned: false,
      },
      Pants: {
        attributes: ["Defense +20", "Agility +10"],
        hero: null,
        owned: false,
      },
      Gloves: {
        attributes: ["Defense +10", "Attack Speed +5"],
        hero: null,
        owned: false,
      },
      Boots: {
        attributes: ["Defense +12", "Movement Speed +8"],
        hero: null,
        owned: false,
      },
    },
    "Shadow Set": {
      Helm: {
        attributes: ["Defense +12", "Critical Rate +5%"],
        hero: null,
        owned: false,
      },
      Armor: {
        attributes: ["Defense +25", "HP +200"],
        hero: null,
        owned: false,
      },
      Pants: {
        attributes: ["Defense +18", "Stamina +15"],
        hero: null,
        owned: false,
      },
      Gloves: {
        attributes: ["Defense +8", "Attack Power +20"],
        hero: null,
        owned: false,
      },
      Boots: {
        attributes: ["Defense +10", "Evasion +7%"],
        hero: null,
        owned: false,
      },
    },
  },
  "Soul Master": {
    "Mystic Set": {
      Helm: {
        attributes: ["Defense +10", "Magic Power +25"],
        hero: null,
        owned: false,
      },
      Armor: {
        attributes: ["Defense +22", "Mana +300"],
        hero: null,
        owned: false,
      },
      Pants: {
        attributes: ["Defense +15", "Magic Defense +18"],
        hero: null,
        owned: false,
      },
      Gloves: {
        attributes: ["Defense +8", "Casting Speed +10%"],
        hero: null,
        owned: false,
      },
      Boots: {
        attributes: ["Defense +9", "MP Recovery +5"],
        hero: null,
        owned: false,
      },
    },
  },
  "Muse Elf": {
    "Wind Set": {
      Helm: {
        attributes: ["Defense +11", "Agility +15"],
        hero: null,
        owned: false,
      },
      Armor: {
        attributes: ["Defense +24", "Dexterity +20"],
        hero: null,
        owned: false,
      },
      Pants: {
        attributes: ["Defense +16", "Attack Speed +8"],
        hero: null,
        owned: false,
      },
      Gloves: {
        attributes: ["Defense +7", "Critical Damage +12%"],
        hero: null,
        owned: false,
      },
      Boots: {
        attributes: ["Defense +10", "Movement Speed +12"],
        hero: null,
        owned: false,
      },
    },
  },
};

export default function ArmorSetsViewer() {
  const [armorData, setArmorData] = useState(initialArmorData);
  const [selectedClass, setSelectedClass] = useState("Blade Knight");
  const [selectedSet, setSelectedSet] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterAttribute, setFilterAttribute] = useState<string>("all");

  const classes = Object.keys(armorData);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("armorData");
    if (savedData) {
      try {
        setArmorData(JSON.parse(savedData));
      } catch (error) {
        console.error("Error loading saved data:", error);
      }
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("armorData", JSON.stringify(armorData));
  }, [armorData]);

  // Get all unique attributes for filtering
  const allAttributes = useMemo(() => {
    const attrs = new Set<string>();
    Object.values(armorData).forEach((classData) => {
      Object.values(classData).forEach((setData) => {
        Object.values(setData).forEach((pieceData: any) => {
          pieceData.attributes.forEach((attr: string) => {
            if (attr !== "None") {
              const attrType = attr.split(/[+\d]/)[0].trim();
              attrs.add(attrType);
            }
          });
        });
      });
    });
    return Array.from(attrs).sort();
  }, [armorData]);

  // Filter sets based on search and attribute filter
  const filteredSets = useMemo(() => {
    const sets = Object.keys(armorData[selectedClass] || {});

    return sets.filter((setName) => {
      const setData = armorData[selectedClass]?.[setName];
      if (!setData) return false;

      // Search filter - only by set name
      const matchesSearch = setName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      // Attribute filter
      const matchesAttribute =
        filterAttribute === "all" ||
        Object.values(setData).some((pieceData: any) =>
          pieceData.attributes.some((attr: string) =>
            attr.toLowerCase().includes(filterAttribute.toLowerCase())
          )
        );

      return matchesSearch && matchesAttribute;
    });
  }, [selectedClass, searchTerm, filterAttribute, armorData]);

  const handleSetClick = (setName: string) => {
    setSelectedSet(selectedSet === setName ? null : setName);
  };

  const handleOwnershipChange = (
    setName: string,
    piece: string,
    owned: boolean
  ) => {
    setArmorData((prevData) => {
      const newData = JSON.parse(JSON.stringify(prevData));
      newData[selectedClass][setName][piece].owned = owned;
      if (!owned) {
        newData[selectedClass][setName][piece].hero = null;
      }
      return newData;
    });
  };

  const handleHeroChange = (setName: string, piece: string, hero: string) => {
    setArmorData((prevData) => {
      const newData = JSON.parse(JSON.stringify(prevData));
      newData[selectedClass][setName][piece].hero = hero;
      return newData;
    });
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  const exportData = () => {
    const dataStr = JSON.stringify(armorData, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "armor-data.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  const resetData = () => {
    if (
      confirm("Are you sure you want to reset all data? This cannot be undone.")
    ) {
      setArmorData(initialArmorData);
      localStorage.removeItem("armorData");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Armor Sets Viewer
          </h1>
          <p className="text-purple-300">
            Select a class and explore armor sets
          </p>
          <div className="mt-4 flex justify-center gap-3">
            <button
              onClick={exportData}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm">
              Export Data
            </button>
            <button
              onClick={resetData}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm">
              Reset Data
            </button>
          </div>
        </div>

        {/* Controls Container */}
        <div className="mb-8 space-y-4">
          {/* Class Dropdown */}
          <div className="max-w-md mx-auto">
            <label className="block text-white mb-2 font-semibold">
              Select Class
            </label>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg flex items-center justify-between hover:bg-gray-700 transition-colors border border-purple-500">
                <span className="font-medium">{selectedClass}</span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute w-full mt-2 bg-slate-800 border border-purple-500 rounded-lg shadow-xl z-10">
                  {classes.map((cls) => (
                    <button
                      key={cls}
                      onClick={() => {
                        setSelectedClass(cls);
                        setSelectedSet(null);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 hover:bg-slate-700 transition-colors ${
                        cls === selectedClass
                          ? "bg-gray-900 text-white"
                          : "text-gray-200"
                      } ${cls === classes[0] ? "rounded-t-lg" : ""} ${
                        cls === classes[classes.length - 1]
                          ? "rounded-b-lg"
                          : ""
                      }`}>
                      {cls}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Search and Filter */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {/* Search Box */}
            <div>
              <label className="block text-white mb-2 font-semibold">
                Search Sets
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by set name..."
                  className="w-full bg-gray-800 text-white pl-10 pr-10 py-3 rounded-lg border border-purple-500 focus:outline-none focus:border-purple-400 transition-colors"
                />
                {searchTerm && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Attribute Filter */}
            <div>
              <label className="block text-white mb-2 font-semibold">
                Filter by Attribute
              </label>
              <select
                value={filterAttribute}
                onChange={(e) => setFilterAttribute(e.target.value)}
                className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-purple-500 focus:outline-none focus:border-purple-400 transition-colors cursor-pointer">
                <option value="all">All Attributes</option>
                {allAttributes.map((attr) => (
                  <option key={attr} value={attr}>
                    {attr}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              Showing {filteredSets.length} of{" "}
              {Object.keys(armorData[selectedClass] || {}).length} sets
            </p>
          </div>
        </div>

        {/* Armor Sets Grid */}
        {filteredSets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSets.map((setName) => {
              const setData = armorData[selectedClass]?.[setName];
              const isSelected = selectedSet === setName;

              if (!setData) return null;

              return (
                <div
                  key={setName}
                  className={`bg-slate-800 rounded-lg p-5 transition-all duration-300 border-2 ${
                    isSelected
                      ? "border-purple-500 shadow-lg shadow-purple-500/50"
                      : "border-slate-700 hover:border-purple-400"
                  }`}>
                  <h3
                    onClick={() => handleSetClick(setName)}
                    className="text-xl font-bold text-white mb-4 flex items-center justify-between cursor-pointer">
                    {setName}
                    {isSelected && (
                      <span className="text-purple-400 text-sm">Selected</span>
                    )}
                  </h3>

                  {isSelected && (
                    <div className="space-y-3 animate-fadeIn">
                      {Object.entries(setData).map(
                        ([piece, pieceData]: [string, any]) => (
                          <div key={piece} className="bg-slate-900 rounded p-3">
                            {/* Piece Header with Checkbox */}
                            <div className="flex items-center justify-between mb-2">
                              <div className="font-semibold text-purple-300">
                                {piece}
                              </div>
                              <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={pieceData.owned}
                                  onChange={(e) =>
                                    handleOwnershipChange(
                                      setName,
                                      piece,
                                      e.target.checked
                                    )
                                  }
                                  className="w-4 h-4 rounded border-gray-600 text-purple-600 focus:ring-purple-500 focus:ring-offset-0 bg-gray-700 cursor-pointer"
                                />
                                <span className="text-sm text-gray-400">
                                  Owned
                                </span>
                              </label>
                            </div>

                            {/* Hero Input */}
                            {pieceData.owned && (
                              <div className="mb-2">
                                <input
                                  type="text"
                                  value={pieceData.hero || ""}
                                  onChange={(e) =>
                                    handleHeroChange(
                                      setName,
                                      piece,
                                      e.target.value
                                    )
                                  }
                                  placeholder="Enter hero name..."
                                  className="w-full bg-slate-800 text-white px-3 py-2 rounded border border-purple-500 focus:outline-none focus:border-purple-400 text-sm"
                                />
                              </div>
                            )}

                            {/* Attributes */}
                            <div className="space-y-1">
                              {pieceData.attributes.map(
                                (attr: string, idx: number) => (
                                  <div
                                    key={idx}
                                    className={`text-sm px-2 py-1 rounded ${
                                      attr === "None"
                                        ? "text-gray-500 italic"
                                        : "text-gray-200 bg-slate-800"
                                    }`}>
                                    {attr === "None"
                                      ? "No attributes"
                                      : `• ${attr}`}
                                  </div>
                                )
                              )}
                            </div>

                            {/* Hero Badge */}
                            {pieceData.hero && (
                              <div className="mt-2 inline-flex items-center gap-1 bg-purple-600 text-white px-2 py-1 rounded text-xs">
                                <Check className="w-3 h-3" />
                                {pieceData.hero}
                              </div>
                            )}
                          </div>
                        )
                      )}
                    </div>
                  )}

                  {!isSelected && (
                    <p className="text-gray-400 text-sm">
                      Click to view details
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              No armor sets match your search criteria
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setFilterAttribute("all");
              }}
              className="mt-4 px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
              Clear Filters
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
