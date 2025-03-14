import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Filters = ({ theme }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [classes, setClasses] = useState({
    sm: "",
    medium: "dark",
    theme: "",
    display: "",
    button: "",
    select: "",
  });

  const [formData, setFormData] = useState({
    location: "",
    bedrooms: "",
    type: "",
    minPrice: "",
    maxPrice: "",
  });

  useEffect(() => {
    if (theme === "dark") {
      setClasses({
        sm: "shade",
        medium: "light",
        theme: "dark",
        display: "block",
        button: "light",
        select: "dark",
      });
    } else {
      setClasses({
        sm: "",
        medium: "dark",
        theme: "",
        display: "",
        button: "",
        select: "",
      });
    }
  }, [theme]);

  // Initialize form data from URL params
  useEffect(() => {
    setFormData({
      location: searchParams.get("location") || "",
      bedrooms: searchParams.get("bedrooms") || "",
      type: searchParams.get("type") || "",
      minPrice: searchParams.get("minPrice") || "",
      maxPrice: searchParams.get("maxPrice") || "",
    });
  }, [searchParams]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    // Filter out empty values
    const params = new URLSearchParams();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });

    // Navigate to properties page with search params
    navigate(`/property?${params.toString()}`);
  };

  return (
    <>
      <div className={`filters ${classes.display} ${classes.theme}`}>
        <div className="item divide">
          <h4 className={`font-sm medium ${classes.medium}`}>Location</h4>
          <div className="dropdown">
            <input
              list="locations"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="Search Location"
              className={`font-sm fs-16 dropdown-select text-left ${classes.select}`}
            />
            <datalist id="locations">
              <option value="Downtown" />
              <option value="Suburbs" />
              <option value="West End" />
              <option value="East End" />
            </datalist>
          </div>
        </div>
        <div className="item divide">
          <h4 className={`font-sm medium ${classes.medium}`}>Bedrooms</h4>
          <div className="dropdown">
            <select
              name="bedrooms"
              value={formData.bedrooms}
              onChange={handleInputChange}
              className={`font-sm fs-16 dropdown-select text-left ${classes.select}`}
            >
              <option className="dropdown-option" value="">
                Select Bedrooms
              </option>
              <option className="dropdown-option" value="1">
                1 Bedroom
              </option>
              <option className="dropdown-option" value="2">
                2 Bedrooms
              </option>
              <option className="dropdown-option" value="3">
                3 Bedrooms
              </option>
              <option className="dropdown-option" value="4">
                4+ Bedrooms
              </option>
            </select>
          </div>
        </div>
        <div className="item divide">
          <h4 className={`font-sm medium ${classes.medium}`}>Types</h4>
          <div className="dropdown">
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className={`font-sm fs-16 dropdown-select text-left ${classes.select}`}
            >
              <option className="dropdown-option" value="">
                Select Types
              </option>
              <option className="dropdown-option" value="apartment">
                Apartment
              </option>
              <option className="dropdown-option" value="house">
                House
              </option>
              <option className="dropdown-option" value="condo">
                Condo
              </option>
              <option className="dropdown-option" value="villa">
                Villa
              </option>
            </select>
          </div>
        </div>
        <div className="item">
          <h4 className={`font-sm medium ${classes.medium}`}>Price Range</h4>
          <div className="price-range-inputs">
            <input
              type="number"
              name="minPrice"
              value={formData.minPrice}
              onChange={handleInputChange}
              placeholder="Min price"
              className={`font-sm fs-16 price-input price-range ${classes.sm}`}
            />
            <span className="separator">-</span>
            <input
              type="number"
              name="maxPrice"
              value={formData.maxPrice}
              onChange={handleInputChange}
              placeholder="Max price"
              className={`font-sm fs-16 price-input price-range ${classes.sm}`}
            />
          </div>
        </div>
        <div className="item p-0">
          <button
            className={`cs-btn align-self-end ${classes.button}`}
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
    </>
  );
};

export default Filters;
