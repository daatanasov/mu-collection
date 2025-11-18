"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { armorData } from "./const";

export default function ArmorSetsViewer() {
  const [selectedClass, setSelectedClass] = useState("Blade Knight");
  const [selectedSet, setSelectedSet] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const classes = Object.keys(armorData);
  const sets = Object.keys(armorData[selectedClass] || {});

  const handleSetClick = (setName: string) => {
    setSelectedSet(selectedSet);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black-900 via-grey-900 to-slate-900 p-6">
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

        {/* Class Dropdown */}
        <div className="mb-8 max-w-md mx-auto">
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
                      cls === classes[classes.length - 1] ? "rounded-b-lg" : ""
                    }`}>
                    {cls}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Armor Sets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sets.map((setName) => {
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
                  <p className="text-gray-400 text-sm">Click to view details</p>
                )}
              </div>
            );
          })}
        </div>
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
