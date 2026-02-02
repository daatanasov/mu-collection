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

interface CollectionData {
  [setName: string]: SetData;
}

const CollectionTracker: React.FC = () => {
  const [data, setData] = useState<CollectionData | null>(null);
  const [loading, setLoading] = useState(true);
  const setCount = data ? Object.keys(data).length : 0;
  const [searchQuery, setSearchQuery] = useState("");
  const [hideCollected, setHideCollected] = useState(true);

  // NEW: Hide special sets checkbox
  const [hideSpecialSets, setHideSpecialSets] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/pp");
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
    };

    setData(initialData);
    saveData(initialData);
  };

  const saveData = async (updatedData: CollectionData) => {
    try {
      await fetch("/api/pp", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const toggleCollected = (setName: string, piece: string) => {
    if (!data) return;

    const newData: CollectionData = { ...data };
    const item = newData[setName][piece];

    item.collected = !item.collected;
    if (!item.collected) item.collectedPlace = null;

    setData(newData);
    saveData(newData);
  };

  const updateCollectedPlace = (
    setName: string,
    piece: string,
    place: string,
  ) => {
    if (!data) return;

    const newData: CollectionData = { ...data };
    newData[setName][piece].collectedPlace = place;

    setData(newData);
    saveData(newData);
  };

  const getFilteredData = (): CollectionData => {
    if (!data) return {};

    let filteredData = { ...data };

    // search filter
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      const searchFiltered: CollectionData = {};

      Object.entries(filteredData).forEach(([setName, pieces]) => {
        const matchesSet = setName.toLowerCase().includes(q);
        const matchedPieces: SetData = {};

        Object.entries(pieces).forEach(([pieceName, piece]) => {
          if (pieceName.toLowerCase().includes(q)) {
            matchedPieces[pieceName] = piece;
          }
        });

        if (matchesSet || Object.keys(matchedPieces).length > 0) {
          searchFiltered[setName] = matchesSet ? pieces : matchedPieces;
        }
      });

      filteredData = searchFiltered;
    }

    // hide collected
    if (hideCollected) {
      const result: CollectionData = {};

      Object.entries(filteredData).forEach(([setName, pieces]) => {
        const newPieces: SetData = {};

        Object.entries(pieces).forEach(([pieceName, piece]) => {
          if (!piece.collected) newPieces[pieceName] = piece;
        });

        if (Object.keys(newPieces).length > 0) {
          result[setName] = newPieces;
        }
      });

      filteredData = result;
    }

    // hide special sets
    if (hideSpecialSets) {
      const banned = ["manticore", "brilliant", "apocalypse", "lightning"];
      const result: CollectionData = {};

      Object.entries(filteredData).forEach(([setName, pieces]) => {
        const isBlocked = banned.some((b) => setName.toLowerCase().includes(b));
        if (!isBlocked) result[setName] = pieces;
      });

      filteredData = result;
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

          {/* Hide special sets */}
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
            <label className="text-slate-300">{setCount}</label>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search sets or pieces..."
              className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-purple-500/30 rounded-lg text-white"
            />
          </div>

          {/* Hide collected */}
          <div className="flex items-center gap-2 mt-3">
            <input
              type="checkbox"
              className="w-4 h-4"
              checked={hideCollected}
              onChange={() => setHideCollected(!hideCollected)}
            />
            <label className="text-slate-300">Hide collected items</label>
          </div>
        </div>

        {/* Results */}
        {Object.keys(filteredData).length === 0 ? (
          <div className="text-center text-white py-8">
            No results match your filters.
          </div>
        ) : (
          Object.entries(filteredData).map(([setName, pieces]) => (
            <div
              key={setName}
              className="bg-slate-800/50 border border-purple-500/30 p-6 rounded-xl">
              <h2 className="text-3xl font-bold text-purple-300 mb-6">
                {setName}
              </h2>

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
                        onClick={() => toggleCollected(setName, pieceName)}
                        className={`p-1 rounded ${
                          pieceData.collected ? "bg-green-600" : "bg-slate-600"
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
                            setName,
                            pieceName,
                            e.target.value,
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
          ))
        )}
      </div>
    </div>
  );
};

export default CollectionTracker;
