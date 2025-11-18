type ArmorPiece = { [key: string]: string[] };
type ArmorSet = { [setName: string]: ArmorPiece };
type ArmorData = { [className: string]: ArmorSet };

type NewArmorPiece = {
  options: string[];
  collected: boolean;
  collectedPlace: string | null;
};

type NewArmorSet = {
  [pieceName: string]: NewArmorPiece;
};

type NewArmorData = {
  [className: string]: {
    [setName: string]: NewArmorSet;
  };
};

export function transformArmorData(data: ArmorData): NewArmorData {
  const result: NewArmorData = {};

  for (const className in data) {
    result[className] = {};

    for (const setName in data[className]) {
      const set = data[className][setName];
      result[className][setName] = {};

      for (const pieceName in set) {
        result[className][setName][pieceName] = {
          options: set[pieceName],
          collected: false,
          collectedPlace: null,
        };
      }
    }
  }

  return result;
}
