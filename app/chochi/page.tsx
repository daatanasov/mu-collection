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
  const [selectedHero, setSelectedHero] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [collectedSet, setCollectedSet] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [optionsFilter, setOptionsFilter] = useState("All");
  const [hideCollected, setHideCollected] = useState(false);
  const [overviewExpanded, setOverviewExpanded] = useState(false);
  const [filtersExpanded, setFiltersExpanded] = useState(true);

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

  const getOverallCompletion = () => {
    if (!data) return { total: 0, collected: 0, percent: 0 };

    let totalPieces = 0;
    let collectedPieces = 0;

    Object.values(data).forEach((heroSets) => {
      Object.values(heroSets).forEach((setData) => {
        const pieces = Object.values(setData);
        totalPieces += pieces.length;
        collectedPieces += pieces.filter((p) => p.collected).length;
      });
    });

    return {
      total: totalPieces,
      collected: collectedPieces,
      percent:
        totalPieces > 0 ? Math.round((collectedPieces / totalPieces) * 100) : 0,
    };
  };

  const completionGroups: Record<string, string[]> = getAllSetCompletion();

  const fetchData = async () => {
    try {
      const response = await fetch("/api/collection-chochi");
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

  const handleSetClick = (labeledName: string) => {
    const setNameWithoutSuffix = labeledName.split("-").slice(0, -1).join("-");
    setSearchQuery(setNameWithoutSuffix);
    setOverviewExpanded(false);
  };

  const getFilteredData = (): CollectionData => {
    if (!data) return {};

    let filteredData: CollectionData = {};

    if (selectedHero === "All") {
      filteredData = { ...data };
    } else {
      filteredData = { [selectedHero]: data[selectedHero] };
    }

    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      const searchFiltered: CollectionData = {};

      Object.entries(filteredData).forEach(([heroClass, sets]) => {
        const matchingSets: HeroData = {};

        Object.entries(sets).forEach(([setName, pieces]) => {
          if (setName.toLowerCase().includes(query)) {
            matchingSets[setName] = pieces;
          } else {
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

      filteredData = searchFiltered;
    }

    // Apply options filter
    if (optionsFilter !== "All") {
      const optionsFiltered: CollectionData = {};

      Object.entries(filteredData).forEach(([heroClass, sets]) => {
        const matchingSets: HeroData = {};

        Object.entries(sets).forEach(([setName, pieces]) => {
          const matchingPieces: SetData = {};

          Object.entries(pieces).forEach(([pieceName, pieceData]) => {
            const optionCount =
              pieceData.options.length === 1 && pieceData.options[0] === "None"
                ? 0
                : pieceData.options.length;

            let matches = false;
            if (optionsFilter === "0" && optionCount === 0) matches = true;
            if (optionsFilter === "2" && optionCount === 2) matches = true;
            if (optionsFilter === "3" && optionCount === 3) matches = true;

            if (matches) {
              matchingPieces[pieceName] = pieceData;
            }
          });

          if (Object.keys(matchingPieces).length > 0) {
            matchingSets[setName] = matchingPieces;
          }
        });

        if (Object.keys(matchingSets).length > 0) {
          optionsFiltered[heroClass] = matchingSets;
        }
      });

      filteredData = optionsFiltered;
    }

    // Apply hide collected filter
    if (hideCollected) {
      const uncollectedFiltered: CollectionData = {};

      Object.entries(filteredData).forEach(([heroClass, sets]) => {
        const matchingSets: HeroData = {};

        Object.entries(sets).forEach(([setName, pieces]) => {
          const matchingPieces: SetData = {};

          Object.entries(pieces).forEach(([pieceName, pieceData]) => {
            if (!pieceData.collected) {
              matchingPieces[pieceName] = pieceData;
            }
          });

          if (Object.keys(matchingPieces).length > 0) {
            matchingSets[setName] = matchingPieces;
          }
        });

        if (Object.keys(matchingSets).length > 0) {
          uncollectedFiltered[heroClass] = matchingSets;
        }
      });

      filteredData = uncollectedFiltered;
    }

    return filteredData;
  };

  if (loading) {
    return <div className="text-white text-center p-8">Loading...</div>;
  }

  const filteredData = getFilteredData();
  const heroClasses = data ? ["All", ...Object.keys(data)] : ["All"];
  const overallCompletion = getOverallCompletion();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 mb-8">
          🎮 Item Collection Tracker
        </h1>

        {/* Sticky Filters Section */}
        {/* <div className="sticky top-4 z-10 space-y-4 bg-slate-900/80 backdrop-blur-md p-6 rounded-xl border border-purple-500/30 shadow-xl"> */}
        {/* Overall Completion */}
        <div className="sticky top-4 z-10 bg-slate-900/80 backdrop-blur-md rounded-xl border border-purple-500/30 shadow-xl">
          <button
            onClick={() => setFiltersExpanded(!filtersExpanded)}
            className="w-full flex items-center justify-between text-left p-6">
            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              🎛️ Filters & Search
            </h3>
            <span className="text-slate-400 text-2xl font-bold">
              {filtersExpanded ? "−" : "+"}
            </span>
          </button>

          {filtersExpanded && (
            <div className="px-6 pb-6 space-y-4 border-t border-slate-600">
              <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg p-4 border border-purple-500/30">
                <div className="text-sm font-medium text-slate-300 mb-2">
                  Overall Collection Progress
                </div>
                <div className="relative h-8 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500 flex items-center justify-center"
                    style={{ width: `${overallCompletion.percent}%` }}>
                    {overallCompletion.percent > 10 && (
                      <span className="text-xs font-bold text-white">
                        {overallCompletion.percent}%
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-sm text-slate-400 mt-2 text-center">
                  {overallCompletion.collected} / {overallCompletion.total}{" "}
                  items
                </div>
              </div>

              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Hero Class Dropdown */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Hero Class
                  </label>
                  <select
                    value={selectedHero}
                    onChange={(e) => setSelectedHero(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-800/90 backdrop-blur-sm border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20">
                    {heroClasses.map((hero) => (
                      <option key={hero} value={hero}>
                        {hero}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Options Filter */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Options Count
                  </label>
                  <select
                    value={optionsFilter}
                    onChange={(e) => setOptionsFilter(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-800/90 backdrop-blur-sm border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20">
                    <option value="All">All</option>
                    <option value="0">0 Options (None)</option>
                    <option value="2">2 Options</option>
                    <option value="3">3 Options</option>
                  </select>
                </div>

                {/* Hide Collected Toggle */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Display Options
                  </label>
                  <button
                    onClick={() => setHideCollected(!hideCollected)}
                    className={`w-full px-4 py-3 rounded-lg font-medium transition-all ${
                      hideCollected
                        ? "bg-purple-600 hover:bg-purple-700 text-white"
                        : "bg-slate-800/90 hover:bg-slate-700 border border-purple-500/30 text-white"
                    }`}>
                    {hideCollected ? "✓ Hiding Collected" : "Show All Items"}
                  </button>
                </div>
              </div>

              {/* Set Completion Overview - Collapsible */}
              <div className="bg-gradient-to-r from-slate-800/95 to-slate-700/95 backdrop-blur-sm rounded-xl border border-purple-500/30 shadow-lg hover:shadow-purple-500/20 transition-all">
                <button
                  onClick={() => setOverviewExpanded(!overviewExpanded)}
                  className="w-full flex items-center justify-between text-left p-6">
                  <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                    📊 Set Completion Overview
                  </h3>
                  <span className="text-slate-400 text-2xl font-bold">
                    {overviewExpanded ? "−" : "+"}
                  </span>
                </button>

                {overviewExpanded && (
                  <div className="px-6 pb-6 pt-2 border-t border-slate-600">
                    {Object.keys(completionGroups)
                      .sort((a, b) => Number(b) - Number(a))
                      .map((percent: string) => (
                        <div key={percent} className="mb-4">
                          <div className="text-slate-300 font-semibold mb-2">
                            {percent}% Complete:
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {completionGroups[String(percent)].map(
                              (name: string, index: number) => (
                                <button
                                  key={index}
                                  onClick={() => handleSetClick(name)}
                                  className="px-3 py-1.5 bg-slate-700 hover:bg-purple-600 text-white text-sm rounded cursor-pointer transition-all hover:scale-105 active:scale-95">
                                  {name}
                                </button>
                              )
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>

              {/* Search Input */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  🔍 Search Collection
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by set or piece name..."
                    className="w-full pl-10 pr-4 py-3 bg-slate-800/90 backdrop-blur-sm border border-purple-500/30 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        {Object.keys(filteredData).length === 0 ? (
          <div className="text-center py-16 bg-slate-800/50 rounded-xl border border-purple-500/30">
            <div className="text-4xl mb-4">🔍</div>
            <div className="text-xl text-slate-300 font-semibold mb-2">
              No results found
            </div>
            <div className="text-slate-400">
              Try adjusting your filters or search query
            </div>
          </div>
        ) : (
          <>
            {Object.entries(filteredData).map(([heroClass, sets]) => (
              <div
                key={heroClass}
                className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-sm rounded-xl border border-purple-500/30 p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
                  {heroClass}
                </h2>

                {Object.entries(sets).map(([setName, pieces]) => (
                  <div
                    key={setName}
                    className="mb-6 bg-slate-900/50 rounded-lg p-4 border border-slate-600">
                    {(() => {
                      const { total, collected, percent } =
                        getSetCompletion(pieces);
                      return (
                        <div className="mb-4">
                          <h3 className="text-xl font-semibold text-purple-300 mb-2">
                            {setName}
                          </h3>
                          <div className="text-sm text-slate-400">
                            {collected}/{total} collected ({percent}%)
                          </div>
                        </div>
                      );
                    })()}

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {Object.entries(pieces).map(([pieceName, pieceData]) => (
                        <div
                          key={pieceName}
                          className={`p-3 rounded-lg border transition-all ${
                            pieceData.collected
                              ? "bg-green-900/20 border-green-500/30"
                              : "bg-slate-800/50 border-slate-600"
                          }`}>
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold text-white">
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

                          <div className="text-sm text-slate-300 mb-2">
                            <strong>Options:</strong>
                          </div>
                          <ul className="text-sm text-slate-400 space-y-1">
                            {pieceData.options.map((option, idx) => (
                              <li key={idx}>• {option}</li>
                            ))}
                          </ul>

                          {pieceData.collected && (
                            <div className="mt-3">
                              <label className="block text-sm text-slate-300 mb-1">
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
