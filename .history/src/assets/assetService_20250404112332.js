let assets = [
  {
    id: 1,
    name: "Xe",
    purchaseDate: "2025-01-01",
    value: 10000000,
    description: "Mô tả tài sản 1",
    image: "../../public/images/car.jpg",
    notes: "",
  },
  {
    id: 2,
    name: "Đồng Hồ",
    purchaseDate: "2025-02-01",
    value: 20000000,
    description: "Mô tả tài sản 2",
    image: "../../public/images/",
    notes: "",
  },
];

export const fetchAssets = async () => {
  return assets;
};

export const fetchAssetById = async (id) => {
  return assets.find((asset) => asset.id === parseInt(id));
};

export const addAsset = async (asset) => {
  const newAsset = { ...asset, id: assets.length + 1 };
  assets.push(newAsset);
};

export const updateAsset = async (id, updatedAsset) => {
  const index = assets.findIndex((asset) => asset.id === parseInt(id));
  if (index !== -1) {
    assets[index] = { ...assets[index], ...updatedAsset };
  }
};

export const deleteAsset = async (id) => {
  assets = assets.filter((asset) => asset.id !== parseInt(id));
};
