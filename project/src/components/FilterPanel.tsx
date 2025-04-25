import React from 'react';
import { ChevronDown, ChevronUp, Filter, X } from 'lucide-react';
import { FilterState, SortOption } from '../types';

interface FilterPanelProps {
  filters: FilterState;
  specialties: string[];
  onFilterChange: (filter: Partial<FilterState>) => void;
  onClearFilters: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  specialties,
  onFilterChange,
  onClearFilters
}) => {
  const [expandedSections, setExpandedSections] = React.useState({
    sort: true,
    specialties: true,
    consultation: true
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleConsultationChange = (value: string) => {
    onFilterChange({ consultationType: value === filters.consultationType ? '' : value });
  };

  const handleSpecialtyChange = (specialty: string) => {
    const updatedSpecialties = filters.specialties.includes(specialty)
      ? filters.specialties.filter(s => s !== specialty)
      : [...filters.specialties, specialty];
    
    onFilterChange({ specialties: updatedSpecialties });
  };

  const handleSortChange = (value: SortOption) => {
    onFilterChange({ sortBy: value });
  };

  const formatSpecialtyTestId = (specialty: string) => {
    return specialty.toLowerCase().replace(/[^a-z0-9]/g, '-');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Filter className="w-5 h-5 text-blue-600 mr-2" />
          <h2 className="text-lg font-bold text-gray-900">Filters</h2>
        </div>
        {(filters.specialties.length > 0 || filters.consultationType || filters.sortBy !== 'experience') && (
          <button
            onClick={onClearFilters}
            className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200"
          >
            <X className="w-4 h-4 mr-1 text-sm font-medium text-blue-600 " />
            Clear All
          </button>
        )}

      </div>

      {/* Sort By Section */}
      <div className="mb-6">
        <div 
          className="flex justify-between items-center mb-4 cursor-pointer"
          onClick={() => toggleSection('sort')}
        >
          <h3 className="font-semibold text-gray-900" data-testid="filter-header-sort">Sort by</h3>
          {expandedSections.sort ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
        
        {expandedSections.sort && (
          <div className="space-y-3">
            <label className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="radio"
                checked={filters.sortBy === 'fees'}
                onChange={() => handleSortChange('fees')}
                className="form-radio text-blue-600 focus:ring-blue-500"
                data-testid="sort-fees"
              />
              <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                Price: Low to High
              </span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="radio"
                checked={filters.sortBy === 'experience'}
                onChange={() => handleSortChange('experience')}
                className="form-radio text-blue-600 focus:ring-blue-500"
                data-testid="sort-experience"
              />
              <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                Experience: Most Experienced
              </span>
            </label>
          </div>
        )}
      </div>

      {/* Specialties Section */}
      <div className="mb-6">
        <div 
          className="flex justify-between items-center mb-4 cursor-pointer"
          onClick={() => toggleSection('specialties')}
        >
          <h3 className="font-semibold text-gray-900" data-testid="filter-header-speciality">Specialties</h3>
          {expandedSections.specialties ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
        
        {expandedSections.specialties && (
          <div className="space-y-3 max-h-60 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {specialties.map((specialty) => (
              <label key={specialty} className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.specialties.includes(specialty)}
                  onChange={() => handleSpecialtyChange(specialty)}
                  className="form-checkbox text-blue-600 rounded focus:ring-blue-500"
                  data-testid={`filter-specialty-${formatSpecialtyTestId(specialty)}`}
                />
                <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                  {specialty}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Consultation Mode Section */}
      <div>
        <div 
          className="flex justify-between items-center mb-4 cursor-pointer"
          onClick={() => toggleSection('consultation')}
        >
          <h3 className="font-semibold text-gray-900" data-testid="filter-header-moc">Mode of consultation</h3>
          {expandedSections.consultation ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
        
        {expandedSections.consultation && (
          <div className="space-y-3">
            <label className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="radio"
                checked={filters.consultationType === 'Video Consult'}
                onChange={() => handleConsultationChange('Video Consult')}
                className="form-radio text-blue-600 focus:ring-blue-500"
                data-testid="filter-video-consult"
              />
              <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                Video Consultation
              </span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="radio"
                checked={filters.consultationType === 'In Clinic'}
                onChange={() => handleConsultationChange('In Clinic')}
                className="form-radio text-blue-600 focus:ring-blue-500"
                data-testid="filter-in-clinic"
              />
              <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                In Clinic
              </span>
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterPanel;