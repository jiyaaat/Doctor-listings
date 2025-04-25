import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Doctor } from '../types';

interface SearchBarProps {
  doctors: Doctor[];
  onSearch: (query: string) => void;
  onSelectDoctor: (doctorName: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ doctors, onSearch, onSelectDoctor }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Doctor[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.trim()) {
      const filteredDoctors = doctors
        .filter(doctor => doctor.name.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 3);
      
      setSuggestions(filteredDoctors);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(query);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (doctorName: string) => {
    setQuery(doctorName);
    onSelectDoctor(doctorName);
    setShowSuggestions(false);
  };

  const clearSearch = () => {
    setQuery('');
    onSearch('');
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div className="w-full relative" ref={searchRef}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full bg-white border-0 rounded-xl py-4 pl-12 pr-10 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 shadow-lg"
          placeholder="Search for doctors by name, specialty, or location..."
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          data-testid="autocomplete-input"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 pr-4 flex items-center"
          >
            <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>
      
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-2 bg-white rounded-xl shadow-xl border border-gray-100">
          <ul className="py-2">
            {suggestions.map((doctor) => (
              <li
                key={doctor.id}
                className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                onClick={() => handleSuggestionClick(doctor.name)}
                data-testid="suggestion-item"
              >
                <div className="flex items-center">
                  {doctor.photo ? (
                    <img
                      src={doctor.photo}
                      alt={doctor.name}
                      className="w-10 h-10 rounded-full object-cover mr-3"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <span className="text-sm font-semibold text-blue-600">
                        {doctor.name_initials}
                      </span>
                    </div>
                  )}
                  <div>
                    <div className="font-medium text-gray-900">{doctor.name}</div>
                    <div className="text-sm text-gray-500">
                      {doctor.specialities.map(s => s.name).join(', ')}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;