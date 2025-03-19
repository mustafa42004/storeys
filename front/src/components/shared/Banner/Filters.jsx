import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SharedDropdown from "../../static_components/SharedDropdown";
import dubaiAreas from "../../../constants/dubaiAreas";
import { flatPropertyTypes } from "../../../constants/propertyTypes";
import { toast } from "react-toastify";

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
    if (!Object.values(formData).every((val) => !!val)) {
      toast.error("All Values are required");
      return;
    }

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
          <SharedDropdown
            value={formData?.location}
            onChange={handleInputChange}
            name="location"
            placeholder="Select Location"
            options={dubaiAreas}
            className={classes.select}
          />
        </div>
        <div className="item divide">
          <h4 className={`font-sm medium ${classes.medium}`}>Bedrooms</h4>
          <SharedDropdown
            value={formData?.bedrooms}
            onChange={handleInputChange}
            name="bedrooms"
            placeholder="Select Bedroom"
            options={["1 Bedroom", "2 Bedrooms", "3 Bedrooms", "4 Bedrooms"]}
            className={classes.select}
          />
        </div>
        <div className="item divide">
          <h4 className={`font-sm medium ${classes.medium}`}>Types</h4>
          <SharedDropdown
            value={formData?.type}
            onChange={handleInputChange}
            name="type"
            placeholder="Select Type"
            options={flatPropertyTypes}
            className={classes.select}
          />
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
              className={`font-sm fs-12 price-input price-range ${classes.sm}`}
            />
            <span className="separator">-</span>
            <input
              type="number"
              name="maxPrice"
              value={formData.maxPrice}
              onChange={handleInputChange}
              placeholder="Max price"
              className={`font-sm fs-12 price-input price-range ${classes.sm}`}
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
