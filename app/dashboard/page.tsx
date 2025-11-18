"use client";

import React, { useState, useMemo } from "react";
import { ChevronDown, Search, X } from "lucide-react";
import { armorData } from "../const";

export default function ArmorSetsViewer() {
  const [selectedClass, setSelectedClass] = useState("Blade Knight");
  const [selectedSet, setSelectedSet] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterAttribute, setFilterAttribute] = useState<string>("all");

  const classes = Object.keys(armorData);

  // Get all unique attributes for filtering
  const allAttributes = useMemo(() => {
    const attrs = new Set<string>();
    Object.values(armorData).forEach((classData) => {
      Object.values(classData).forEach((setData) => {
        Object.values(setData).forEach((attributes: string[]) => {
          attributes.forEach((attr) => {
            if (attr !== "None") {
              // Extract attribute type (e.g., "Defense", "Strength", etc.)
              const attrType = attr.split(/[+\d]/)[0].trim();
              attrs.add(attrType);
            }
          });
        });
      });
    });
    return Array.from(attrs).sort();
  }, []);

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
        Object.values(setData).some((attrs: string[]) =>
          attrs.some((attr) =>
            attr.toLowerCase().includes(filterAttribute.toLowerCase())
          )
        );

      return matchesSearch && matchesAttribute;
    });
  }, [selectedClass, searchTerm, filterAttribute]);

  const handleSetClick = (setName: string) => {
    setSelectedSet(selectedSet === setName ? null : setName);
  };

  const clearSearch = () => {
    setSearchTerm("");
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
                  placeholder="Search by name or attributes..."
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
                  onClick={() => handleSetClick(setName)}
                  className={`bg-slate-800 rounded-lg p-5 cursor-pointer transition-all duration-300 border-2 ${
                    isSelected
                      ? "border-purple-500 shadow-lg shadow-purple-500/50 scale-105"
                      : "border-slate-700 hover:border-purple-400"
                  }`}>
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center justify-between">
                    {setName}
                    {isSelected && (
                      <span className="text-purple-400 text-sm">Selected</span>
                    )}
                  </h3>

                  {isSelected && (
                    <div className="space-y-3 animate-fadeIn">
                      {Object.entries(setData).map(
                        ([piece, attributes]: [string, string[]]) => (
                          <div key={piece} className="bg-slate-900 rounded p-3">
                            <div className="font-semibold text-purple-300 mb-2">
                              {piece}
                            </div>
                            <div className="space-y-1">
                              {attributes.map((attr: string, idx: number) => (
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
                              ))}
                            </div>
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
