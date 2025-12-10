"use client";
import React, { useEffect, useState } from "react";
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

const CollectionTracker: React.FC = () => {
  const [data, setData] = useState<CollectionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedHero, setSelectedHero] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [collectedSet, setCollectedSet] = useState<{ [key: string]: boolean }>(
    {}
  );

  const [optionsFilter, setOptionsFilter] = useState("All");
  const [hideCollected, setHideCollected] = useState(true);

  const [overviewExpanded, setOverviewExpanded] = useState(true);
  const [filtersExpanded, setFiltersExpanded] = useState(true);

  const [pieceTypeFilter, setPieceTypeFilter] = useState("All");
  const [collectedStatusFilter, setCollectedStatusFilter] = useState<string[]>(
    []
  );

  // NEW: Hide special sets checkbox
  const [hideSpecialSets, setHideSpecialSets] = useState(false);

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

    // hero filter
    filteredData =
      selectedHero === "All"
        ? { ...data }
        : { [selectedHero]: data[selectedHero] };

    // search filter
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      const searchFiltered: CollectionData = {};

      Object.entries(filteredData).forEach(([heroClass, sets]) => {
        const matchingSets: HeroData = {};

        Object.entries(sets).forEach(([setName, pieces]) => {
          if (setName.toLowerCase().includes(query)) {
            matchingSets[setName] = pieces;
          } else {
            const matchedPieces: SetData = {};
            Object.entries(pieces).forEach(([pieceName, pieceData]) => {
              if (pieceName.toLowerCase().includes(query)) {
                matchedPieces[pieceName] = pieceData;
              }
            });

            if (Object.keys(matchedPieces).length > 0) {
              matchingSets[setName] = matchedPieces;
            }
          }
        });

        if (Object.keys(matchingSets).length > 0) {
          searchFiltered[heroClass] = matchingSets;
        }
      });

      filteredData = searchFiltered;
    }

    // hide collected
    if (hideCollected) {
      const uncollectedFiltered: CollectionData = {};

      Object.entries(filteredData).forEach(([heroClass, sets]) => {
        const matchingSets: HeroData = {};

        Object.entries(sets).forEach(([setName, pieces]) => {
          const filteredPieces: SetData = {};
          Object.entries(pieces).forEach(([pieceName, pieceData]) => {
            if (!pieceData.collected) filteredPieces[pieceName] = pieceData;
          });

          if (Object.keys(filteredPieces).length > 0) {
            matchingSets[setName] = filteredPieces;
          }
        });

        if (Object.keys(matchingSets).length > 0) {
          uncollectedFiltered[heroClass] = matchingSets;
        }
      });

      filteredData = uncollectedFiltered;
    }

    // NEW: hide special sets
    if (hideSpecialSets) {
      const banned = ["manticore", "brilliant", "apocalypse", "lightning"];
      const filteredBySetName: CollectionData = {};

      Object.entries(filteredData).forEach(([heroClass, sets]) => {
        const allowedSets: HeroData = {};

        Object.entries(sets).forEach(([setName, pieces]) => {
          const lower = setName.toLowerCase();
          const isBlocked = banned.some((b) => lower.includes(b));
          if (!isBlocked) allowedSets[setName] = pieces;
        });

        if (Object.keys(allowedSets).length > 0) {
          filteredBySetName[heroClass] = allowedSets;
        }
      });

      filteredData = filteredBySetName;
    }

    return filteredData;
  };

  if (loading) {
    return <div className="text-white text-center p-8">Loading...</div>;
  }

  const filteredData = getFilteredData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="bg-slate-900/80 rounded-xl border border-purple-500/30 p-6">
          <h3 className="text-xl font-bold text-purple-300 mb-4">Filters</h3>

          {/* NEW checkbox */}
          <div className="flex items-center gap-2 mb-3">
            <input
              type="checkbox"
              className="w-4 h-4"
              checked={hideSpecialSets}
              onChange={() => setHideSpecialSets(!hideSpecialSets)}
            />
            <label className="text-slate-300">
              Hide Manticore / Brilliant / Apocalypse / Lightning
            </label>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-purple-500/30 rounded-lg text-white"
            />
          </div>
        </div>

        {/* Results */}
        {Object.keys(filteredData).length === 0 ? (
          <div className="text-center text-white py-8">
            No results match your filters.
          </div>
        ) : (
          Object.entries(filteredData).map(([heroClass, sets]) => (
            <div
              key={heroClass}
              className="bg-slate-800/50 border border-purple-500/30 p-6 rounded-xl">
              <h2 className="text-3xl font-bold text-purple-300 mb-6">
                {heroClass}
              </h2>

              {Object.entries(sets).map(([setName, pieces]) => (
                <div
                  key={setName}
                  className="mb-8 bg-slate-900/60 p-4 rounded-xl">
                  <h3 className="text-xl text-white mb-2">{setName}</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(pieces).map(([pieceName, pieceData]) => (
                      <div
                        key={pieceName}
                        className={`p-4 rounded-lg border ${
                          pieceData.collected
                            ? "border-green-400 bg-green-900/20"
                            : "border-slate-600 bg-slate-800/40"
                        }`}>
                        <div className="flex items-center justify-between">
                          <div className="text-white font-semibold">
                            {pieceName}
                          </div>

                          <button
                            onClick={() =>
                              toggleCollected(heroClass, setName, pieceName)
                            }
                            className={`p-1 rounded ${
                              pieceData.collected
                                ? "bg-green-600"
                                : "bg-slate-600"
                            }`}>
                            {pieceData.collected ? (
                              <Check className="w-5 h-5 text-white" />
                            ) : (
                              <X className="w-5 h-5 text-white" />
                            )}
                          </button>
                        </div>

                        {/* Options */}
                        <ul className="text-slate-400 text-sm mt-3">
                          {pieceData.options.map((opt, i) => (
                            <li key={i}>• {opt}</li>
                          ))}
                        </ul>

                        {/* Collected place */}
                        {pieceData.collected && (
                          <input
                            type="text"
                            value={pieceData.collectedPlace ?? ""}
                            onChange={(e) =>
                              updateCollectedPlace(
                                heroClass,
                                setName,
                                pieceName,
                                e.target.value
                              )
                            }
                            placeholder="Collected in..."
                            className="mt-3 w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded text-white text-sm"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CollectionTracker;
