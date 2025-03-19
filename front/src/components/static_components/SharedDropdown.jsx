import { useState, useEffect, useRef } from "react";

/**
 * SharedDropdown - A reusable dropdown component that supports searching and custom inputs
 *
 * @param {Object} props
 * @param {string} props.value - The current value
 * @param {function} props.onChange - Function called when value changes
 * @param {string} props.name - Input name for form integration
 * @param {string} props.placeholder - Placeholder text
 * @param {Array} props.options - Array of options to display
 * @param {boolean} props.allowCustom - Whether to allow custom input values (default: true)
 * @param {boolean} props.searchable - Whether to enable search functionality (default: true)
 * @param {string} props.className - Additional CSS classes for the input
 * @param {function} props.renderOption - Custom render function for dropdown items (optional)
 */
const SharedDropdown = ({
  value,
  onChange,
  name,
  placeholder,
  options = [],
  allowCustom = true,
  searchable = true,
  className = "",
  renderOption,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const dropdownRef = useRef(null);

  // Set initial search term from value
  useEffect(() => {
    if (value) {
      setSearchTerm(value);
    }
  }, [value]);

  // Update filtered options when search term changes
  useEffect(() => {
    if (searchTerm && searchable) {
      const filtered = options.filter((option) =>
        typeof option === "string"
          ? option.toLowerCase().includes(searchTerm.toLowerCase())
          : (option.label || option.name || "")
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
      );
      setFilteredOptions(filtered);
    } else {
      // Show all or first 10 options when empty or not searchable
      setFilteredOptions(options.length > 10 ? options.slice(0, 10) : options);
    }
  }, [searchTerm, options, searchable]);

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
    if (searchable) {
      setIsOpen(true);
    }
  };

  const handleOptionSelect = (option) => {
    const optionValue =
      typeof option === "string"
        ? option
        : option.value || option.name || option.label;
    setSearchTerm(
      typeof option === "string" ? option : option.label || option.name || ""
    );
    onChange({ target: { name, value: optionValue } });
    setIsOpen(false);
  };

  const handleInputBlur = () => {
    // When input loses focus, consider it a custom entry if allowed
    if (allowCustom && searchTerm && searchTerm !== value) {
      onChange({ target: { name, value: searchTerm } });
    }
    // Keep dropdown open a bit longer to allow for clicks on options
    setTimeout(() => {
      if (!dropdownRef.current?.contains(document.activeElement)) {
        setIsOpen(false);
      }
    }, 150);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (searchTerm) {
        onChange({ target: { name, value: searchTerm } });
      }
      setIsOpen(false);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    } else if (e.key === "ArrowDown") {
      setIsOpen(true);
    }
  };

  const getDisplayValue = (option) => {
    if (typeof option === "string") return option;
    return option.label || option.name || option.value || "";
  };

  return (
    <div
      className="dropdown shared-dropdown position-relative "
      style={{ zIndex: 9999 }}
      ref={dropdownRef}
    >
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsOpen(true)}
        // className={`form-control ${className}`}
        placeholder={placeholder}
        autoComplete="off"
        readOnly={!searchable}
        className={`fs-16 text-truncate dropdown-select text-left ${className}`}
      />

      {isOpen && (
        <div
          className="dropdown-menu show w-100"
          style={{ maxHeight: "200px", overflowY: "auto" }}
        >
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <button
                key={index}
                className={`dropdown-item ${className} text-capitalize text-wrap`}
                type="button"
                onClick={() => handleOptionSelect(option)}
              >
                {renderOption ? renderOption(option) : getDisplayValue(option)}
              </button>
            ))
          ) : (
            <div className="dropdown-item text-muted">
              {allowCustom ? searchTerm : "No matching options."}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SharedDropdown;
