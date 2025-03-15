import { useState, useEffect, useRef } from "react";
import dubaiAreas from "../../../../constants/dubaiAreas";

const DubaiAreasDropdown = ({ value, onChange, name, placeholder }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [filteredAreas, setFilteredAreas] = useState([]);
  const dropdownRef = useRef(null);

  // Set initial search term from value
  useEffect(() => {
    if (value) {
      setSearchTerm(value);
    }
  }, [value]);

  // Update filtered areas when search term changes
  useEffect(() => {
    if (searchTerm) {
      const filtered = dubaiAreas.filter((area) =>
        area.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredAreas(filtered);
    } else {
      setFilteredAreas(dubaiAreas.slice(0, 10)); // Show first 10 areas when empty
    }
  }, [searchTerm]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setIsOpen(true);
  };

  const handleAreaSelect = (area) => {
    setSearchTerm(area);
    onChange({ target: { name, value: area } });
    setIsOpen(false);
  };

  const handleInputBlur = () => {
    // When input loses focus, consider it a custom entry
    if (searchTerm && searchTerm !== value) {
      onChange({ target: { name, value: searchTerm } });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setIsOpen(false);
      if (searchTerm) {
        onChange({ target: { name, value: searchTerm } });
      }
    }
  };

  return (
    <div className="dubai-areas-dropdown position-relative" ref={dropdownRef}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsOpen(true)}
        className="form-control"
        placeholder={placeholder}
        autoComplete="off"
      />

      {isOpen && (
        <div
          className="dropdown-menu show w-100"
          style={{ maxHeight: "200px", overflowY: "auto" }}
        >
          {filteredAreas.length > 0 ? (
            filteredAreas.map((area, index) => (
              <button
                key={index}
                className="dropdown-item"
                type="button"
                onClick={() => handleAreaSelect(area)}
              >
                {area}
              </button>
            ))
          ) : (
            <div className="dropdown-item text-muted">
              Your input will be added
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DubaiAreasDropdown;
