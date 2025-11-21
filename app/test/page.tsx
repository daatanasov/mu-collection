"use client";
import React, { useState, useEffect } from "react";
import { Check, X, Search } from "lucide-react";

interface PieceData {
  options: string[];
  collected: boolean;
  collectedPlace: string | null;
}

interface SetData {
  [pieceName: string]: PieceData;
}

interface HeroData {
  [setName: string]: SetData;
}

interface CollectionData {
  [heroClass: string]: HeroData;
}
const heroSuffixMap: Record<string, string> = {
  "Blade Knight": "bk",
  "Blade Master": "bm",
  "Dark Wizard": "dw",
  "Soul Master": "sm",
  "Grand Master": "gm",
  "Magic Gladiator": "mg",
  "Dark Knight": "dk",
  "Fairy Elf": "fe",
  "Muse Elf": "me",
  Elf: "elf",
  Summoner: "sum",
  "Rage Fighter": "rf",
  "Grow Lancer": "gl",
  "Dark Lord": "dl",
  "Wizard Soul Master": "dw",
  // add more as needed
};

const isSetFullyCollected = (setData: SetData, setName: string) => {
  const isCollected = Object.values(setData).every(
    (piece) => piece.collected === true
  );
  return isCollected;
};

const getSetCompletion = (setData: SetData) => {
  const pieces = Object.values(setData);
  const total = pieces.length;
  const collected = pieces.filter((piece) => piece.collected).length;

  return {
    total,
    collected,
    percent: Math.round((collected / total) * 100),
  };
};

const CollectionTracker = () => {
  const [data, setData] = useState<CollectionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedHero, setSelectedHero] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [collectedSet, setCollectedSet] = useState<{ [key: string]: boolean }>(
    {}
  );

  useEffect(() => {
    if (!data) return;

    const newCollected: { [key: string]: boolean } = {};

    Object.values(data).forEach((heroSets) => {
      Object.entries(heroSets).forEach(([setName, pieces]) => {
        const isCollected = Object.values(pieces).every(
          (piece) => piece.collected === true
        );
        if (isCollected) newCollected[setName] = true;
      });
    });

    setCollectedSet(newCollected);
  }, [data]);

  const getAllSetCompletion = () => {
    if (!data) return {};

    const result: { [percent: number]: string[] } = {};

    Object.entries(data).forEach(([heroClass, heroSets]) => {
      Object.entries(heroSets).forEach(([setName, setData]) => {
        const pieces = Object.values(setData);
        const total = pieces.length;
        const collected = pieces.filter((p) => p.collected).length;
        const percent = Math.round((collected / total) * 100);

        const suffix = heroSuffixMap[heroClass] ?? "";
        const labeledName = `${setName}-${suffix}`;

        if (!result[percent]) result[percent] = [];
        result[percent].push(labeledName);
      });
    });

    return result;
  };
  const completionGroups: Record<string, string[]> = getAllSetCompletion();

  const fetchData = async () => {
    try {
      const response = await fetch("/api/collection");
      if (response.ok) {
        const jsonData: CollectionData = await response.json();
        setData(jsonData);
      } else {
        initializeData();
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      initializeData();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const initializeData = () => {
    const initialData: CollectionData = {
      "Blade Knight": {
        "Leather Set": {
          Helm: {
            options: ["Damage Decrease", "Increase Zen Drop Rate"],
            collected: false,
            collectedPlace: null,
          },
          Armor: {
            options: ["Defense Success Rate", "Increase Zen Drop Rate"],
            collected: false,
            collectedPlace: null,
          },
          Pants: {
            options: ["Increase Maximum SD", "Defense Success Rate"],
            collected: false,
            collectedPlace: null,
          },
          Gloves: {
            options: ["None"],
            collected: false,
            collectedPlace: null,
          },
          Boots: {
            options: ["None"],
            collected: false,
            collectedPlace: null,
          },
        },
        "Bronze Set": {
          Helm: {
            options: [
              "Damage Decrease",
              "Increase Maximum Life",
              "Increase Maximum SD",
            ],
            collected: false,
            collectedPlace: null,
          },
          Armor: {
            options: ["None"],
            collected: false,
            collectedPlace: null,
          },
          Pants: {
            options: ["Increase Maximum Life", "Damage Decrease"],
            collected: false,
            collectedPlace: null,
          },
          Gloves: {
            options: [
              "Increase Maximum Life",
              "Increase Maximum SD",
              "Defense Success Rate",
            ],
            collected: false,
            collectedPlace: null,
          },
          Boots: {
            options: ["None", "luck"],
            collected: false,
            collectedPlace: null,
          },
        },
      },
      "Magic Gladiator": {
        "Storm Crow Set": {
          Armor: {
            options: ["None"],
            collected: false,
            collectedPlace: null,
          },
          Pants: {
            options: ["Damage Decrease", "Increase Zen Drop Rate"],
            collected: false,
            collectedPlace: null,
          },
          Gloves: {
            options: ["Increase Maximum Life", "Reflect Damage"],
            collected: false,
            collectedPlace: null,
          },
          Boots: {
            options: ["Increase Maximum SD", "Increase Zen Drop Rate"],
            collected: false,
            collectedPlace: null,
          },
        },
        "Thunder Hawk Set": {
          Armor: {
            options: [
              "Increase Maximum Life",
              "Reflect Damage",
              "Defense Success Rate",
            ],
            collected: false,
            collectedPlace: null,
          },
          Pants: {
            options: [
              "Increase Maximum SD",
              "Defense Success Rate",
              "Increase Zen Drop Rate",
            ],
            collected: false,
            collectedPlace: null,
          },
          Gloves: {
            options: ["None"],
            collected: false,
            collectedPlace: null,
          },
          Boots: {
            options: ["Increase Maximum Life", "Reflect Damage"],
            collected: false,
            collectedPlace: null,
          },
        },
      },
    };
    setData(initialData);
    saveData(initialData);
  };

  const saveData = async (updatedData: CollectionData) => {
    try {
      await fetch("/api/collection", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const toggleCollected = (
    heroClass: string,
    setName: string,
    piece: string
  ) => {
    if (!data) return;

    const newData: CollectionData = { ...data };
    const item = newData[heroClass][setName][piece];
    item.collected = !item.collected;
    if (!item.collected) {
      item.collectedPlace = null;
    }
    setData(newData);
    saveData(newData);
  };

  const updateCollectedPlace = (
    heroClass: string,
    setName: string,
    piece: string,
    place: string
  ) => {
    if (!data) return;

    const newData: CollectionData = { ...data };
    newData[heroClass][setName][piece].collectedPlace = place;
    setData(newData);
    saveData(newData);
  };

  const getFilteredData = (): CollectionData => {
    if (!data) return {};

    let filteredData: CollectionData = {};

    // Filter by selected hero
    if (selectedHero === "All") {
      filteredData = { ...data };
    } else {
      filteredData = { [selectedHero]: data[selectedHero] };
    }

    // Filter by search query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      const searchFiltered: CollectionData = {};

      Object.entries(filteredData).forEach(([heroClass, sets]) => {
        const matchingSets: HeroData = {};

        Object.entries(sets).forEach(([setName, pieces]) => {
          // Check if set name matches
          if (setName.toLowerCase().includes(query)) {
            matchingSets[setName] = pieces;
          } else {
            // Check if any piece name matches
            const matchingPieces: SetData = {};
            Object.entries(pieces).forEach(([pieceName, pieceData]) => {
              if (pieceName.toLowerCase().includes(query)) {
                matchingPieces[pieceName] = pieceData;
              }
            });

            if (Object.keys(matchingPieces).length > 0) {
              matchingSets[setName] = matchingPieces;
            }
          }
        });

        if (Object.keys(matchingSets).length > 0) {
          searchFiltered[heroClass] = matchingSets;
        }
      });

      return searchFiltered;
    }

    return filteredData;
  };

  if (loading) {
    return <div className="p-8 text-center text-white">Loading...</div>;
  }

  const filteredData = getFilteredData();
  const heroClasses = data ? ["All", ...Object.keys(data)] : ["All"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          Item Collection Tracker
        </h1>
        <div className="mb-8 bg-slate-800/50 p-4 rounded-lg border border-purple-500/30">
          <h2 className="text-xl font-bold text-purple-300 mb-3">
            Set Completion Overview
          </h2>

          {Object.keys(completionGroups)
            .sort((a, b) => Number(b) - Number(a)) // Sort 100 → 0
            .map((percent: string) => (
              <div key={percent} className="mb-2">
                <span className="font-semibold text-white">{percent}%:</span>
                {completionGroups[String(percent)].map(
                  (name: string, index: number) => (
                    <span
                      key={`${percent}-${name}-${index}`}
                      className="inline-block ml-3 mb-3 px-2 py-1 bg-slate-700 text-white rounded">
                      {name}
                    </span>
                  )
                )}
              </div>
            ))}
        </div>
        {/* Filters */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          {/* Hero Class Dropdown */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-purple-200 mb-2">
              Hero Class
            </label>
            <select
              value={selectedHero}
              onChange={(e) => setSelectedHero(e.target.value)}
              className="w-full px-4 py-3 bg-slate-800 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20">
              {heroClasses.map((hero) => (
                <option key={hero} value={hero}>
                  {hero}
                </option>
              ))}
            </select>
          </div>

          {/* Search Input */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-purple-200 mb-2">
              Search Collection
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by set or piece name..."
                className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-purple-500/30 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
              />
            </div>
          </div>
        </div>

        {/* Results */}
        {Object.keys(filteredData).length === 0 ? (
          <div className="text-center text-slate-400 py-12">
            <p className="text-xl">No results found</p>
            <p className="text-sm mt-2">
              Try adjusting your filters or search query
            </p>
          </div>
        ) : (
          <>
            {Object.entries(filteredData).map(([heroClass, sets]) => (
              <div key={heroClass} className="mb-8">
                <h2 className="text-3xl font-bold text-purple-300 mb-4">
                  {heroClass}
                </h2>

                {Object.entries(sets).map(([setName, pieces]) => (
                  <div
                    key={setName}
                    className={`backdrop-blur rounded-lg p-6 mb-4 transition-all border
                    ${
                      isSetFullyCollected(pieces, setName)
                        ? "bg-green-900 border-green-500"
                        : "bg-slate-800/50 border-purple-500/30"
                    }`}>
                    {(() => {
                      const { total, collected, percent } =
                        getSetCompletion(pieces);

                      return (
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-2xl font-semibold text-purple-200">
                            {setName}
                          </h3>

                          <span className="text-sm text-white bg-slate-700 px-3 py-1 rounded-lg">
                            {collected}/{total} collected ({percent}%)
                          </span>
                        </div>
                      );
                    })()}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {Object.entries(pieces).map(([pieceName, pieceData]) => (
                        <div
                          key={pieceName}
                          className={`border rounded-lg p-4 transition-all ${
                            pieceData.collected
                              ? "bg-green-900/30 border-green-500"
                              : "bg-slate-700/50 border-slate-600"
                          }`}>
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="text-lg font-semibold text-white">
                              {pieceName}
                            </h4>
                            <button
                              onClick={() =>
                                toggleCollected(heroClass, setName, pieceName)
                              }
                              className={`p-1 rounded ${
                                pieceData.collected
                                  ? "bg-green-600 hover:bg-green-700"
                                  : "bg-slate-600 hover:bg-slate-500"
                              }`}>
                              {pieceData.collected ? (
                                <Check className="w-5 h-5 text-white" />
                              ) : (
                                <X className="w-5 h-5 text-white" />
                              )}
                            </button>
                          </div>

                          <div className="mb-3">
                            <p className="text-xs text-slate-400 mb-1">
                              Options:
                            </p>
                            <ul className="text-sm text-slate-300 space-y-1">
                              {pieceData.options.map((option, idx) => (
                                <li key={idx} className="text-xs">
                                  • {option}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {pieceData.collected && (
                            <div>
                              <label className="text-xs text-slate-400 block mb-1">
                                Collected in:
                              </label>
                              <input
                                type="text"
                                value={pieceData.collectedPlace || ""}
                                onChange={(e) =>
                                  updateCollectedPlace(
                                    heroClass,
                                    setName,
                                    pieceName,
                                    e.target.value
                                  )
                                }
                                placeholder="e.g., Hero 1, Warehouse..."
                                className="w-full px-3 py-2 bg-slate-900/50 border border-slate-600 rounded text-white text-sm focus:outline-none focus:border-purple-500"
                              />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default CollectionTracker;
