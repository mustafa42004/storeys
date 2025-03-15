const propertyTypes = [
  // Residential Properties
  {
    category: "Residential",
    types: [
      "Apartment",
      "Penthouse",
      "Villa",
      "Townhouse",
      "Duplex",
      "Triplex",
      "Studio",
      "Loft",
      "Mansion",
      "Bungalow",
      "Chalet",
      "Compound Villa",
      "Semi-Detached Villa",
      "Independent Villa",
      "Podium Villa",
      "Garden Home",
      "Pool Villa",
    ],
  },

  // Commercial Properties
  {
    category: "Commercial",
    types: [
      "Office",
      "Retail",
      "Shop",
      "Mall",
      "Showroom",
      "Restaurant",
      "Café",
      "Gym",
      "Spa",
      "Salon",
      "Clinic",
      "Hotel",
      "Hotel Apartment",
      "Commercial Building",
      "Business Center",
      "Commercial Villa",
      "Mixed-Use Building",
      "Commercial Floor",
    ],
  },

  // Industrial Properties
  {
    category: "Industrial",
    types: [
      "Warehouse",
      "Factory",
      "Workshop",
      "Industrial Land",
      "Labor Camp",
      "Staff Accommodation",
      "Storage Facility",
      "Distribution Center",
      "Cold Storage",
      "Industrial Unit",
    ],
  },

  // Land
  {
    category: "Land",
    types: [
      "Residential Plot",
      "Commercial Plot",
      "Mixed-Use Plot",
      "Agricultural Land",
      "Industrial Plot",
      "Waterfront Land",
      "Island",
      "Development Land",
      "G+1 Plot",
      "G+2 Plot",
      "G+4 Plot",
      "G+Unlimited Plot",
    ],
  },

  // Special Properties
  {
    category: "Special Purpose",
    types: [
      "School",
      "Hospital",
      "Medical Center",
      "Educational Building",
      "Religious Building",
      "Petrol Station",
      "Car Park",
      "Sport Facility",
      "Exhibition Center",
      "Farm",
      "Yacht/Marina Berth",
      "Entertainment Venue",
    ],
  },
];

// Flat array of all property types for simple dropdown usage
const flatPropertyTypes = propertyTypes
  .reduce((acc, category) => {
    return [...acc, ...category.types];
  }, [])
  .sort();

const propertyCategories = propertyTypes
  .map((type) => type.category)
  .sort((a, b) => a.localeCompare(b));

export { propertyTypes, flatPropertyTypes, propertyCategories };
